import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ArrowRight, CalendarDays } from "lucide-react";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { getBlogCards, pageSeo, type BlogCardData } from "@/lib/content";
import { getSiteConfig } from "@/lib/siteConfig";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await pageSeo("/blogs");
  return { title: seo?.title || "Blog: admission and career guidance", description: seo?.description || "Guides on colleges, entrance exams, fees and careers from the FastAdmission counsellors.", alternates: { canonical: "/blogs" } };
}

const Meta = ({ post }: { post: BlogCardData }) => (
  <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-body">
    <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />{post.date}</span>
    <span aria-hidden className="h-1 w-1 rounded-full bg-brand-200" />
    <span>{post.author}</span>
  </p>
);

export default async function BlogListingPage() {
  if (!(await getSiteConfig()).sections.blogs) notFound(); // switched off in the admin
  const { items: posts } = await getBlogCards();
  const [lead, ...rest] = posts;
  return (
    <main className="bg-slate-50 pb-28">
      <PageHero eyebrow="Admission guides" title="Straight answers for" accent="students and parents." text="Colleges, entrance exams, fees and careers, explained simply by our counsellors." />
      <div className="container-x relative z-10 -mt-10 max-w-6xl">
        {!lead ? (
          <div className="card p-8 text-center"><p className="font-display text-xl font-bold text-ink">New articles are on the way</p><p className="mt-1 text-body">Meanwhile, a counsellor can answer your questions for free.</p></div>
        ) : (
          <>
            <Link href={`/blogs/${lead.slug}`} className="card card-hover group grid overflow-hidden lg:grid-cols-[1.1fr_1fr]">
              <div className="relative h-64 overflow-hidden lg:h-auto lg:min-h-[22rem]">
                <Image src={lead.image} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized priority />
                <span className="absolute left-4 top-4 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow">Latest</span>
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-10">
                <Meta post={lead} />
                <h2 className="mt-3 text-balance font-display text-2xl font-extrabold leading-tight text-ink group-hover:text-brand-700 sm:text-3xl">{lead.title}</h2>
                <p className="mt-3 line-clamp-4 leading-relaxed text-body">{lead.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-bold text-brand-600">Read the guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </div>
            </Link>

            {rest.length > 0 && (
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blogs/${p.slug}`} className="card card-hover group flex h-full flex-col overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <Meta post={p} />
                        <h2 className="mt-2 line-clamp-2 font-display text-lg font-extrabold leading-snug text-ink group-hover:text-brand-700">{p.title}</h2>
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-body">{p.excerpt}</p>
                        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-brand-600">Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
        <CtaBand form="blogs-page" eyebrow="Have a question?" title="Ask a counsellor, free" text="Not sure what a guide means for you? Share your marks and budget and a counsellor will call you." />
      </div>
    </main>
  );
}
