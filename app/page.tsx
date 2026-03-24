// app/page.tsx

import { Metadata } from "next";

import { Hero } from "./sections/Hero";
import { AIServicesSection } from "./sections/AIServicesSection";
import { AdmissionSection } from "./sections/AdmissionSection";
import { StudyGoalSection } from "./sections/StudyGoalSection";
import StudyPlacesSection from "./sections/StudyPlacesSection";
import BlogSection from "./sections/BlogSection";
import MergedContactSection from "./sections/MergedContactSection";
import { FixedButtons } from "./sections/FixedButtons";

// Importing metadata from layout.tsx
import { metadata as layoutMetadata } from "./layout";

// Merge the metadata from layout and add specific page-level metadata here
export const metadata: Metadata = {
  ...layoutMetadata,
  title: "FastAdmission AI - Revolutionary Career Counseling Platform | AI-Powered Guidance",
  description:
    "Transform your career with FastAdmission's AI-powered counseling platform. Get personalized career assessments, smart college matching, and intelligent guidance from India's most advanced education advisor.",
  keywords: [
    "AI career counselor",
    "artificial intelligence education",
    "smart college selection",
    "AI-powered career guidance",
    "machine learning counseling",
    "personalized career assessment",
    "intelligent admission guidance",
    "AI education advisor",
    "automated career matching",
    "digital counseling platform",
    "FastAdmission AI",
    "career prediction AI",
    "smart study planning",
    "AI college recommendations"
  ],
};

// Structured Data for HomePage
const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "FastAdmission AI - AI-Powered Career Counseling",
  "description": "Revolutionary AI-powered career counseling platform providing personalized guidance, smart college matching, and intelligent career assessments.",
  "url": "https://fastadmission.in",
  "mainEntity": {
    "@type": "Service",
    "name": "AI Career Counseling",
    "provider": {
      "@type": "Organization",
      "name": "FastAdmission"
    },
    "description": "AI-powered career counseling and college admission guidance",
    "offers": [
      {
        "@type": "Offer",
        "name": "AI Career Assessment",
        "description": "Comprehensive AI-powered career assessment and recommendations"
      },
      {
        "@type": "Offer",
        "name": "Smart College Matching",
        "description": "AI-driven college selection and admission guidance"
      }
    ]
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is AI-powered career counseling?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI-powered career counseling uses advanced machine learning algorithms to analyze your interests, skills, personality, and academic background to provide personalized career recommendations and college matches with 95% accuracy."
      }
    },
    {
      "@type": "Question",
      "name": "How accurate is FastAdmission's AI assessment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our AI system has a 95% accuracy rate in career-college matching, based on analysis of over 50,000 successful student placements and continuous learning from industry trends."
      }
    },
    {
      "@type": "Question",
      "name": "Is the AI assessment free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, our basic AI career assessment is completely free and provides instant results. No registration required. Advanced detailed reports and personal counseling sessions are available as premium services."
      }
    }
  ]
};

function HomePage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homepageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* Hero Section - AI-focused landing */}
      <Hero />

      {/* Core Services Preview */}
      <AIServicesSection />

      {/* Admission & Colleges */}
      <AdmissionSection />
      <StudyPlacesSection />

      {/* Blog & Study Goals */}
      <StudyGoalSection />
      <BlogSection />

      {/* Final CTA */}
      <MergedContactSection />

      {/* Fixed Action Buttons */}
      <FixedButtons />
    </>
  );
}

export default HomePage;