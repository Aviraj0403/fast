import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getPostBySlug } from "@/app/data/posts";

type PageProps = {
  params: {
    slug: string;
  };
};

/* ---------------- SEO Metadata ---------------- */
export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post does not exist.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
    },
  };
}

/* ---------------- Page ---------------- */
export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <article>
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {post.title}
          </h1>
          <p className="text-gray-600 text-sm mb-4">{post.date}</p>

          <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Content */}
        <section
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* -------- JSON-LD Structured Data -------- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            image: [post.image],
            datePublished: post.date,
            description: post.excerpt,
          }),
        }}
      />
    </main>
  );
}
