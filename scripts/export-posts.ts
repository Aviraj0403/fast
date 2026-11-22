/**
 * Exports the website's built-in blog posts as JSON the platform can import (they then become editable in the admin under Blog & content).
 *   npx tsx scripts/export-posts.ts > posts.json
 *   (in the counsellor-platform repo)  npm run import:posts -- --tenant fastadmission --file ../fast/posts.json
 */
import { posts } from "../app/data/posts";

const SITE = "https://fastadmission.in";
const decode = (s: string) => s.replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&rsquo;/g, "'");

/** The posts are written in simple HTML; the platform stores markdown. */
const toMarkdown = (html: string): string =>
  decode(
    html
      .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, "\n\n## $1\n\n")
      .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, "\n\n### $1\n\n")
      .replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, "**$2**")
      .replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, "*$2*")
      .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, "[$2]($1)")
      .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1")
      .replace(/<\/?(ul|ol)[^>]*>/gi, "\n")
      .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, "\n\n$1\n\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, ""),
  )
    .split("\n")
    .map((l) => l.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

const https = (u: string) => (u.startsWith("/") ? `${SITE}${u}` : u);

const out = posts.map((p) => ({
  title: p.title,
  slug: p.slug,
  excerpt: p.excerpt,
  coverUrl: https(p.image),
  tags: [p.category].filter(Boolean),
  author: p.author,
  publishedAt: new Date(p.date).toISOString(),
  status: "published",
  body: toMarkdown(p.content),
}));
console.log(JSON.stringify(out, null, 2));
