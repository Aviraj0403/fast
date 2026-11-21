import { PLATFORM } from "./site";

/**
 * Sends an enquiry to the FastAdmission counsellor platform (public lead webhook of the "fastadmission" organisation).
 * The lead lands in the admin's Leads screen, is auto-assigned to a counsellor and shows its source as "website".
 * Platform address and organisation slug are set in lib/site.ts (PLATFORM).
 */
export type LeadInput = {
  name: string;
  phone: string;
  email?: string;
  city?: string;
  course?: string;
  message?: string;
  /** which form on the site sent it, kept as the campaign name */
  form: string;
};

type Touch = { source?: string; medium?: string; campaign?: string };
const KEY = "fa_first_touch";

/** Where the visitor came from. The FIRST visit wins for the whole session, so a lead is credited to the ad / search that brought them. */
const attribution = (): Touch => {
  if (typeof window === "undefined") return {};
  try {
    const saved = sessionStorage.getItem(KEY);
    if (saved) return JSON.parse(saved) as Touch;
  } catch {
    /* storage blocked: fall through and compute */
  }
  const q = new URLSearchParams(window.location.search);
  const ref = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, "") : "";
  const external = ref && ref !== window.location.hostname.replace(/^www\./, "");
  const search = /google\.|bing\.|duckduckgo\.|yahoo\./.test(ref);
  const social = /facebook\.|instagram\.|l\.facebook\.|youtube\.|t\.co|twitter\.|linkedin\./.test(ref);
  const paid = q.get("gclid") ? "cpc" : q.get("fbclid") ? "paid_social" : "";
  const touch: Touch = {
    source: q.get("utm_source") || (q.get("gclid") ? "google" : q.get("fbclid") ? "facebook" : external ? ref : "direct"),
    medium: q.get("utm_medium") || paid || (search ? "organic_search" : social ? "social" : external ? "referral" : "none"),
    campaign: q.get("utm_campaign") || undefined,
  };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(touch));
  } catch {
    /* ignore */
  }
  return touch;
};

/** Never throws: a failed save must not stop the visitor reaching WhatsApp. Resolves true when the platform accepted the lead. */
export async function submitLead(lead: LeadInput): Promise<boolean> {
  const base = PLATFORM.apiUrl;
  const slug = PLATFORM.tenantSlug;
  try {
    const t = attribution();
    const res = await fetch(`${base}/public/leads/webhook/${encodeURIComponent(slug)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true, // survives the page opening WhatsApp in a new tab
      body: JSON.stringify({
        name: lead.name.trim(),
        phone: lead.phone.trim(),
        email: lead.email?.trim() || undefined,
        city: lead.city?.trim() || undefined,
        course: lead.course?.trim() || undefined,
        channel: "website",
        utmSource: t.source || "website",
        utmMedium: t.medium,
        utmCampaign: t.campaign || lead.form,
        message: lead.message?.trim() || undefined,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
