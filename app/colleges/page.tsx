import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, Calculator, FileCheck2, MessageCircle, UserRoundCheck } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { getColleges } from "@/lib/colleges";
import { SITE, waLink } from "@/lib/site";
import { getSiteConfig } from "@/lib/siteConfig";
import { CollegeExplorer } from "./CollegeExplorer";

export const revalidate = 300;
export const metadata: Metadata = {
  title: `Top colleges and admission guidance 2026 | ${SITE.name}`,
  description: "Browse colleges with courses and fees, then get free one-to-one counselling, application tracking and document support from FastAdmission.",
  alternates: { canonical: `${SITE.url}/colleges` },
};

const HOW = [
  { icon: Calculator, title: "Check your chances", text: "Use the rank predictor to see colleges that fit your score and budget.", href: "/college-predictor", cta: "Open predictor" },
  { icon: UserRoundCheck, title: "Talk to a counsellor", text: "A free one-to-one call to shortlist colleges, fees and the admission process.", href: "/student/register", cta: "Register free" },
  { icon: FileCheck2, title: "Apply and track online", text: "Upload documents, follow every application step, and get updates in one place.", href: "/student/login", cta: "Student login" },
];

export default async function CollegesPage() {
  if (!(await getSiteConfig()).sections.colleges) notFound(); // switched off in the admin
  const list = await getColleges();
  const states = new Set(list.map((c) => c.state).filter(Boolean)).size;
  const stats = [[String(list.length), list.length === 1 ? "college" : "colleges"], [String(states || 1), states === 1 ? "state" : "states"], ["Free", "counselling"], ["1 to 1", "guidance"]];

  return (
    <main className="bg-slate-50 pb-28">
      <section className="relative overflow-hidden bg-brand-950 pb-24 pt-[calc(var(--header-h)+2.5rem)] md:pb-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,rgb(10_150_208/0.32),transparent_60%),radial-gradient(50%_60%_at_0%_100%,rgb(10_122_176/0.2),transparent_60%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="container-x relative max-w-6xl">
          <p className="eyebrow eyebrow-dark">Admissions 2026</p>
          <h1 className="mt-2 max-w-3xl text-balance font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">Find the right college. <span className="text-brand-300">We guide you to the seat.</span></h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-300">Browse colleges with courses and fees. Then get free, honest counselling from admission experts, with every document and application tracked online.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/student/register" className="btn btn-primary btn-lg">Get free counselling</Link>
            <a href={waLink("Hi, I want help choosing a college.")} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light btn-lg"><MessageCircle className="h-5 w-5" /> Chat on WhatsApp</a>
          </div>
          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map(([v, l]) => <div key={l} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3"><dt className="sr-only">{l}</dt><dd className="font-display text-2xl font-extrabold text-white">{v}</dd><p className="text-xs uppercase tracking-wide text-slate-300">{l}</p></div>)}
          </dl>
        </div>
      </section>

      <div className="container-x max-w-6xl">
        {list.length === 0 ? (
          <div className="card -mt-9 relative z-10 p-8 text-center shadow-xl"><p className="font-display text-xl font-bold text-ink">Our college list is being updated</p><p className="mt-1 text-body">Register and your counsellor will share a shortlist that fits your marks and budget.</p><Link href="/student/register" className="btn btn-primary mt-4">Register free</Link></div>
        ) : (
          <CollegeExplorer colleges={list} />
        )}

        <section className="mt-16" aria-labelledby="how">
          <p className="eyebrow">How it works</p>
          <h2 id="how" className="mt-1 font-display text-2xl font-extrabold text-ink sm:text-3xl">From shortlist to confirmed seat</h2>
          <ol className="mt-6 grid gap-4 md:grid-cols-3">
            {HOW.map((s, i) => (
              <li key={s.title} className="card p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><s.icon className="h-5 w-5" aria-hidden="true" /></span>
                <p className="mt-4 text-sm font-semibold text-brand-600">Step {i + 1}</p>
                <h3 className="mt-0.5 font-display text-lg font-extrabold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{s.text}</p>
                <Link href={s.href} className="mt-4 inline-block text-sm font-bold text-brand-600 hover:underline">{s.cta} &rarr;</Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16 overflow-hidden rounded-3xl bg-brand-950" aria-labelledby="callback">
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow eyebrow-dark">Not sure which college?</p>
              <h2 id="callback" className="mt-1 font-display text-2xl font-extrabold text-white sm:text-3xl">Get a free call back from a counsellor</h2>
              <p className="mt-3 text-slate-300">Tell us your marks, budget and city. We suggest colleges with real fees and the admission steps. No pressure, no charge.</p>
              <ul className="mt-5 grid gap-2 text-sm text-slate-200">{["Honest advice, no hidden fees", "Colleges matched to your marks and budget", "Help with forms, documents and deadlines"].map((t) => <li key={t} className="flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-emerald-400" aria-hidden="true" />{t}</li>)}</ul>
            </div>
            <LeadForm form="colleges-page" dark />
          </div>
        </section>
      </div>
    </main>
  );
}
