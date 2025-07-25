// components/SEO.tsx
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
  description,
  url,
  image,
  twitterHandle = "@yourtwitterhandle",
}: SEOProps) {
  const siteName = "Your Site Name";
  const pageTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Head>
  );
}
