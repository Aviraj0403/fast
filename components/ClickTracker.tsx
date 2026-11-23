"use client";

import { useEffect } from "react";
import { event } from "@/lib/analytics";
import { submitLead } from "@/lib/leads";

/** Counts every WhatsApp, call and email click on the site as a conversion event and logs tap leads. */
export function ClickTracker() {
  useEffect(() => {
    let lastTapTime = 0;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      const href = a?.getAttribute("href") || "";
      const where = window.location.pathname;

      if (href.startsWith("https://wa.me/")) {
        event("whatsapp_click", { page: where });
        const now = Date.now();
        if (now - lastTapTime > 5000) {
          lastTapTime = now;
          // Capture tap enquiry in background
          submitLead({
            name: "WhatsApp Tap Visitor",
            phone: "9100000000", // placeholder phone for tap leads to pass validation, tagged with tap source
            message: `Initiated WhatsApp chat from page: ${where}`,
            form: "whatsapp_click_tracker",
          }).catch(() => {});
        }
      } else if (href.startsWith("tel:")) {
        event("call_click", { page: where });
        const now = Date.now();
        if (now - lastTapTime > 5000) {
          lastTapTime = now;
          submitLead({
            name: "Direct Call Tap Visitor",
            phone: href.replace("tel:", "").replace(/[^0-9+]/g, "") || "9100000000",
            message: `Clicked phone dialer link from page: ${where}`,
            form: "phone_click_tracker",
          }).catch(() => {});
        }
      } else if (href.startsWith("mailto:")) {
        event("email_click", { page: where });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
