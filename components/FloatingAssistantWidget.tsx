"use client";

import { useState } from "react";
import { MessageCircle, Phone, X, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

export function FloatingAssistantWidget() {
  const [open, setOpen] = useState(false);

  const defaultMsg = "Hi FastAdmission, I need career counselling and admission guidance for 2026 session.";

  return (
    <div className="fixed bottom-6 right-6 z-50 hidden md:block">
      {/* Expanded Quick Chat Card */}
      {open && (
        <div className="mb-3 w-80 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-3 dark:border-white/10 dark:bg-slate-900">
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3 dark:border-white/10">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
                <MessageCircle size={18} />
                <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </span>
              </span>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">Admission Desk</p>
                <p className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">Online · Senior Counsellor</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-white/10"
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>

          <div className="py-3">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              👋 Need help finding the best college, fees, or cutoff for <b>2026 admissions</b>? Chat with us directly on WhatsApp for instant guidance.
            </p>
          </div>

          <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-white/10">
            <a
              href={waLink(defaultMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-between rounded-xl bg-[#25d366] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#20ba59]"
            >
              <span className="flex items-center gap-2">
                <MessageCircle size={15} /> Chat on WhatsApp
              </span>
              <ArrowRight size={13} />
            </a>

            <a
              href={SITE.phoneHref}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              <Phone size={13} /> Call: {SITE.phone}
            </a>
          </div>

          <p className="mt-2.5 flex items-center justify-center gap-1 text-[10px] text-slate-400">
            <ShieldCheck size={11} /> 100% Free & Confidential Advice
          </p>
        </div>
      )}

      {/* Floating Trigger Button with Pulse Indicator */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="group relative flex h-14 items-center gap-2.5 rounded-full bg-[#25d366] pl-4 pr-5 text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-105 hover:bg-[#20ba59] active:scale-95"
        aria-label="Open admission support"
      >
        <span className="relative flex h-7 w-7 items-center justify-center">
          <MessageCircle size={22} />
          <span className="absolute -right-1 -top-1 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-300 ring-2 ring-emerald-600" />
          </span>
        </span>
        <span className="text-sm font-semibold tracking-wide">
          {open ? "Close Chat" : "Talk to Counsellor"}
        </span>
      </button>
    </div>
  );
}

