import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Clock, MessageCircle, Sparkles, UserRound } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { PageHero } from "@/components/PageHero";
import { SITE, waLink } from "@/lib/site";

export type Article = {
  slug: string;
  title: string;
  html: string;
  author: string;
  /** ISO date for search engines */
  publishedAt: string;
  /** shown text, e.g. "March 24, 2026" */
  dateLabel: string;
  readingMinutes: number;
  coverUrl?: string | null;
  tag?: string;
  description?: string;
  /** optional highlights shown as a "Key takeaways" card */
  takeaways?: { title: string; text: string }[];
  /** optional pull-quote */
  quote?: string;
};

/** One article layout for every blog post: dark header, readable body, key takeaways, sticky lead form. */
export function ArticleView({ a }: { a: Article }) {
  return (
    <main className="bg-slate-50 pb-28">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BlogPosting", headline: a.title, description: a.description, image: a.coverUrl ? [a.coverUrl] : undefined, datePublished: a.publishedAt, author: { "@type": "Person", name: a.author || SITE.name }, publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/brand-mark.png` } }, mainEntityOfPage: `${SITE.url}/blogs/${a.slug}` }} />
      <PageHero eyebrow={a.tag ? a.tag.replace(/-/g, " ") : "Admission guide"} title={a.title} className="md:pb-32">
        <nav aria-label="Breadcrumb" className="mt-4 text-sm text-slate-400"><Link href="/blogs" className="hover:text-white">Blog</Link> <span aria-hidden>/</span> <span className="text-slate-200">Guide</span></nav>
        <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300">
          <span className="inline-flex items-center gap-1.5"><UserRound className="h-4 w-4" aria-hidden="true" />{a.author || SITE.name}</span>
          <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" aria-hidden="true" />{a.dateLabel}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" />{a.readingMinutes} min read</span>
        </p>
      </PageHero>

      <div className="container-x relative z-10 -mt-14 grid max-w-6xl items-start gap-8 lg:grid-cols-[1fr_20rem]">
        <article className="card overflow-hidden">
          {a.coverUrl && <div className="relative aspect-[16/8] bg-brand-50"><Image src={a.coverUrl} alt="" fill priority sizes="(min-width: 1024px) 800px, 100vw" className="object-cover" unoptimized /></div>}
          <div className="p-6 sm:p-10">
            {a.takeaways && a.takeaways.length > 0 && (
              <aside className="mb-8 rounded-2xl border border-brand-100 bg-brand-50/60 p-5">
                <p className="flex items-center gap-2 font-display text-base font-extrabold text-ink"><Sparkles className="h-4 w-4 text-brand-600" aria-hidden="true" /> Key takeaways</p>
                <ul className="mt-3 grid gap-3 sm:grid-cols-3">{a.takeaways.map((t) => <li key={t.title}><p className="text-sm font-bold text-brand-700">{t.title}</p><p className="mt-0.5 text-sm leading-relaxed text-body">{t.text}</p></li>)}</ul>
              </aside>
            )}
            <div className="article" dangerouslySetInnerHTML={{ __html: a.html }} />
            {a.quote && <blockquote className="mt-8 rounded-2xl bg-brand-950 p-6 font-display text-lg italic leading-relaxed text-white">&ldquo;{a.quote}&rdquo;<footer className="mt-3 text-sm not-italic text-brand-300">{a.author}</footer></blockquote>}
            <div className="mt-10 flex flex-col items-start justify-between gap-3 rounded-2xl bg-slate-50 p-5 sm:flex-row sm:items-center">
              <p className="font-semibold text-ink">Questions about this? Ask a counsellor, free.</p>
              <a href={waLink(`I read "${a.title}" and have a question`)} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a>
            </div>
          </div>
        </article>
        <aside className="lg:sticky lg:top-24"><LeadForm form={`blog-${a.slug}`.slice(0, 60)} title="Get free guidance" subtitle="Questions after reading? A counsellor will call you." /></aside>
      </div>
    </main>
  );
}
