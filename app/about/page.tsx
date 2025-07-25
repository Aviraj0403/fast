import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | My Site",
  description: "Learn more about our company and team.",
  openGraph: {
    title: "About Us | My Site",
    description: "Learn more about our company and team.",
    url: "https://yourdomain.com/about",
    siteName: "My Site",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "About Us",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | My Site",
    description: "Learn more about our company and team.",
    creator: "@yourtwitterhandle",
    images: ["https://yourdomain.com/og-about.jpg"],
  },
};

export default function AboutPage() {
  return (
    <main>
      <h1>About Us</h1>
      <p>
        Welcome to the About page! We are passionate about what we do and love helping our clients grow.
      </p>
    </main>
  );
}
