import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { cities } from "./data/cities";
import { courses } from "./data/courses";
import { getColleges } from "@/lib/colleges";
import { getBlogCards } from "@/lib/content";

export const revalidate = 3600;

/** Every public page, including blog posts written in the admin. Rebuilt hourly, so new posts reach Google without a redeploy. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const url = (p: string) => `${SITE.url}${p}`;
  const { items } = await getBlogCards(50);
  const colleges = await getColleges();
  return [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/courses"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: url("/blogs"), lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: url("/colleges"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: url("/college-predictor"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/student/register"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: url("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    ...courses.map((c) => ({ url: url(`/courses/${c.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...colleges.map((c) => ({ url: url(`/colleges/${c.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...cities.map((c) => ({ url: url(`/admission/${c.slug}`), lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...items.map((p) => ({ url: url(`/blogs/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
