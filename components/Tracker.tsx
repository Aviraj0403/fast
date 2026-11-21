"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackPageview } from "@/lib/tracker";

/** Records every page view (anonymous) so the CRM can show traffic and tie a lead to what its visitor read. */
export function Tracker() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname) trackPageview(pathname);
  }, [pathname]);
  return null;
}
