"use client";
import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  twitterHandle?: string;
}

export default function SEO({
  title,
  description = "Get expert career guidance and college admission counselling from India's trusted education advisors at FastAdmission.",
  url = "https://fastadmission.in",
  image = "https://fastadmission.in/og-image.jpg",
  twitterHandle = "@fastadmission",
}: SEOProps) {
  const siteName = "FastAdmission";
  const pageTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="college admission, career counselling, admission consultant, education advisor, top colleges, FastAdmission" />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
}
