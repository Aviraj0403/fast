"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogCardData } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";

export default function BlogSection({ posts }: { posts: BlogCardData[] }) {
  return (
    <section className="section bg-canvas">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading align="left" eyebrow="Latest from the blog" title="Guides to help you decide" />
          <Link href="/blogs" className="hidden items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800 md:inline-flex">
            All articles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/blogs/${post.slug}`} className="card card-hover group flex flex-col overflow-hidden">
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-50">
                <Image src={post.image} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-medium text-muted">
                  {post.date} <span className="mx-1.5">·</span> {post.author}
                </p>
                <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-snug transition-colors group-hover:text-brand-700">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{post.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
                  Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link href="/blogs" className="btn btn-outline w-full">All articles</Link>
        </div>
      </div>
    </section>
  );
}
