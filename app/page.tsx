import Image from "next/image";

export const metadata = {
  title: 'Home Page | Your Site Name',
  description: 'This is the homepage of your Next.js app.',
  openGraph: {
    title: 'Home Page | Your Site Name',
    description: 'This is the homepage of your Next.js app.',
    url: 'https://your-domain.com',
    siteName: 'Your Site Name',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home Page | Your Site Name',
    description: 'This is the homepage of your Next.js app.',
    images: ['https://your-domain.com/og-image.jpg'],
    creator: '@yourtwitterhandle',
  },
};

export default function HomePage() {
  return (
    <main>
      <h1>Hello, this is the homepage!</h1>
      <p>Using App Router with layout and SEO metadata.</p>
      
      {/* Example using next/image */}
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
  );
}
