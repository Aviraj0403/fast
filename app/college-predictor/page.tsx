import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PredictorForm } from "./PredictorForm";

export const metadata: Metadata = {
  title: `College & Cutoff Predictor 2026: JEE Main, MHT CET, WBJEE, KCET | ${SITE.name}`,
  description: "Enter your rank, percentile or 12th percentage and see which engineering colleges you can get, with fees and chances. Free, by FastAdmission.",
  alternates: { canonical: `${SITE.url}/college-predictor` },
};

export default function PredictorPage() {
  return (
    <main className="bg-slate-50 pb-24 pt-[calc(var(--header-h)+1.5rem)]">
      <div className="container-x max-w-4xl">
        <p className="eyebrow">Free tool</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold text-ink sm:text-4xl">Which college can I get?</h1>
        <p className="mt-2 max-w-2xl text-body">Enter your exam score and category. We show colleges by chance of admission, with fees and cutoffs. A counsellor will also call you with a full shortlist.</p>
        <PredictorForm />
      </div>
    </main>
  );
}
