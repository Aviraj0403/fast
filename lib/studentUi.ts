/** Small pure helpers for the student dashboard. */
export const pretty = (s = "") => s.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());
export const inr = (paise = 0) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(paise / 100);
export const dateOf = (d?: string) => (d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "");
export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const intake = (i?: { month: number; year: number }) => (i ? `${MONTHS[i.month - 1]} ${i.year}` : "");
export const initials = (n = "") => n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("") || "S";

/** The happy path of an application, in order. Anything else (rejected, declined, withdrawn) ends it. */
export const STEPS: { key: string; label: string }[] = [
  { key: "documents_pending", label: "Documents" },
  { key: "ready_to_submit", label: "Ready" },
  { key: "submitted", label: "Submitted" },
  { key: "under_review", label: "Review" },
  { key: "offered", label: "Offer" },
  { key: "accepted", label: "Accepted" },
  { key: "fee_paid", label: "Fee paid" },
  { key: "admitted", label: "Admitted" },
];
export const ENDED = ["rejected", "declined", "withdrawn"];
export const stepIndex = (status: string) => (status === "draft" ? -1 : STEPS.findIndex((s) => s.key === status));

export const DOC_TONE: Record<string, string> = {
  verified: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  rejected: "bg-red-50 text-red-700 ring-red-200",
  uploaded: "bg-amber-50 text-amber-700 ring-amber-200",
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
};

/** How complete the profile is (name/phone/email are always there): date of birth, address, 12th marks, preferred course. */
export const profileScore = (p: { dob?: string; address?: { city?: string; state?: string }; academics?: unknown[]; preferences?: { courses?: string[] } }) => {
  const checks = [!!p.dob, !!(p.address?.city || p.address?.state), !!p.academics?.length, !!p.preferences?.courses?.length];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
};
