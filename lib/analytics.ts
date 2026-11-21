import { track } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null>;

/**
 * One call records a conversion event in Vercel Web Analytics (and Google Analytics when it is loaded).
 * Never throws: tracking must not break a form.
 */
export function event(name: string, props: Props = {}) {
  try {
    track(name, props);
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.("event", name, props);
  } catch {
    /* ignore */
  }
}
