/** Contact details and links used across the site: change them here, once. */
export const SITE = {
  name: "FastAdmission",
  url: "https://fastadmission.in",
  whatsappNumber: "918581841853",
  phone: "+91 85818 41853",
  phoneHref: "tel:+918581841853",
  email: "info@fastadmission.com",
  office: "Head Office, Patna",
  /** Google Business Profile (the listing that shows on Google Maps). Keep the name, address and phone identical everywhere. */
  mapsUrl: "https://maps.app.goo.gl/JsPnACANq8a3o3MQ7",
  address: { street: "B.R. Ambedkar Bihar University", locality: "Muzaffarpur", region: "Bihar", postalCode: "842001", country: "IN" },
  /** Paste the token Google Search Console gives for the "HTML tag" verification method (not needed for DNS verification). */
  googleVerification: "",
} as const;

/** WhatsApp chat link with a ready-made message. */
export const waLink = (text: string) => `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;

/**
 * Counsellor platform that receives this website's leads and popup. Hard-coded so the site works without any environment
 * variables; set NEXT_PUBLIC_BACKEND_URL / NEXT_PUBLIC_TENANT_SLUG only to point somewhere else (e.g. a staging API).
 */
export const PLATFORM = {
  apiUrl: (process.env.NEXT_PUBLIC_BACKEND_URL || "https://apicounsellor.jdinfotechsolutions.in").replace(/\/+$/, ""),
  tenantSlug: process.env.NEXT_PUBLIC_TENANT_SLUG || "fastadmission",
  adminUrl: process.env.NEXT_PUBLIC_ADMIN_URL || "https://counsellor.jdinfotechsolutions.in",
} as const;
