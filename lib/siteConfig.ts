import { PLATFORM } from "./site";

/** What the owner controls from the admin (Website control): home page wording and which sections exist. Never throws; defaults show everything. */
export type SiteConfig = {
  homepage: { heroTitle: string; heroSubtitle: string; ctaText: string };
  sections: { colleges: boolean; courses: boolean; blogs: boolean; studentLogin: boolean };
};

export const DEFAULT_CONFIG: SiteConfig = {
  homepage: { heroTitle: "", heroSubtitle: "", ctaText: "" },
  sections: { colleges: true, courses: true, blogs: true, studentLogin: true },
};

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const res = await fetch(`${PLATFORM.apiUrl}/public/sites/${PLATFORM.tenantSlug}/config.json`, { next: { revalidate: 60 } });
    if (!res.ok) return DEFAULT_CONFIG;
    const d = await res.json();
    return {
      homepage: { ...DEFAULT_CONFIG.homepage, ...(d.homepage ?? {}) },
      sections: { ...DEFAULT_CONFIG.sections, ...(d.sections ?? {}) },
    };
  } catch {
    return DEFAULT_CONFIG;
  }
}
