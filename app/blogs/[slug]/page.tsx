import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getPostBySlug } from '../../data/posts';

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: 'Post not found' };
  }
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  } as any;
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-600 text-sm mb-4">{post.date}</p>
          <div className="w-full h-64 relative rounded overflow-hidden mb-6">
            <Image src={post.image} alt={post.title} fill className="object-cover" />
          </div>
        </header>

        <section className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            image: [post.image],
            datePublished: post.date,
            description: post.excerpt,
          }),
        }}
      />
    </main>
  );
}
