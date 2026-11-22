"use client";

import { useState } from "react";
import { Check, Copy, Gift, Share2 } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

/** Refer a friend: their registration carries this code, so the counsellor team can see who sent them. */
export function ReferralPanel({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const link = `${SITE.url}/student/register?ref=${encodeURIComponent(code)}`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard blocked */ }
  };
  return (
    <section id="refer" className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-5 text-white sm:p-6">
      <Gift aria-hidden className="absolute -right-4 -top-4 h-28 w-28 text-white/10" />
      <h2 className="relative font-display text-xl font-extrabold text-white">Refer a friend</h2>
      <p className="relative mt-1 text-sm text-brand-100">Share your link. When a friend registers with it, our team knows you sent them.</p>
      <div className="relative mt-4 flex items-center justify-between gap-3 rounded-xl bg-white/10 p-3">
        <div className="min-w-0"><p className="text-xs uppercase tracking-wide text-brand-100">Your code</p><p className="font-display text-2xl font-extrabold tracking-widest text-white">{code}</p></div>
        <button onClick={copy} className="btn bg-white text-brand-700 hover:bg-brand-50">{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy link"}</button>
      </div>
      <a href={waLink(`I am using ${SITE.name} for my college admission and it is really helpful. Register free here: ${link}`)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light relative mt-3 w-full"><Share2 className="h-4 w-4" /> Share on WhatsApp</a>
    </section>
  );
}
