import { ArticleView } from "@/components/ArticleView";
import type { ApiPost } from "@/lib/content";

/** A blog post written in the admin (the platform already made its HTML safe). */
export function ApiPostView({ post }: { post: ApiPost }) {
  const dateLabel = new Date(post.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  return <ArticleView a={{ slug: post.slug, title: post.title, html: post.html, author: post.author || "", publishedAt: post.publishedAt, dateLabel, readingMinutes: post.readingMinutes, coverUrl: post.coverUrl, tag: post.tags[0], description: post.seo.description }} />;
}
