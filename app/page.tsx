// app/page.tsx
import SEO from "@/components/Seo";
import { Navbar } from "@/components/ui/Navbar";
import Image from "next/image";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { CounterSection } from "./sections/CounterSection";
import { Services } from "./sections/Services";
import { Colleges } from "./sections/Colleges";
import { RegionalSuccess } from "./sections/RegionalSuccess";
import { Testimonials } from "./sections/Testimonials";
import { EnquiryForm } from "./sections/EnquiryForm";
import { Contact } from "./sections/Contact";
import { Footer } from "@/components/ui/Footer";

export default function HomePage() {
  return (
    <>
      <SEO
        title="Home Page"
        description="Welcome to the homepage of your Next.js app."
        url="https://your-domain.com"
        image="https://your-domain.com/og-image-home.jpg"
        twitterHandle="@yourtwitterhandle"
      />
      <main>
        <Navbar />
        <Hero />
        <About />
        <CounterSection />
        <Services />
        <Colleges />
        <RegionalSuccess />
        <Testimonials />
        <EnquiryForm />
        <Contact />
        <Footer />

     

        {/* Example of next/image */}
        {/* 
        <Image
          src="/images/sample.jpg"
          alt="Sample image"
          width={600}
          height={400}
          priority
        /> 
        */}
      </main>
    </>
  );
}
