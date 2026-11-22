"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { PLATFORM } from "@/lib/site";

/**
 * The counsellor platform's website connector: ONE script that records anonymous visits and where they came from, counts
 * WhatsApp / call / email taps, turns forms marked data-fa-lead into leads, and shows the lead popup (its wording and colours are
 * set in the admin). It follows page changes by itself. Not loaded on the internal /admin pages.
 */
export function SiteSdk() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return <Script id="fa-site-sdk" src={`${PLATFORM.apiUrl}/public/sdk/site-sdk.js`} data-tenant-slug={PLATFORM.tenantSlug} data-popup="true" strategy="afterInteractive" />;
}
