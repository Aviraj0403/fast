import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, MessageCircle, Building2 } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { feeLakh, getCollegePage } from "@/lib/colleges";
import { SITE, waLink } from "@/lib/site";
import { getSiteConfig } from "@/lib/siteConfig";

export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getCollegePage((await params).slug);
  if (!page) return { title: "College not found" };
  const { college } = page;
  const place = [college.city, college.state].filter(Boolean).join(", ");
  return {
    title: `${college.name}${place ? `, ${place}` : ""}: courses, fees and admission | ${SITE.name}`,
    description: college.description?.slice(0, 160) || `Courses, fees and admission guidance for ${college.name}. Free counselling by ${SITE.name}.`,
    alternates: { canonical: `${SITE.url}/colleges/${college.slug}` },
  };
}

export default async function CollegePage({ params }: Props) {
  const slug = (await params).slug;
  if (!(await getSiteConfig()).sections.colleges) notFound(); // switched off in the admin
  const page = await getCollegePage(slug);
  if (!page) notFound();
  const { college, courses, faqs } = page;
  const place = [college.city, college.state].filter(Boolean).join(", ");

  return (
    <main className="bg-slate-50 pb-28">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollegeOrUniversity", name: college.name, url: `${SITE.url}/colleges/${college.slug}`, ...(college.description ? { description: college.description } : {}), ...(place ? { address: { "@type": "PostalAddress", addressLocality: college.city, addressRegion: college.state, addressCountry: "IN" } } : {}) }} />
      <section className="bg-brand-950 pb-20 pt-[calc(var(--header-h)+2.5rem)]">
        <div className="container-x max-w-5xl">
          <Link href="/colleges" className="text-sm text-brand-300 hover:underline">All colleges</Link>
          <h1 className="mt-3 text-balance font-display text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">{college.name}</h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300">
            {place && <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" aria-hidden="true" />{place}</span>}
            {college.type && <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4" aria-hidden="true" />{college.type}</span>}
            {college.affiliation && <span>{college.affiliation}</span>}
          </p>
        </div>
      </section>

      <div className="container-x relative z-10 -mt-10 grid max-w-5xl items-start gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="grid gap-6">
          {college.description && <section className="card p-6"><h2 className="font-display text-xl font-extrabold text-ink">About</h2><p className="mt-2 whitespace-pre-line leading-relaxed text-body">{college.description}</p></section>}

          <section className="card p-6">
            <h2 className="font-display text-xl font-extrabold text-ink">Courses and fees</h2>
            {courses.length === 0 ? <p className="mt-2 text-body">Course details are shared by your counsellor. Ask us on WhatsApp.</p> : (
              <ul className="mt-4 divide-y divide-line">
                {courses.map((c) => (
                  <li key={c.id} className="flex flex-wrap items-center justify-between gap-2 py-3">
                    <div><p className="font-semibold text-ink">{c.name}</p><p className="text-sm text-body">{[c.level?.toUpperCase(), c.stream, c.durationMonths ? `${Math.round(c.durationMonths / 12 * 10) / 10} years` : ""].filter(Boolean).join(" · ")}</p></div>
                    <p className="font-semibold text-ink">{feeLakh(c.annualFeePaise)}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {faqs.length > 0 && (
            <section className="card p-6">
              <h2 className="font-display text-xl font-extrabold text-ink">Questions answered</h2>
              <div className="mt-3 divide-y divide-line">{faqs.map((f, i) => <details key={i} className="py-3"><summary className="cursor-pointer font-semibold text-ink">{f.q}</summary><p className="mt-2 text-body">{f.a}</p></details>)}</div>
            </section>
          )}
        </div>

        <aside className="grid gap-4 lg:sticky lg:top-24">
          <LeadForm form={`college-${college.slug}`} city={college.city} title={`Apply to ${college.name}`} subtitle="A counsellor will call you with fees, cutoffs and the admission process." />
          <a href={waLink(`I want to know about admission to ${college.name}`)} target="_blank" rel="noopener noreferrer" className="btn btn-outline w-full"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
          <Link href="/student/register" className="btn btn-primary w-full">Register to apply and track</Link>
        </aside>
      </div>
    </main>
  );
}
