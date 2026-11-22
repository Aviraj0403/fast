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
import { getSiteConfig } from "@/lib/siteConfig";
import { Footer } from "@/components/Footer";
import { SiteSdk } from "@/components/SiteSdk";
import { ClickTracker } from "@/components/ClickTracker";
import { MobileCta } from "@/components/MobileCta";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { getSiteSettings } from "@/lib/content";

// === Fonts ===
const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"], display: "swap" });

// === Metadata ===
const baseMetadata: Metadata = {
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
    images: [{ url: "https://fastadmission.in/brand-logo.png", width: 1200, height: 630, alt: "FastAdmission" }],
    siteName: "FastAdmission",
  },
  twitter: {
    card: "summary_large_image",
    title: "FastAdmission – College Admission & Career Counselling",
    description: "Expert counselling for college admissions and career planning in India.",
    images: ["https://fastadmission.in/brand-logo.png"],
    creator: "@fastadmission",
  },
  icons: { icon: "/favicon.ico", apple: "/brand-mark.png" },
};

/** Verification and the default share image come from the admin; everything else stays as written above. */
export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  const og = site?.defaultOgImage;
  return {
    ...baseMetadata,
    verification: site?.googleVerification ? { google: site.googleVerification } : SITE.googleVerification ? { google: SITE.googleVerification } : undefined,
    ...(og ? { openGraph: { ...baseMetadata.openGraph, images: [{ url: og, width: 1200, height: 630, alt: SITE.name }] }, twitter: { ...baseMetadata.twitter, images: [og] } } : {}),
  };
}

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0a2336" };

// === Layout ===
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteSettings(); // Analytics and Pixel ids are set in the admin; nothing loads until they are
  const config = await getSiteConfig();
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${jakarta.variable} antialiased`}>
      <head>
        {site?.gaMeasurementId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaMeasurementId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.gaMeasurementId}');`}
            </Script>
          </>
        )}
        {site?.metaPixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${site.metaPixelId}');fbq('track','PageView');`}
          </Script>
        )}
      </head>
      <body className="pb-16 md:pb-0">
        <JsonLd data={{ "@context": "https://schema.org", "@type": "EducationalOrganization", name: SITE.name, url: SITE.url, logo: `${SITE.url}/brand-mark.png`, telephone: SITE.phone, email: SITE.email, founder: { "@type": "Person", name: "Rajnish Singh" }, areaServed: "IN", address: { "@type": "PostalAddress", streetAddress: SITE.address.street, addressLocality: SITE.address.locality, addressRegion: SITE.address.region, postalCode: SITE.address.postalCode, addressCountry: SITE.address.country }, hasMap: SITE.mapsUrl, sameAs: [SITE.mapsUrl] }} />
        <Navbar sections={config.sections} />
        <AOSInit />

        {children}
        <SpeedInsights />
        <Analytics />

        <Footer />
        <SiteSdk />
        <ClickTracker />
        <MobileCta />
        {/* Web Vitals (only in production for performance) */}
        {process.env.NODE_ENV === "production" && <WebVitals />}
      </body>
    </html>
  );
}
