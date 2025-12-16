"use client";

import Image from 'next/image';
import Link from 'next/link';
import { posts } from '../data/posts';
import { colleges } from '../data/colleges';

export default function BlogSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Blogs</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow-sm hover:shadow-lg overflow-hidden transition-shadow duration-200">
              <div className="relative w-full h-[220px]">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded-t-lg"
                />
                <time className="absolute top-3 right-3 bg-blue-800 text-white text-xs px-2 py-1 rounded-md">
                  {post.date}
                </time>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{post.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-3">{post.excerpt}</p>
                <Link href={`/blogs/${post.slug}`} className="text-blue-600 font-medium hover:underline">
                  Read More
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Colleges subsection */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Colleges</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colleges.map((college) => (
              <div key={college.slug} className="bg-white rounded-lg shadow-sm hover:shadow-lg overflow-hidden transition-shadow duration-200">
                <div className="w-full h-44 bg-gray-100 overflow-hidden">
                  <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold">{college.name}</h4>
                  <p className="text-sm text-gray-500">{college.location} • {college.category}</p>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-3">{college.description}</p>
                  <Link href={`/colleges/${college.slug}`} className="mt-3 inline-block text-blue-600 font-medium hover:underline">
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
