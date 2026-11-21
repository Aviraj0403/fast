"use client";

import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";
import { SITE, waLink } from "@/lib/site";

/** Always-reachable shortcuts: WhatsApp and call. Quiet by design (no bouncing). */
export const FixedButtons = () => (
  <div className="fixed bottom-5 right-4 z-40 flex flex-col gap-3 sm:right-6">
    <a
      href={waLink("I want to apply - FastAdmission Quick Help")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg ring-1 ring-black/5 transition hover:bg-[#1fb957]"
    >
      <FaWhatsapp size={24} />
    </a>
    <a
      href={SITE.phoneHref}
      aria-label="Call us"
      className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg ring-1 ring-black/5 transition hover:bg-brand-700"
    >
      <FaPhoneAlt size={18} />
    </a>
  </div>
);
