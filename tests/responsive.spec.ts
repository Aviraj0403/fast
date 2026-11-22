import { expect, test, type Page } from "@playwright/test";

/**
 * Every public page must fit a phone and a tablet: nothing wider than the screen (no sideways scrolling), no text cut off at the edge,
 * and the main buttons big enough to tap. If this fails it names the elements that stick out.
 */
const ROUTES = ["/", "/courses", "/courses/mbbs", "/colleges", "/college-predictor", "/blogs", "/blogs/engineering-ai-ml-2026", "/admission/patna", "/privacy", "/student/login", "/student/register"];
const SIZES = [
  { name: "phone-small", width: 360, height: 740 },
  { name: "phone", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
];

const overflowing = (page: Page) =>
  page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const out: string[] = [];
    document.querySelectorAll<HTMLElement>("body *").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const style = getComputedStyle(el);
      if (style.position === "fixed" || style.visibility === "hidden" || style.display === "none") return;
      if (r.right > vw + 1 || r.left < -1) {
        // ignore things inside a scroll container the user can swipe on purpose
        let p: HTMLElement | null = el.parentElement;
        while (p && p !== document.body) {
          const o = getComputedStyle(p).overflowX;
          if (o === "auto" || o === "scroll" || o === "hidden" || o === "clip") return;
          p = p.parentElement;
        }
        out.push(`${el.tagName.toLowerCase()}${el.className && typeof el.className === "string" ? "." + el.className.split(" ").slice(0, 3).join(".") : ""} (${Math.round(r.left)}..${Math.round(r.right)} of ${vw})`);
      }
    });
    return { scrollWidth: document.documentElement.scrollWidth, vw, out: out.slice(0, 8) };
  });

for (const size of SIZES) {
  test.describe(size.name, () => {
    test.use({ viewport: { width: size.width, height: size.height }, isMobile: size.width < 600, hasTouch: size.width < 800 });
    for (const route of ROUTES) {
      test(`${route} fits the screen`, async ({ page }) => {
        await page.goto(route);
        await page.waitForLoadState("networkidle").catch(() => {});
        const r = await overflowing(page);
        expect(r.scrollWidth, `page is wider than the screen. Sticking out: ${r.out.join(" | ")}`).toBeLessThanOrEqual(r.vw + 1);
        expect(r.out, `elements outside the screen: ${r.out.join(" | ")}`).toEqual([]);
      });
    }
  });
}

test.describe("phone usability", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  test("the menu opens, lists the main pages and closes", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    const nav = page.getByRole("navigation", { name: "Mobile" });
    await expect(nav.getByRole("link", { name: "Colleges" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Rank predictor" })).toBeVisible();
    await nav.getByRole("link", { name: "Courses" }).click();
    await expect(page).toHaveURL(/\/courses$/);
    await expect(page.getByRole("navigation", { name: "Mobile" })).toBeHidden();
  });

  test("form fields and buttons are large enough to tap", async ({ page }) => {
    await page.goto("/student/register");
    const small = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>("main input:not([type=checkbox]):not([type=hidden]), main select, main button")].filter((e) => e.offsetParent && e.getBoundingClientRect().height < 40).map((e) => `${e.tagName}:${(e.getAttribute("aria-label") || e.textContent || e.id).slice(0, 20)}`));
    expect(small).toEqual([]);
  });

  test("the lead form text is at least 16px so phones do not zoom on focus", async ({ page }) => {
    await page.goto("/college-predictor");
    const sizes = await page.evaluate(() => [...document.querySelectorAll<HTMLElement>("main input:not([type=checkbox]), main select")].map((e) => parseFloat(getComputedStyle(e).fontSize)));
    expect(Math.min(...sizes)).toBeGreaterThanOrEqual(16);
  });
});
