import type { Metadata } from "next";

/** Private pages (login, dashboard): never indexed. The register page overrides this to stay findable. */
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
