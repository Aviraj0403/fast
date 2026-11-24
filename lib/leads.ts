import { attribution } from "./attribution";
import { visitorId } from "./tracker";

/**
 * Sends an enquiry to the FastAdmission counsellor platform. The browser never talks to the platform's lead webhook itself:
 * it posts to this site's own /api/leads route, which adds the organisation's secret key (server-only env var) and forwards it.
 * The lead lands in the admin's Leads screen, is auto-assigned to a counsellor and shows its source as "website".
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
  /** honeypot value; must be empty for real visitors */
  company_url?: string;
};

/** Never throws: a failed save must not stop the visitor reaching WhatsApp. Resolves true when the platform accepted the lead. */
export async function submitLead(lead: LeadInput): Promise<boolean> {
  try {
    const t = attribution();
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true, // survives the page opening WhatsApp in a new tab
      body: JSON.stringify({
        name: lead.name.trim(),
        phone: lead.phone.trim(),
        email: lead.email?.trim() || undefined,
        city: lead.city?.trim() || undefined,
        course: lead.course?.trim() || undefined,
        message: lead.message?.trim() || undefined,
        utmSource: t.source || "website",
        utmMedium: t.medium,
        utmCampaign: t.campaign || lead.form,
        visitorId: visitorId(),
        company_url: lead.company_url || undefined,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
