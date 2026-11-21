"use client";

import { useEffect } from "react";
import { event } from "@/lib/analytics";

/** Counts every WhatsApp, call and email click on the site as a conversion event, without touching each link. */
export function ClickTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") || "";
      const where = window.location.pathname;
      if (href.startsWith("https://wa.me/")) event("whatsapp_click", { page: where });
      else if (href.startsWith("tel:")) event("call_click", { page: where });
      else if (href.startsWith("mailto:")) event("email_click", { page: where });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
