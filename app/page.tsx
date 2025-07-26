// app/page.tsx

import { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import { Hero } from "./sections/Hero";
// Uncomment these as you develop
// import { About } from "./sections/About";
// import { CounterSection } from "./sections/CounterSection";
// import { Services } from "./sections/Services";
// import { Colleges } from "./sections/Colleges";
// import { RegionalSuccess } from "./sections/RegionalSuccess";
// import { Testimonials } from "./sections/Testimonials";
import { EnquiryForm } from "./sections/EnquiryForm";
import { Contact } from "./sections/Contact";
import { AdmissionSection } from "./sections/AdmissionSection"; 
import { StudyGoalSection } from './sections/StudyGoalSection';
import StudyPlacesSection from "./sections/StudyPlacesSection";
import CareerAssessmentSection from './sections/CareerAssessmentSection';
import BlogSection from './sections/BlogSection';
import { FixedButtons } from "./sections/FixedButtons";

// Optional: define page metadata (if not using SEO component)
export const metadata: Metadata = {
  title: "Home Page",
  description: "Welcome to the homepage of your Next.js app.",
  openGraph: {
    images: ["https://your-domain.com/og-image-home.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
  },
};

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
 <AdmissionSection />
<StudyGoalSection />
<StudyPlacesSection />
  <CareerAssessmentSection />
   <BlogSection />

      {/* Uncomment as needed */}
      {/* <About />
      <CounterSection />
      <Services />
      <Colleges />
      <RegionalSuccess /> */}
      {/* <Testimonials /> */}
      <EnquiryForm />
      <Contact /> 

      <Footer />
         <FixedButtons />
    </main>
  );
}
