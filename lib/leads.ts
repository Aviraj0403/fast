import { attribution } from "./attribution";
import { PLATFORM } from "./site";
import { visitorId } from "./tracker";

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
        visitorId: visitorId(),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
