import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, ClipboardCheck, Headphones, MapPin, MessageCircle } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { SectionHeading } from "@/components/SectionHeading";
import { SITE, waLink } from "@/lib/site";
import { CITY_IMAGES, cities, cityBySlug, sameState } from "../../data/cities";
import { collegesIn, getColleges } from "@/lib/colleges";
import { faqs } from "../../data/faqs";
import { FaqSection } from "../../sections/FaqSection";

type Params = { params: Promise<{ city: string }> };

// Only the cities in data/cities.ts exist; anything else is a 404 (no thin pages for random URLs).
export const dynamicParams = false;
export const generateStaticParams = () => cities.map((c) => ({ city: c.slug }));

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const city = cityBySlug((await params).city);
  if (!city) return {};
  const title = `College Admission Guidance in ${city.name} | Free Counselling`;
  const description = `Free admission counselling for students in ${city.name}, ${city.state}. Get a college shortlist with fees and cutoffs for Engineering, Medical, Management and Law, and help with forms and documents.`;
  return { title, description, alternates: { canonical: `/admission/${city.slug}` }, openGraph: { title, description, url: `${SITE.url}/admission/${city.slug}`, type: "website" } };
}

const COURSES = [
  { name: "Engineering (B.Tech)", text: "Branch and college choice from your JEE or state-entrance rank." },
  { name: "Medical (MBBS, BDS)", text: "NEET counselling guidance, state and management quota options." },
  { name: "Management (MBA, BBA)", text: "Choosing programmes that fit your score, budget and goals." },
  { name: "Law (LLB, BA LLB)", text: "CLAT, AILET and university law-entrance guidance." },
];
const STEPS = [
  { icon: Headphones, title: "Free counselling call", text: "Tell us your marks, rank and budget. We tell you what is realistic." },
  { icon: BookOpen, title: "Shortlist with fees", text: "A short list of suitable colleges with fees, cutoffs and deadlines." },
  { icon: ClipboardCheck, title: "Forms and documents", text: "We check your application and documents so nothing is missed." },
];

export default async function CityPage({ params }: Params) {
  const city = cityBySlug((await params).city);
  if (!city) notFound();
  const nearby = sameState(city);
  const local = collegesIn(await getColleges(), city.name);
  const img = CITY_IMAGES[city.slug];
  const list = faqs(city.name);

  return (
    <main>
      <JsonLd
        data={[
          { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
            { "@type": "ListItem", position: 2, name: `Admission guidance in ${city.name}`, item: `${SITE.url}/admission/${city.slug}` },
          ] },
          { "@context": "https://schema.org", "@type": "EducationalOrganization", name: SITE.name, url: SITE.url, telephone: SITE.phone, email: SITE.email, areaServed: { "@type": "City", name: city.name } },
        ]}
      />

      <section className="relative overflow-hidden bg-brand-950 pt-[calc(var(--header-h)+3rem)] pb-14 md:pb-20">
        {img && <Image src={img} alt="" fill priority sizes="100vw" className="object-cover opacity-20" />}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-brand-950/60 to-brand-950" />
        <div className="container-x relative grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-sm text-slate-200">
              <MapPin className="h-3.5 w-3.5 text-brand-300" /> {city.name}, {city.state}
            </p>
            <h1 className="mt-5 text-balance text-4xl font-extrabold leading-tight !text-white sm:text-5xl">
              College admission guidance in <span className="text-brand-300">{city.name}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
              Free counselling for students and parents in {city.name}: the right colleges for your marks and budget, with fees, cutoffs and help with every form until your seat is confirmed.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={waLink(`Hi FastAdmission, I am from ${city.name} and want admission guidance.`)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light btn-lg">
                <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
              </a>
              <a href={SITE.phoneHref} className="btn btn-ghost-light btn-lg">Call {SITE.phone}</a>
            </div>
          </div>
          <LeadForm form={`city-${city.slug}`} city={city.name} dark title={`Free counselling for ${city.name}`} />
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <SectionHeading eyebrow="Courses" title={`Courses we guide for in ${city.name}`} description={`Whatever you plan to study, we help you pick colleges${nearby.length ? ` in ${city.name} and nearby cities in ${city.state}` : ` in ${city.name} and across India`}.`} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {COURSES.map((c) => (
              <a key={c.name} href={waLink(`I want admission guidance for ${c.name} in ${city.name}`)} target="_blank" rel="noopener noreferrer" className="card card-hover block p-6">
                <h3 className="text-lg font-bold">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">Ask about this <ArrowRight className="h-4 w-4" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-canvas">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title="From first call to confirmed seat" />
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <li key={s.title} className="card p-6">
                <span className="icon-tile"><s.icon className="h-5 w-5" /></span>
                <p className="mt-4 text-sm font-semibold text-brand-600">Step {i + 1}</p>
                <h3 className="mt-1 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {local.length > 0 && (
        <section className="section bg-white">
          <div className="container-x">
            <SectionHeading eyebrow="Colleges" title={`Colleges in and around ${city.name}`} />
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {local.map((c) => (
                <Link key={c.slug} href={`/colleges/${c.slug}`} className="card card-hover block p-6">
                  <p className="text-xs font-semibold text-brand-600">{c.type}</p>
                  <h3 className="mt-1 text-lg font-bold">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted">{[c.city, c.state].filter(Boolean).join(", ")}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FaqSection items={list} city={city.name} title={`Admissions in ${city.name}: your questions answered`} />

      {nearby.length > 0 && (
        <section className="section bg-canvas">
          <div className="container-x">
            <h2 className="text-xl font-bold">Also guiding students in {city.state}</h2>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {nearby.map((n) => (
                <li key={n.slug}>
                  <Link href={`/admission/${n.slug}`} className="inline-block rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-body hover:border-brand-300 hover:text-brand-700">
                    {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </main>
  );
}
