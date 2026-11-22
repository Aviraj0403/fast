import { platformFetch } from "./platform";

/** Colleges the organisation shows on its website (set in the admin: Website control). Public data only. */
export type College = { slug: string; name: string; type?: string; city?: string; state?: string; country?: string; website?: string; affiliation?: string; accreditations?: string[]; description?: string; featured?: boolean };
export type Course = { id: string; name: string; level: string; stream?: string; durationMonths?: number; annualFeePaise: number; intakes?: { month?: number; year?: number }[]; minPercentage?: number };
export type Faq = { q: string; a: string };
export type CollegePage = { college: College; courses: Course[]; faqs: Faq[] };

/** The college directory, featured first. Empty list when the platform is unreachable (pages then show a friendly note). */
export async function getColleges(): Promise<College[]> {
  return (await platformFetch<{ items: College[] }>("/sites/{slug}/colleges.json", { revalidate: 300 }))?.items ?? [];
}

export async function getCollegePage(slug: string): Promise<CollegePage | null> {
  const d = await platformFetch<{ college: College; courses: Course[]; faqs: Faq[] }>(`/sites/{slug}/colleges/${encodeURIComponent(slug)}.json`, { revalidate: 300 });
  return d ? { college: d.college, courses: d.courses ?? [], faqs: d.faqs ?? [] } : null;
}

/** Colleges whose city or state matches a place name (used on the city pages). */
export const collegesIn = (list: College[], place: string) => {
  const p = place.toLowerCase().replace(" ncr", "");
  return list.filter((c) => [c.city, c.state].some((x) => x?.toLowerCase().includes(p)));
};

export const feeLakh = (paise: number) => (paise > 0 ? `₹${(paise / 10000000).toFixed(2)} lakh / year` : "Fee on request");
