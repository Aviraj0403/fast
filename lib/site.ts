/** Contact details and links used across the site: change them here, once. */
export const SITE = {
  name: "FastAdmission",
  url: "https://fastadmission.in",
  whatsappNumber: "918581841853",
  phone: "+91 85818 41853",
  phoneHref: "tel:+918581841853",
  email: "info@fastadmission.com",
  office: "Head Office, Patna",
} as const;

/** WhatsApp chat link with a ready-made message. */
export const waLink = (text: string) => `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
