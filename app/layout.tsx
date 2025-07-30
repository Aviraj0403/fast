// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import WebVitals from "@/components/WebVitals";
import AOSInit from "@/components/AOSInit";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// === Fonts ===
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// === Metadata ===
export const metadata: Metadata = {
  metadataBase: new URL("https://fastadmission.in"),
  title: {
    default: "FastAdmission – Best Career & College Admission Counsellor",
    template: "%s | FastAdmission",
  },
  description: "Get expert career guidance and college admission counselling from India's trusted education advisors at FastAdmission.",
  keywords: [
    "college admission",
    "career counsellor",
    "best admission consultant",
    "study guidance",
    "education advisor",
    "FastAdmission",
    "admission help",
    "top colleges",
    "career counseling",
    "college application support"
  ],
  authors: [{ name: "FastAdmission Team", url: "https://fastadmission.in" }],
  creator: "FastAdmission Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fastadmission.in",
    title: "FastAdmission – Best Career & College Admission Counsellor",
    description: "Expert advice for college admissions and career decisions. FastAdmission helps students secure seats in top institutions.",
    images: [
      {
        url: "https://fastadmission.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FastAdmission - Your Gateway to Top Colleges",
      },
    ],
    siteName: "FastAdmission",
  },
  twitter: {
    card: "summary_large_image",
    title: "FastAdmission – College Admission & Career Counselling",
    description: "FastAdmission offers expert counselling for college admissions and career planning in India.",
    images: ["https://fastadmission.in/og-image.jpg"],
    creator: "@fastadmission",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// === Layout ===
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        {/* Meta tag for responsiveness */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

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
            gtag('config', 'G-XXXXXXXXXX', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body>
        <Navbar />
        <AOSInit />
        
        {children}
        <SpeedInsights />
        <Analytics />

        <Footer />
        {/* Web Vitals (only in production for performance) */}
        {process.env.NODE_ENV === "production" && <WebVitals />}
      </body>
    </html>
  );
}
