// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import WebVitals from "@/components/WebVitals";
import AOSInit from "@/components/AOSInit";

// === Fonts ===
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// === Metadata ===
export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: {
    default: "Future Advice For Successful Tomorrow",
    template: "%s | Your Site Name",
  },
  description: "Default description of your awesome Next.js app.",
  keywords: ["nextjs", "portfolio", "developer", "react", "web performance"],
  authors: [{ name: "Your Name", url: "https://your-domain.com/about" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Your Site Name",
    description: "Default description of your awesome Next.js app.",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Default OG Image",
      },
    ],
    siteName: "Your Site Name",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Site Name",
    description: "Default description of your awesome Next.js app.",
    images: ["https://your-domain.com/og-image.jpg"],
    creator: "@yourtwitterhandle",
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
        <AOSInit/>
        {children}

        {/* Web Vitals (only in production for performance) */}
        {process.env.NODE_ENV === "production" && <WebVitals />}
      </body>
    </html>
  );
}
