import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleView } from "@/components/ArticleView";
import { getPostBySlug } from "@/app/data/posts";
import { getApiPost } from "@/lib/content";
import { ApiPostView } from "./ApiPostView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60; // new posts and edits from the admin appear within a minute, no redeploy

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const api = await getApiPost(slug);
  if (api) return { title: api.seo.title, description: api.seo.description, alternates: { canonical: `/blogs/${slug}` }, openGraph: { title: api.seo.title, description: api.seo.description, type: "article", images: api.coverUrl ? [api.coverUrl] : undefined, publishedTime: api.publishedAt } };
  const local = getPostBySlug(slug);
  return local ? { title: local.title, description: local.excerpt, alternates: { canonical: `/blogs/${slug}` } } : {};
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const api = await getApiPost(slug);
  if (api) return <ApiPostView post={api} />;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const words = post.content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  return (
    <ArticleView
      a={{ slug: post.slug, title: post.title, html: post.content, author: post.author, publishedAt: new Date(post.date).toISOString(), dateLabel: post.date, readingMinutes: Math.max(1, Math.round(words / 200)), coverUrl: post.image, tag: post.category, description: post.excerpt, takeaways: post.benefits?.map((b: { title: string; desc: string }) => ({ title: b.title, text: b.desc })), quote: post.motivation }}
    />
  );
}
