/** 10-digit Indian mobile, accepting +91, 91, 0 and spaces / dashes. Returns the 10 digits or null. Safe on server and client. */
export const mobileOf = (raw: string): string | null => {
  const d = raw.replace(/\D/g, "");
  const n = d.length === 12 && d.startsWith("91") ? d.slice(2) : d.length === 11 && d.startsWith("0") ? d.slice(1) : d;
  return /^[6-9]\d{9}$/.test(n) ? n : null;
};
