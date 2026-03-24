import Link from "next/link";
import Image from "next/image";
import { posts } from "@/app/data/posts";
import { ChevronRight } from "lucide-react";

export default function BlogListingPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-12 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#2563eb] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            Educational Insights
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tighter mb-6">
            Latest from our <span className="text-[#2563eb]">Knowledge Base</span>
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
              className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute top-6 left-6">
                  <span className="bg-white/90 backdrop-blur-md text-[#0f172a] text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                    {post.date}
                  </span>
                </div>
              </div>
              <div className="p-10 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-[#2563eb] uppercase tracking-[0.2em]">
                  <span>{post.author}</span>
                  <span className="w-1 h-1 bg-blue-200 rounded-full"></span>
                  <span>Education Expert</span>
                </div>
                <h2 className="text-2xl font-black text-[#0f172a] mb-4 group-hover:text-[#2563eb] transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h2>
                <p className="text-slate-500 text-sm mb-8 line-clamp-3 leading-relaxed font-medium">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[#0f172a] font-black text-xs uppercase tracking-widest group-hover:text-[#2563eb] transition-colors">
                    Read Analysis
                  </span>
                  <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-[#2563eb] group-hover:text-white flex items-center justify-center transition-all duration-300">
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
