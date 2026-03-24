// app/page.tsx

import { Metadata } from "next";
// import { Navbar } from "@/components/Navbar";
// import { Footer } from "@/components/Footer";

import { Hero } from "./sections/Hero";
import { AdmissionSection } from "./sections/AdmissionSection";
import { StudyGoalSection } from "./sections/StudyGoalSection";
import StudyPlacesSection from "./sections/StudyPlacesSection";
import CareerAssessmentSection from "./sections/CareerAssessmentSection";
import BlogSection from "./sections/BlogSection";
import { FixedButtons } from "./sections/FixedButtons";
import MergedContactSection from "./sections/MergedContactSection";

// Importing metadata from layout.tsx
import { metadata as layoutMetadata } from "./layout";

// Merge the metadata from layout and add specific page-level metadata here
export const metadata: Metadata = {
  ...layoutMetadata,
  title: "Fast Admission Expert | FastAdmission",
  description:
    "Explore your career goals, get guidance, and start your journey with FastAdmission.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AdmissionSection />
      <StudyGoalSection />
      <StudyPlacesSection />
      <CareerAssessmentSection />
      <BlogSection />
      <MergedContactSection />
      
      <FixedButtons />
    </main>
  );
}
