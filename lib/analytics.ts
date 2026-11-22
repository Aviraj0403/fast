import { track } from "@vercel/analytics";
import { trackConversion } from "./tracker";

const CLICKS = new Set(["whatsapp_click", "call_click", "email_click"]);

type Props = Record<string, string | number | boolean | null>;

/**
 * One call records a conversion event in Vercel Web Analytics (and Google Analytics when it is loaded).
 * Never throws: tracking must not break a form.
 */
export function event(name: string, props: Props = {}) {
  try {
    track(name, props);
    // taps on WhatsApp / call / email are already recorded by the platform script (components/SiteSdk)
    if (!CLICKS.has(name)) trackConversion(name, window.location.pathname);
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", name, props);
  } catch {
    /* ignore */
  }
}
