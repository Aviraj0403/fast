"use client";

import Image from 'next/image';
import Link from 'next/link';
import { posts } from '../data/posts';
import { colleges } from '../data/colleges';
import { ArrowRight, Calendar, MapPin, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BlogSection() {
  return (
    <section className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm mb-2 block">Knowledge Hub</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Latest Insights & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Featured Colleges</span>
            </h2>
          </div>

          <Button variant="outline" className="hidden md:flex gap-2 rounded-full px-6 hover:bg-blue-50 border-blue-200 text-blue-700">
            View All Posts <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Blog Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative w-full h-[240px] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-t-3xl group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

                <time className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-blue-900 font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </time>
              </div>

              <div className="p-8">
                <div className="mb-4">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-md">Article</span>
                </div>

                <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blogs/${post.slug}`}
                  className="inline-flex items-center text-gray-900 font-semibold text-sm group-hover:text-blue-600 transition-all"
                >
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Featured Colleges */}
        <div className="relative rounded-[2.5rem] bg-[#0f172a] p-8 md:p-12 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white">Featured Institutions</h2>
            <Button variant="ghost" className="text-blue-200 hover:text-white hover:bg-white/10 rounded-full">
              Browse All Colleges <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colleges.map((college) => (
              <div
                key={college.slug}
                className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
              >
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={college.image}
                    alt={college.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {college.category}
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{college.name}</h4>

                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                    <MapPin className="w-4 h-4" />
                    {college.location}
                  </div>

                  <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                    {college.description}
                  </p>

                  <Link
                    href={`/colleges/${college.slug}`}
                    className="block w-full text-center bg-white/10 hover:bg-white/20 text-white font-medium py-3 rounded-xl transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
