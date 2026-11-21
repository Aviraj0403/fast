/** Where the visitor came from (first touch of the session), shared by lead forms and visit tracking. */
export type Touch = { source?: string; medium?: string; campaign?: string };
const KEY = "fa_first_touch";

/** Where the visitor came from. The FIRST visit wins for the whole session, so a lead is credited to the ad / search that brought them. */
export const attribution = (): Touch => {
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
