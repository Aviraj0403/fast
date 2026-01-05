"use client";
import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  twitterHandle?: string;
  keywords?: string[];
  structuredData?: object;
}

export default function SEO({
  title,
  description = "Transform your career with AI-powered counseling. Get personalized career assessments, smart college matching, and intelligent guidance from India's most advanced education advisor.",
  url = "https://fastadmission.in",
  image = "https://fastadmission.in/og-image.jpg",
  twitterHandle = "@FastAdmissionAI",
  keywords = [
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
  structuredData
}: SEOProps) {
  const siteName = "FastAdmission AI";
  const pageTitle = title ? `${title} | ${siteName}` : `${siteName} - Revolutionary Career Counseling Platform`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content="FastAdmission AI Team" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="FastAdmission AI - Revolutionary Career Counseling Platform" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="FastAdmission AI - AI-Powered Career Counseling" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#2563eb" />
      <meta name="msapplication-TileColor" content="#2563eb" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Structured Data */}
      {structuredData && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* Default Organization Structured Data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "2847",
              "bestRating": "5",
              "worstRating": "1"
            }
          })
        }}
      />
      
      {/* Service Structured Data */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Career Counseling",
            "description": "AI-powered career counseling and college admission guidance",
            "provider": {
              "@type": "Organization",
              "name": "FastAdmission"
            },
            "serviceType": "Career Counseling",
            "offers": [
              {
                "@type": "Offer",
                "name": "AI Career Assessment",
                "description": "Free AI-powered career assessment with personalized recommendations",
                "price": "0",
                "priceCurrency": "INR"
              },
              {
                "@type": "Offer",
                "name": "Premium AI Counseling",
                "description": "One-on-one counseling with AI insights and expert guidance",
                "price": "2999",
                "priceCurrency": "INR"
              }
            ],
            "areaServed": {
              "@type": "Country",
              "name": "India"
            }
          })
        }}
      />
    </Head>
  );
}
