import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getColleges } from "@/lib/colleges";
import { SITE } from "@/lib/site";
import { getSiteConfig } from "@/lib/siteConfig";

export const revalidate = 300;
export const metadata: Metadata = {
  title: `Colleges we work with | ${SITE.name}`,
  description: "Colleges and universities you can apply to through FastAdmission, with free counselling.",
  alternates: { canonical: `${SITE.url}/colleges` },
};

export default async function CollegesPage() {
  if (!(await getSiteConfig()).sections.colleges) notFound(); // switched off in the admin
  const list = await getColleges();
  return (
    <main className="container-x pb-20 pt-32">
      <h1 className="font-display text-3xl font-bold text-ink sm:text-4xl">Colleges we work with</h1>
      <p className="mt-2 max-w-2xl text-body">Pick colleges with a free counsellor. Register once to apply, track your status and upload your documents online.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Link href="/student/register" className="btn btn-primary">Register to apply</Link>
        <Link href="/student/login" className="btn border border-line bg-white text-ink">Student login</Link>
      </div>
      {list.length === 0 ? (
        <p className="mt-10 text-body">Our college list is being updated. Register and your counsellor will share a shortlist.</p>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <li key={c.slug} className="card card-hover relative p-5">
              {c.featured && <span className="mb-2 inline-block rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">Featured</span>}
              <h2 className="font-display text-lg font-bold text-ink"><Link href={`/colleges/${c.slug}`} className="after:absolute after:inset-0">{c.name}</Link></h2>
              <p className="mt-1 text-sm text-body">{[c.city, c.state].filter(Boolean).join(", ")}{c.type ? ` · ${c.type}` : ""}</p>
              {c.affiliation && <p className="mt-1 text-xs text-body">{c.affiliation}</p>}
              {c.description && <p className="mt-3 line-clamp-3 text-sm text-body">{c.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
