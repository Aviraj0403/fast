import { PLATFORM } from "./site";

/**
 * Reads from the counsellor platform for THIS website's organisation (blog posts, page SEO, tracking ids).
 * Results are cached and refreshed in the background, so the site stays fast and pages update without a redeploy.
 * Returns null when the platform is unreachable or the organisation has not switched the feature on: callers fall back to built-in content.
 */
export async function platformGet<T>(path: string, revalidate = 60): Promise<T | null> {
  try {
    const res = await fetch(`${PLATFORM.apiUrl}/public/content/${encodeURIComponent(PLATFORM.tenantSlug)}${path}`, { next: { revalidate }, signal: AbortSignal.timeout(6000) });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}
