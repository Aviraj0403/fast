// app/layout.tsx

import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import WebVitals from "@/components/WebVitals";
import AOSInit from "@/components/AOSInit";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AIChatbot } from "@/components/AIChatbot";

// === Fonts ===
const inter = Inter({ 
  variable: "--font-inter", 
  subsets: ["latin"],
  display: 'swap',
});

const poppins = Poppins({ 
  variable: "--font-poppins", 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

// === Metadata ===
export const metadata: Metadata = {
  metadataBase: new URL("https://fastadmission.in"),
  title: {
    default: "FastAdmission – AI-Powered Career & College Admission Counselor | Smart Education Guidance",
    template: "%s | FastAdmission - AI Career Counselor",
  },
  description: "Transform your career with AI-powered counseling! Get personalized college admission guidance, career assessments, and smart recommendations from India's most advanced education advisor platform.",
  keywords: [
    "AI career counselor",
    "AI-powered admission guidance",
    "smart college selection",
    "personalized career assessment",
    "artificial intelligence education",
    "college admission AI",
    "career guidance technology",
    "FastAdmission AI",
    "intelligent study planning",
    "automated college matching",
    "AI education advisor",
    "machine learning career guidance",
    "digital counseling platform",
    "smart admission consultant",
    "AI-driven career planning",
    "college admission",
    "career counsellor",
    "best admission consultant",
    "study guidance",
    "education advisor",
    "admission help",
    "top colleges",
    "career counseling",
    "college application support"
  ],
  authors: [{ name: "FastAdmission AI Team", url: "https://fastadmission.in" }],
  creator: "FastAdmission AI Team",
  publisher: "FastAdmission",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fastadmission.in",
    siteName: "FastAdmission - AI Career Counselor",
    title: "FastAdmission – AI-Powered Career & College Admission Counselor",
    description: "Transform your career with AI-powered counseling! Get personalized college admission guidance, career assessments, and smart recommendations from India's most advanced education advisor.",
    images: [
      {
        url: "https://fastadmission.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FastAdmission - AI-Powered Career Counseling Platform",
      },
      {
        url: "https://fastadmission.in/og-image-square.jpg",
        width: 1200,
        height: 1200,
        alt: "FastAdmission AI Career Counselor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@FastAdmissionAI",
    creator: "@FastAdmissionAI",
    title: "FastAdmission – AI-Powered Career & College Admission Counselor",
    description: "Transform your career with AI-powered counseling! Get personalized guidance from India's most advanced education advisor.",
    images: ["https://fastadmission.in/og-image.jpg"],
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://fastadmission.in",
    languages: {
      'en-US': 'https://fastadmission.in',
      'hi-IN': 'https://fastadmission.in/hi',
    },
  },
  category: 'education',
  classification: 'Career Counseling, Education Technology, AI Services',
};

// Structured Data for Organization
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "FastAdmission",
  "alternateName": "FastAdmission AI Career Counselor",
  "url": "https://fastadmission.in",
  "logo": "https://fastadmission.in/logo.png",
  "description": "AI-powered career counseling and college admission guidance platform",
  "foundingDate": "2015",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9876543210",
    "contactType": "customer service",
    "availableLanguage": ["English", "Hindi"]
  },
  "sameAs": [
    "https://www.facebook.com/FastAdmissionAI",
    "https://www.twitter.com/FastAdmissionAI",
    "https://www.linkedin.com/company/fastadmission",
    "https://www.instagram.com/fastadmission_ai"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "IN",
    "addressRegion": "India"
  }
};

function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        
        {/* Additional meta tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className="antialiased">
        <Navbar />
        {children}
        <Footer />
        
        {/* AI Chatbot - Temporarily disabled for testing */}
        {/* <AIChatbot /> */}
        
        {/* Analytics */}
        <SpeedInsights />
        <Analytics />
        <WebVitals />
        <AOSInit />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
      </body>
    </html>
  );
}

export default RootLayout;