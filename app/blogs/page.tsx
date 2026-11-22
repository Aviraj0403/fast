import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getBlogCards, pageSeo } from "@/lib/content";
import { ChevronRight } from "lucide-react";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const seo = await pageSeo("/blogs");
  return { title: seo?.title || "Blog: admission and career guidance", description: seo?.description || "Guides on colleges, entrance exams, fees and careers from the FastAdmission counsellors.", alternates: { canonical: "/blogs" }, ...(seo?.noindex ? { robots: { index: false } } : {}) };
}

export default async function BlogListingPage() {
  const { items: posts } = await getBlogCards();
  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-12 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-brand-100 text-brand-600 text-xs font-bold tracking-wide mb-4">
            Educational Insights
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-ink tracking-tight mb-6">
            Latest from our <span className="text-brand-600">Knowledge Base</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Expert analysis and guidance to help you navigate the complex landscape of modern education and peak career opportunities.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <Link 
              href={`/blogs/${post.slug}`} 
              key={post.slug}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-500 transform flex flex-col"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md text-ink text-xs font-bold px-4 py-2 rounded-full tracking-wide shadow-xl">
                    {post.date}
                  </span>
                </div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-xs font-bold text-brand-600 tracking-wide">
                  <span>{post.author}</span>
                  <span className="w-1 h-1 bg-brand-200 rounded-full"></span>
                  <span>Education Expert</span>
                </div>
                <h2 className="text-2xl font-bold text-ink mb-4 group-hover:text-brand-600 transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed font-medium">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-ink font-bold text-xs tracking-wide group-hover:text-brand-600 transition-colors">
                    Read Analysis
                  </span>
                  <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-brand-500 group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
