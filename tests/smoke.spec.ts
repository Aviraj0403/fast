import { expect, test, type Page } from "@playwright/test";

const API = "https://apicounsellor.jdinfotechsolutions.in";

/** Answer a platform call with fixed JSON. */
const mock = (page: Page, pattern: string | RegExp, body: unknown, status = 200) =>
  page.route(pattern, (r) => r.fulfill({ status, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify(body) }));

/** Browsers send a CORS preflight before JSON POSTs: answer it so the mocked POST is reached. */
const preflight = (page: Page) => page.route(`${API}/**`, (r) => (r.request().method() === "OPTIONS" ? r.fulfill({ status: 204, headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*", "access-control-allow-methods": "*" } }) : r.fallback()));

const OVERVIEW = {
  profile: { name: "Aarav Deshmukh", email: "aarav@gmail.com", phone: "9876543210", address: { city: "Pune" } },
  counsellor: { id: "1", name: "Priya Sharma" },
  referral: { referralCode: "AAR4F2", shareUrl: "/x" },
  documents: [{ id: "d1", type: "marksheet_10", fileName: "10th.pdf", status: "verified", uploadedAt: "2026-11-01", superseded: false }],
  feeLinks: [],
  applications: [{ id: "a1", collegeName: "COEP", courseName: "B.Tech CSE", status: "under_review", intake: { month: 8, year: 2026 }, statusHistory: [], checklist: [] }],
};

test("home page loads with navigation", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Colleges" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Rank predictor" }).first()).toBeVisible();
});

test("colleges page works even when the platform has no colleges", async ({ page }) => {
  await page.goto("/colleges");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Find the right college");
});

test("courses, blog, privacy and a course page render with the shared layout", async ({ page }) => {
  await page.goto("/courses");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Choose a course");
  await expect(page.getByRole("heading", { name: "B.Tech in Computer Science" })).toBeVisible();
  await page.goto("/courses/mbbs");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("MBBS");
  await expect(page.getByRole("button", { name: "Request a free call back" })).toBeVisible();
  await page.goto("/blogs");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Straight answers");
  await page.goto("/blogs/engineering-ai-ml-2026");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Modern Engineering");
  await expect(page.getByText("Key takeaways")).toBeVisible();
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { name: "When you create a student account" })).toBeVisible();
});

test("unknown page shows the friendly 404", async ({ page }) => {
  const res = await page.goto("/no-such-page-here");
  expect(res?.status()).toBe(404);
  await expect(page.getByText("We could not find that page")).toBeVisible();
});

test.describe("college predictor", () => {
  test("asks for missing details before calling the platform", async ({ page }) => {
    await page.goto("/college-predictor");
    await page.getByRole("button", { name: "Show my colleges" }).click();
    await expect(page.locator("form [role=alert]")).toContainText("name");
  });

  test("shows matched colleges and filters them by chance", async ({ page }) => {
    await preflight(page);
    await mock(page, `${API}/public/predict/**`, {
      total: 2,
      predictions: [
        { chance: "high", collegeName: "College One", courseName: "B.Tech CSE", city: "Pune", state: "Maharashtra", annualFeePaise: 15000000, cutoffEstimate: "90 percentile", reason: "Your score is above the cutoff." },
        { chance: "low", collegeName: "College Two", courseName: "B.Tech IT", annualFeePaise: 0, cutoffEstimate: "99 percentile", reason: "Stretch." },
      ],
    });
    await page.goto("/college-predictor");
    await page.getByLabel("Your name *").fill("Neha Verma");
    await page.getByLabel("Mobile number *").fill("9876501234");
    await page.getByLabel("Percentile *").fill("92");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Show my colleges" }).click();
    await expect(page.getByText("2 colleges matched your score")).toBeVisible();
    await expect(page.getByText("College One")).toBeVisible();
    await page.getByRole("tab", { name: /High/ }).click();
    await expect(page.getByText("College Two")).toBeHidden();
  });
});

test.describe("student registration", () => {
  test("validates the form inline", async ({ page }) => {
    await page.goto("/student/register");
    await page.getByRole("button", { name: "Register" }).click();
    await expect(page.getByText("Enter your full name.")).toBeVisible();
    await expect(page.getByText("Enter a valid 10-digit mobile number.")).toBeVisible();
    await expect(page.getByText("Please tick this box so we can contact you.")).toBeVisible();
  });

  test("a successful registration shows the next steps", async ({ page }) => {
    await preflight(page);
    let body: Record<string, unknown> = {};
    await page.route(`${API}/public/student-portal/**`, async (r) => {
      if (r.request().method() === "POST") body = r.request().postDataJSON();
      await r.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*" }, body: JSON.stringify({ ok: true, loginEmailed: true }) });
    });
    await page.goto("/student/register?ref=AAR4F2");
    await page.getByLabel("Full name *").fill("Neha Verma");
    await page.getByLabel("Mobile number *").fill("9876501234");
    await page.getByLabel("Email *").fill("neha@example.com");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Register" }).click();
    await expect(page.getByText("You are registered")).toBeVisible();
    await expect(page.getByText("Check your email")).toBeVisible();
    expect(body.referralCode).toBe("AAR4F2");
    expect(body.consent).toBe(true);
  });
});

test.describe("student login and dashboard", () => {
  test("shows the server's message for a wrong password", async ({ page }) => {
    await preflight(page);
    await mock(page, `${API}/api/v1/auth/login`, { message: "Wrong email or password." }, 401);
    await page.goto("/student/login");
    await page.getByLabel("Email").fill("a@b.co");
    await page.getByLabel("Password", { exact: true }).fill("nope");
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(page.locator("form [role=alert]")).toContainText("Wrong email or password");
  });

  test("a student logs in and sees the dashboard", async ({ page }) => {
    await preflight(page);
    await mock(page, `${API}/api/v1/auth/login`, { token: "t", user: { role: "student" } });
    await mock(page, `${API}/api/v1/portal/student/overview`, OVERVIEW);
    await page.goto("/student/login");
    await page.getByLabel("Email").fill("aarav@gmail.com");
    await page.getByLabel("Password", { exact: true }).fill("Temp-Passw0rd!");
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(page).toHaveURL(/\/student$/);
    await expect(page.getByRole("heading", { name: "Hello, Aarav" })).toBeVisible();
    await expect(page.getByText("COEP")).toBeVisible();
    await expect(page.getByText("Priya Sharma")).toBeVisible();
    await expect(page.getByRole("link", { name: "My dashboard" }).first()).toBeVisible();
  });

  test("staff accounts are refused on the student login", async ({ page }) => {
    await preflight(page);
    await mock(page, `${API}/api/v1/auth/login`, { token: "t", user: { role: "counsellor" } });
    await page.goto("/student/login");
    await page.getByLabel("Email").fill("c@b.co");
    await page.getByLabel("Password", { exact: true }).fill("whatever1");
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(page.locator("form [role=alert]")).toContainText("This login is for students");
  });

  test("an expired session sends the student back to the login", async ({ page }) => {
    await preflight(page);
    await page.addInitScript(() => localStorage.setItem("fa_student_token", "old"));
    await mock(page, `${API}/api/v1/portal/student/overview`, { message: "expired" }, 401);
    await page.goto("/student");
    await expect(page).toHaveURL(/\/student\/login$/);
  });

  test("private pages are not indexed, the register page is", async ({ page }) => {
    await page.goto("/student/login");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await page.goto("/student/register");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /^index/);
  });
});
