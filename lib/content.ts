import { platformGet } from "./platform";
import { posts as localPosts } from "@/app/data/posts";

/** A blog post as the platform serves it (written in the admin under Blog & content). */
export interface ApiCard {
  title: string;
  slug: string;
  excerpt: string;
  coverUrl: string | null;
  tags: string[];
  author: string | null;
  publishedAt: string;
  readingMinutes: number;
}
export interface ApiPost extends ApiCard {
  html: string;
  seo: { title: string; description: string };
}
export interface PageSeo {
  title: string | null;
  description: string | null;
  ogImage: string | null;
  noindex: boolean;
}
export interface SiteSettings {
  name: string;
  logoUrl: string | null;
  googleVerification: string | null;
  gaMeasurementId: string | null;
  metaPixelId: string | null;
  defaultOgImage: string | null;
  pages: Record<string, PageSeo>;
}

export const getSiteSettings = () => platformGet<SiteSettings>("/site", 300);
export const getApiPosts = async (limit = 50): Promise<ApiCard[]> => (await platformGet<{ items: ApiCard[] }>(`/posts?limit=${limit}`))?.items ?? [];
export const getApiPost = (slug: string) => platformGet<ApiPost>(`/posts/${encodeURIComponent(slug)}`);

/** The page's search text written in the admin, if any. */
export async function pageSeo(path: string): Promise<PageSeo | null> {
  const s = await getSiteSettings();
  return s?.pages?.[path] ?? null;
}

/** Card shape the listing and home sections draw: from the platform when it has posts, otherwise the built-in ones. */
export interface BlogCardData {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
}
const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export async function getBlogCards(limit = 50): Promise<{ source: "platform" | "local"; items: BlogCardData[] }> {
  const api = await getApiPosts(limit);
  if (api.length) return { source: "platform", items: api.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, image: p.coverUrl || "/image/careeroption.jpeg", date: fmt(p.publishedAt), author: p.author || "FastAdmission" })) };
  return { source: "local", items: localPosts.slice(0, limit).map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, image: p.image, date: p.date, author: p.author })) };
}
