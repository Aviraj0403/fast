import { NextResponse } from "next/server";
import { z } from "zod";
import { mobileOf } from "@/lib/phone";
import { PLATFORM } from "@/lib/site";

/**
 * Lead intake for every enquiry form on the site. The browser posts here (same origin); this route validates, drops bots,
 * rate-limits, and forwards to the platform's inbound lead webhook, adding the organisation's secret key from a SERVER-ONLY
 * environment variable (LEAD_WEBHOOK_SECRET, never NEXT_PUBLIC_). The secret never reaches the browser.
 */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const opt = (n: number) => z.string().trim().max(n).optional();
const body = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(10).max(20),
  email: z.union([z.literal(""), z.string().trim().email().max(160)]).optional(),
  city: opt(80),
  course: opt(120),
  message: opt(1000),
  utmSource: opt(100),
  utmMedium: opt(80),
  utmCampaign: opt(150),
  visitorId: opt(60),
  referralCode: opt(30),
  /** honeypot: real visitors never see or fill it */
  company_url: z.string().max(500).optional(),
});

// Best-effort per-IP limit (in memory: per server instance). The platform enforces its own limits as well.
const WINDOW_MS = 10 * 60_000;
const LIMIT = 8;
const hits = new Map<string, number[]>();
const limited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return recent.length > LIMIT;
};

const json = (data: Record<string, unknown>, status = 200) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown";
  if (limited(ip)) return json({ ok: false, error: "Too many enquiries. Please try again later." }, 429);

  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return json({ ok: false, error: "Please check your details." }, 400);
  const b = parsed.data;
  if (b.company_url?.trim()) return json({ ok: true }); // bot: pretend success, create nothing

  const phone = mobileOf(b.phone);
  if (!phone) return json({ ok: false, error: "Enter a valid 10-digit mobile number." }, 400);

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const secret = process.env.LEAD_WEBHOOK_SECRET;
  if (secret) headers[process.env.LEAD_WEBHOOK_SECRET_HEADER || "x-webhook-secret"] = secret;

  try {
    const res = await fetch(`${PLATFORM.apiUrl}/public/leads/webhook/${encodeURIComponent(PLATFORM.tenantSlug)}`, {
      method: "POST",
      headers,
      signal: AbortSignal.timeout(8000),
      body: JSON.stringify({
        name: b.name,
        phone,
        email: b.email || undefined,
        city: b.city || undefined,
        course: b.course || undefined,
        message: b.message || undefined,
        channel: "website",
        utmSource: b.utmSource || "website",
        utmMedium: b.utmMedium,
        utmCampaign: b.utmCampaign,
        visitorId: b.visitorId,
        referralCode: b.referralCode,
      }),
    });
    if (!res.ok) {
      console.error("lead webhook rejected", res.status);
      return json({ ok: false, error: "We could not save this right now." }, 502);
    }
    return json({ ok: true });
  } catch (e) {
    console.error("lead webhook unreachable", e instanceof Error ? e.message : e);
    return json({ ok: false, error: "We could not save this right now." }, 502);
  }
}

export async function GET() {
  return json({ ok: false, error: "Method not allowed" }, 405);
}
