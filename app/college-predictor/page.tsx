import type { Metadata } from "next";
import { BadgeCheck, Clock, PhoneCall } from "lucide-react";
import { SITE } from "@/lib/site";
import { PredictorForm } from "./PredictorForm";

export const metadata: Metadata = {
  title: `College & Cutoff Predictor 2026: JEE Main, MHT CET, WBJEE, KCET | ${SITE.name}`,
  description: "Enter your rank, percentile or 12th percentage and see which engineering colleges you can get, with fees and chances. Free, by FastAdmission.",
  alternates: { canonical: `${SITE.url}/college-predictor` },
};

const CHIPS = [
  { icon: Clock, text: "Takes 30 seconds" },
  { icon: BadgeCheck, text: "Free, no payment" },
  { icon: PhoneCall, text: "Counsellor call with full shortlist" },
];

export default function PredictorPage() {
  return (
    <main className="bg-slate-50 pb-28">
      <section className="relative overflow-hidden bg-brand-950 pb-24 pt-[calc(var(--header-h)+2.5rem)] md:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,rgb(10_150_208/0.3),transparent_60%)]" />
        <div className="container-x relative max-w-4xl text-center md:text-left">
          <p className="eyebrow eyebrow-dark">Free tool · 2026</p>
          <h1 className="mt-2 text-balance font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">Which engineering college can you get?</h1>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-300 md:mx-0">Enter your exam score and category. See colleges by chance of admission, with fees and expected cutoffs.</p>
          <ul className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
            {CHIPS.map(({ icon: Icon, text }) => (
              <li key={text} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-sm text-slate-100"><Icon className="h-4 w-4 text-brand-300" aria-hidden="true" />{text}</li>
            ))}
          </ul>
        </div>
      </section>
      <div className="container-x -mt-14 max-w-4xl">
        <PredictorForm />
      </div>
    </main>
  );
}
