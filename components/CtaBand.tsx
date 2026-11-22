import { BadgeCheck } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";

const POINTS = ["Honest advice, no hidden fees", "Colleges matched to your marks and budget", "Help with forms, documents and deadlines"];

/** "Get a free call back": the closing block of an inner page, with the short lead form. `form` names the placement in the lead's campaign. */
export function CtaBand({ form, eyebrow = "Not sure what to pick?", title = "Get a free call back from a counsellor", text = "Tell us your marks, budget and city. We suggest colleges with real fees and the admission steps. No pressure, no charge." }: { form: string; eyebrow?: string; title?: string; text?: string }) {
  return (
    <section className="mt-16 overflow-hidden rounded-3xl bg-brand-950" aria-labelledby={`${form}-cta`}>
      <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="eyebrow eyebrow-dark">{eyebrow}</p>
          <h2 id={`${form}-cta`} className="mt-1 font-display text-2xl font-extrabold text-white sm:text-3xl">{title}</h2>
          <p className="mt-3 text-slate-300">{text}</p>
          <ul className="mt-5 grid gap-2 text-sm text-slate-200">{POINTS.map((t) => <li key={t} className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />{t}</li>)}</ul>
        </div>
        <LeadForm form={form} dark />
      </div>
    </section>
  );
}
