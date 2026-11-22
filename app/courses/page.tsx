import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, GraduationCap, MessageCircle } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { courses } from "@/app/data/courses";
import { pageSeo } from "@/lib/content";
import { waLink } from "@/lib/site";
import { getSiteConfig } from "@/lib/siteConfig";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await pageSeo("/courses");
  return { title: seo?.title || "Courses: Engineering, Medical, Management, Law", description: seo?.description || "Professional programmes we guide admissions for, with duration, eligibility and fees, plus free counselling.", alternates: { canonical: "/courses" } };
}

const TONE: Record<string, string> = { Engineering: "bg-sky-500", Medical: "bg-emerald-500", Management: "bg-violet-500", Law: "bg-amber-500", Arts: "bg-rose-500" };

export default async function CoursesPage() {
  if (!(await getSiteConfig()).sections.courses) notFound(); // switched off in the admin
  const streams = [...new Set(courses.map((c) => c.category))];
  return (
    <main className="bg-slate-50 pb-28">
      <PageHero eyebrow="Admissions 2026" title="Choose a course." accent="We guide you to the seat." text="Engineering, Medical, Management and Law: see duration and eligibility, then talk to a counsellor who matches colleges to your marks and budget.">
        <ul className="mt-6 flex flex-wrap gap-2">{streams.map((s) => <li key={s} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-1.5 text-sm text-slate-100"><span className={`h-2 w-2 rounded-full ${TONE[s] || "bg-slate-400"}`} />{s}</li>)}</ul>
      </PageHero>

      <div className="container-x relative z-10 -mt-10 max-w-6xl">
        <ul className="grid gap-6 lg:grid-cols-2">
          {courses.map((c) => (
            <li key={c.slug} className="card card-hover group relative flex flex-col overflow-hidden sm:flex-row">
              <div className="relative h-52 shrink-0 overflow-hidden sm:h-auto sm:w-[38%]">
                <Image src={c.image} alt="" fill sizes="(min-width: 1024px) 20vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-brand-950/10" />
                <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white shadow ${TONE[c.category] || "bg-slate-500"}`}>{c.category}</span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-display text-xl font-extrabold leading-snug text-ink"><Link href={`/courses/${c.slug}`} className="after:absolute after:inset-0 group-hover:text-brand-700">{c.title}</Link></h2>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-body">{c.description}</p>
                <dl className="mt-4 grid gap-2 text-sm">
                  <div className="flex items-center gap-2 text-ink"><Clock className="h-4 w-4 text-brand-500" aria-hidden="true" /><dt className="sr-only">Duration</dt><dd className="font-semibold">{c.duration}</dd></div>
                  <div className="flex items-start gap-2 text-body"><GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" aria-hidden="true" /><dt className="sr-only">Eligibility</dt><dd>{c.eligibility}</dd></div>
                </dl>
                <div className="relative z-10 mt-auto flex flex-wrap items-center gap-3 pt-5">
                  <Link href={`/courses/${c.slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600">View details <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
                  <a href={waLink(`I want to apply for ${c.title}`)} target="_blank" rel="noopener noreferrer" className="btn btn-primary ml-auto !py-2 text-sm"><MessageCircle className="h-4 w-4" /> Apply on WhatsApp</a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <CtaBand form="courses-page" />
      </div>
    </main>
  );
}
