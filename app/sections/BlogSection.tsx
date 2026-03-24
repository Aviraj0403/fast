"use client";

import Image from 'next/image';
import Link from 'next/link';
import { posts } from '../data/posts';
import { ChevronRight } from 'lucide-react';

export default function BlogSection() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#2563eb] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              Latest Insights
            </span>
            <h3 className="text-4xl md:text-5xl font-black text-[#0f172a] tracking-tighter leading-tight">
              Stay Ahead with Our <span className="text-[#2563eb]">Executive Guide</span>
            </h3>
          </div>
          <Link 
            href="/blogs" 
            className="hidden md:flex items-center gap-2 text-[#2563eb] font-black text-xs uppercase tracking-widest border-b-2 border-transparent hover:border-[#2563eb] transition-all pb-1 mb-2"
          >
            Explore All Analysis <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => (
            <Link 
              key={post.slug} 
              href={`/blogs/${post.slug}`}
              className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute top-6 left-6 text-[10px] font-black text-white bg-blue-600/90 backdrop-blur-md px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                  {post.date}
                </div>
              </div>

              <div className="p-10">
                 <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-[#2563eb] uppercase tracking-[0.2em]">
                  <span>{post.author}</span>
                  <span className="w-1 h-1 bg-blue-200 rounded-full"></span>
                  <span>Expert</span>
                </div>
                <h3 className="text-xl font-black text-[#0f172a] mb-4 line-clamp-2 group-hover:text-[#2563eb] transition-colors leading-tight">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 font-medium">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-[#0f172a] font-black text-xs uppercase tracking-widest group-hover:text-[#2563eb] transition-colors">
                      Full Story
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 group-hover:bg-[#2563eb] group-hover:text-white flex items-center justify-center transition-all duration-300">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="https://wa.me/918581841853?text=I%20want%20to%20know%20more%20about%20educational%20trends%20for%202026"
            target="_blank"
            className="inline-flex items-center gap-3 px-10 py-5 bg-[#0f172a] hover:bg-[#2563eb] text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-2xl hover:scale-105 active:scale-95"
          >
            Get Expert Insights on WhatsApp
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
