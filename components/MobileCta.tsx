"use client";

import { MessageCircle, Phone, PhoneCall } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

/** Phones only: a bar that is always in thumb reach with the three ways to contact us. Desktop uses the floating buttons. */
export function MobileCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-4px_16px_rgb(11_27_46/0.08)] backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <a href={SITE.phoneHref} className="btn btn-outline !px-2 !py-2.5 text-sm"><Phone className="h-4 w-4" /> Call</a>
        <a href={waLink("Hi FastAdmission, I need admission guidance")} target="_blank" rel="noopener noreferrer" className="btn !px-2 !py-2.5 bg-[#25d366] text-sm text-white"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
        <a href="/#hero-form" className="btn btn-primary !px-2 !py-2.5 text-sm"><PhoneCall className="h-4 w-4" /> Call back</a>
      </div>
    </div>
  );
}
