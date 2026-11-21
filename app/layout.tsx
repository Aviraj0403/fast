// app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import WebVitals from "@/components/WebVitals";
import AOSInit from "@/components/AOSInit";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Poptin } from "@/components/Poptin";

// === Fonts ===
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });

// === Metadata ===
export const metadata: Metadata = {
  metadataBase: new URL("https://fastadmission.in"),
  title: {
    default: "FastAdmission – Career Counselling & College Admission Experts",
    template: "%s | FastAdmission",
  },
  description:
    "Career counselling and admission guidance for Engineering, Medical, Management and more. Led by Rajnish Singh, FastAdmission helps students choose the right college and secure the seat.",
  keywords: [
    "Rajnish Singh",
    "College admission consultant",
    "Career counsellor Bihar",
    "Engineering admissions 2026",
    "MBBS admission guidance",
    "FastAdmission",
  ],
  authors: [{ name: "FastAdmission Team", url: "https://fastadmission.in" }],
  creator: "FastAdmission Team",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://fastadmission.in",
    title: "FastAdmission – Career Counselling & College Admission Experts",
    description: "Expert advice for college admissions and career decisions. FastAdmission helps students secure seats in top institutions.",
    images: [{ url: "https://fastadmission.in/og-image.jpg", width: 1200, height: 630, alt: "FastAdmission" }],
    siteName: "FastAdmission",
  },
  twitter: {
    card: "summary_large_image",
    title: "FastAdmission – College Admission & Career Counselling",
    description: "Expert counselling for college admissions and career planning in India.",
    images: ["https://fastadmission.in/og-image.jpg"],
    creator: "@fastadmission",
  },
  icons: { icon: "/favicon.ico", apple: "/brand-mark.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0a2336" };

// === Layout ===
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${jakarta.variable} antialiased`}>
      <head>
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
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
        <Poptin />
        {/* Web Vitals (only in production for performance) */}
        {process.env.NODE_ENV === "production" && <WebVitals />}
      </body>
    </html>
  );
}
