import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Home } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import type { ApiPost } from "@/lib/content";

/** A blog post written in the admin: clean article layout with the post HTML (already made safe by the platform) and a lead form. */
export function ApiPostView({ post }: { post: ApiPost }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.seo.description,
          image: post.coverUrl ? [post.coverUrl] : undefined,
          datePublished: post.publishedAt,
          author: { "@type": "Person", name: post.author || SITE.name },
          publisher: { "@type": "Organization", name: SITE.name, logo: { "@type": "ImageObject", url: `${SITE.url}/brand-mark.png` } },
          mainEntityOfPage: `${SITE.url}/blogs/${post.slug}`,
        }}
      />
      <div className="container-x max-w-6xl">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-3 border-b border-line pb-4 text-sm text-muted">
          <Link href="/" className="flex items-center gap-1.5 hover:text-brand-700"><Home className="h-4 w-4" /> Home</Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-40" />
          <Link href="/blogs" className="hover:text-brand-700">Blog</Link>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          <article>
            <header>
              {post.tags[0] && <p className="eyebrow mb-3">{post.tags[0].replace(/-/g, " ")}</p>}
              <h1 className="text-balance text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{post.title}</h1>
              <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                <span className="font-medium text-ink">{post.author || SITE.name}</span>
                <span>{date}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readingMinutes} min read</span>
              </p>
            </header>
            {post.coverUrl && (
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl bg-brand-50">
                <Image src={post.coverUrl} alt="" fill priority sizes="(min-width:1024px) 800px, 100vw" className="object-cover" unoptimized />
              </div>
            )}
            <div
              className="mt-8 max-w-none space-y-4 text-[1.0625rem] leading-8 text-body [&_a]:font-medium [&_a]:text-brand-700 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-brand-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-ink [&_img]:rounded-xl [&_li]:ml-5 [&_ol]:list-decimal [&_ul]:list-disc"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </article>
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <LeadForm form={`blog-${post.slug}`.slice(0, 60)} title="Get free guidance" subtitle="Questions after reading? A counsellor will call you." />
          </aside>
        </div>
      </div>
    </div>
  );
}
