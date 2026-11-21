import { attribution } from "./attribution";
import { PLATFORM } from "./site";

/**
 * First-party, anonymous visit tracking: sends each page view and each conversion click to the counsellor platform, so the CRM
 * shows traffic by source, page and city, and a lead carries the pages its visitor read.
 *  - The browser gets a random id (no name, phone, e-mail or IP). It lives only in this browser's local storage.
 *  - Do Not Track is respected: nothing is sent.
 *  - It never throws and never blocks the page.
 */
const VID_KEY = "fa_vid";
const GEO_KEY = "fa_geo";

const blocked = () => typeof window === "undefined" || navigator.doNotTrack === "1" || window.location.pathname.startsWith("/admin");

/** The anonymous id of this browser (created on first use), or undefined when tracking is off. */
export function visitorId(): string | undefined {
  if (blocked()) return undefined;
  try {
    let id = localStorage.getItem(VID_KEY);
    if (!id || !/^[a-z0-9]{16,40}$/i.test(id)) {
      id = (crypto.randomUUID?.() ?? `${Date.now()}${Math.random()}`).replace(/[^a-z0-9]/gi, "").slice(0, 32).padEnd(16, "0");
      localStorage.setItem(VID_KEY, id);
    }
    return id;
  } catch {
    return undefined;
  }
}

type Geo = { city?: string; region?: string };
let geoPromise: Promise<Geo> | null = null;
const geo = (): Promise<Geo> => {
  geoPromise ??= (async () => {
    try {
      const saved = sessionStorage.getItem(GEO_KEY);
      if (saved) return JSON.parse(saved) as Geo;
      const g = (await (await fetch("/api/geo")).json()) as Geo;
      sessionStorage.setItem(GEO_KEY, JSON.stringify(g));
      return g;
    } catch {
      return {};
    }
  })();
  return geoPromise;
};

const refHost = () => {
  try {
    const h = document.referrer ? new URL(document.referrer).hostname.replace(/^www\./, "") : "";
    return h && h !== window.location.hostname.replace(/^www\./, "") ? h : undefined;
  } catch {
    return undefined;
  }
};

async function send(ev: Record<string, unknown>) {
  const vid = visitorId();
  if (!vid) return;
  try {
    const t = attribution();
    const g = await geo();
    await fetch(`${PLATFORM.apiUrl}/public/track/${encodeURIComponent(PLATFORM.tenantSlug)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      body: JSON.stringify({ vid, events: [{ ...ev, source: t.source, medium: t.medium, campaign: t.campaign, ref: refHost(), city: g.city, region: g.region }] }),
    });
  } catch {
    /* tracking must never get in the way */
  }
}

export const trackPageview = (path: string) => void send({ type: "pageview", path });
export const trackConversion = (name: string, path: string) => void send({ type: "event", name, path });
