"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

/**
 * The organisation's lead-capture popup (exit intent, timed or on scroll), served by the counsellor platform.
 * What it says, when it shows and its colours are set in the admin (Lead Engine, Poptin), not here.
 * It stays off the internal /admin pages.
 */
export function Poptin() {
  const pathname = usePathname();
  const api = (process.env.NEXT_PUBLIC_BACKEND_URL || "").replace(/\/+$/, "");
  const slug = process.env.NEXT_PUBLIC_TENANT_SLUG || "fastadmission";
  if (!api || pathname?.startsWith("/admin")) return null;
  return <Script id="fa-poptin" src={`${api}/public/poptin/poptin-sdk.js`} data-tenant-slug={slug} data-api-base={api} strategy="lazyOnload" />;
}
