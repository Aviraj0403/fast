import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `Register as a student | ${SITE.name}`,
  description: "Create a free student account: track your college applications and upload documents online. A counsellor is assigned to you.",
  robots: { index: true, follow: true },
  alternates: { canonical: `${SITE.url}/student/register` },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
