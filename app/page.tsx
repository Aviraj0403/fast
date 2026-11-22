// app/page.tsx

import { Metadata } from "next";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";

import { Hero } from "./sections/Hero";
import { getSiteConfig } from "@/lib/siteConfig";
import { AdmissionSection } from "./sections/AdmissionSection";
import { StudyGoalSection } from "./sections/StudyGoalSection";
import StudyPlacesSection from "./sections/StudyPlacesSection";
import CareerAssessmentSection from "./sections/CareerAssessmentSection";
import BlogSection from "./sections/BlogSection";
import { FixedButtons } from "./sections/FixedButtons";
import MergedContactSection from "./sections/MergedContactSection";
import { FaqSection } from "./sections/FaqSection";
import { faqs } from "./data/faqs";

import { getBlogCards, pageSeo } from "@/lib/content";

export const revalidate = 60;

// Search text for the home page comes from the admin (Site SEO & tracking) when set, otherwise these defaults.
export async function generateMetadata(): Promise<Metadata> {
  const seo = await pageSeo("/");
  return {
    title: seo?.title || "FastAdmission: Career Counselling & College Admission Experts",
    description: seo?.description || "Explore your career goals, get guidance, and start your journey with FastAdmission.",
    alternates: { canonical: "/" },
    ...(seo?.noindex ? { robots: { index: false } } : {}),
  };
}

export default async function HomePage() {
  const config = await getSiteConfig();
  const { items: blog } = await getBlogCards(3);
  return (
    <main>
      <Hero title={config.homepage.heroTitle} subtitle={config.homepage.heroSubtitle} cta={config.homepage.ctaText} />
      <AdmissionSection />
      <StudyGoalSection />
      <StudyPlacesSection />
      <CareerAssessmentSection />
      <BlogSection posts={blog} />
      <FaqSection items={faqs()} />
      <MergedContactSection />
      
      <FixedButtons />
    </main>
  );
}
