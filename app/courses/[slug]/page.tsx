import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BadgeCheck, CheckCircle2, Clock, FileCheck2, GraduationCap, MessageCircle, UserRoundCheck, Building2, Armchair } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import { courses, getCourseBySlug } from "@/app/data/courses";
import { SITE, waLink } from "@/lib/site";
import { getSiteConfig } from "@/lib/siteConfig";

export const revalidate = 300;
interface PageProps { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const course = getCourseBySlug((await params).slug);
  if (!course) return { title: "Course not found" };
  return {
    title: `${course.title}: admission, eligibility and counselling | ${SITE.name}`,
    description: `${course.description} Duration ${course.duration}. Eligibility: ${course.eligibility}. Free counselling by ${SITE.name}.`.slice(0, 160),
    alternates: { canonical: `${SITE.url}/courses/${course.slug}` },
  };
}

const PROCESS = [
  { icon: UserRoundCheck, title: "Counselling session", text: "A free one-to-one call to map your marks, budget and goals to the right colleges." },
  { icon: FileCheck2, title: "Documents and application", text: "We check every form and document so nothing is missed or rejected." },
  { icon: Building2, title: "College coordination", text: "We stay in touch with the college admission office so your application is not stuck." },
  { icon: Armchair, title: "Seat confirmation", text: "Help with fees, registration and the final seat confirmation." },
];

export default async function CourseDetailPage({ params }: PageProps) {
  const course = getCourseBySlug((await params).slug);
  if (!course || !(await getSiteConfig()).sections.courses) notFound();
  const related = courses.filter((c) => c.slug !== course.slug).slice(0, 3);

  return (
    <main className="bg-slate-50 pb-28">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Course", name: course.title, description: course.description, provider: { "@type": "EducationalOrganization", name: SITE.name, url: SITE.url } }} />
      <PageHero eyebrow={`${course.category} · Admissions 2026`} title={course.title}>
        <nav aria-label="Breadcrumb" className="mt-4 text-sm text-slate-400"><Link href="/courses" className="hover:text-white">Courses</Link> <span aria-hidden>/</span> <span className="text-slate-200">{course.category}</span></nav>
      </PageHero>

      <div className="container-x relative z-10 -mt-10 grid max-w-6xl items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="grid gap-6">
          <section className="card overflow-hidden">
            <div className="relative h-56 sm:h-72"><Image src={course.image} alt={course.title} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" unoptimized priority /></div>
            <div className="p-6 sm:p-8">
              <h2 className="font-display text-xl font-extrabold text-ink">About this course</h2>
              <p className="mt-2 leading-relaxed text-body">{course.description}</p>
              <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-body"><Clock className="h-4 w-4 text-brand-500" aria-hidden="true" /> Duration</dt><dd className="mt-1 font-display text-lg font-extrabold text-ink">{course.duration}</dd></div>
                <div className="rounded-2xl bg-slate-50 p-4"><dt className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-body"><GraduationCap className="h-4 w-4 text-brand-500" aria-hidden="true" /> Eligibility</dt><dd className="mt-1 font-display text-lg font-extrabold leading-snug text-ink">{course.eligibility}</dd></div>
              </dl>
            </div>
          </section>

          <section className="card p-6 sm:p-8" aria-labelledby="process">
            <p className="eyebrow">How it works</p>
            <h2 id="process" className="mt-1 font-display text-2xl font-extrabold text-ink">From first call to confirmed seat</h2>
            <ol className="mt-6 grid gap-4 sm:grid-cols-2">
              {PROCESS.map((s, i) => (
                <li key={s.title} className="rounded-2xl border border-line p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><s.icon className="h-5 w-5" aria-hidden="true" /></span>
                  <p className="mt-3 text-xs font-bold text-brand-600">Step {i + 1}</p>
                  <h3 className="font-display text-base font-extrabold text-ink">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-body">{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="related">
            <h2 id="related" className="font-display text-xl font-extrabold text-ink">Other courses</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-3">
              {related.map((c) => (
                <li key={c.slug}><Link href={`/courses/${c.slug}`} className="card card-hover block h-full p-4"><p className="text-xs font-bold text-brand-600">{c.category}</p><p className="mt-1 font-display text-base font-extrabold leading-snug text-ink">{c.title}</p><p className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-brand-600">View <ArrowRight className="h-4 w-4" aria-hidden="true" /></p></Link></li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="grid gap-4 lg:sticky lg:top-24">
          <LeadForm form={`course-${course.slug}`} title={`Apply for ${course.category}`} subtitle="A counsellor will call you with colleges, fees and the admission steps." />
          <a href={waLink(`I want to know about ${course.title}`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
          <ul className="card grid gap-2 p-5 text-sm text-ink">{["Free counselling, no hidden fees", "Colleges matched to your marks", "Help with forms and documents"].map((t) => <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />{t}</li>)}</ul>
          <Link href="/college-predictor" className="card card-hover flex items-center justify-between p-4"><span className="flex items-center gap-2 text-sm font-bold text-ink"><BadgeCheck className="h-5 w-5 text-brand-500" aria-hidden="true" /> Check your rank predictor</span><ArrowRight className="h-4 w-4 text-brand-600" aria-hidden="true" /></Link>
        </aside>
      </div>
    </main>
  );
}
