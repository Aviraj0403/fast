'use client';

import Image from 'next/image';

const blogPosts = [
  {
    title: '7 Effective Ways to Improve Your Time Management Skills',
    excerpt:
      'Do you often feel stressed because you have too much work and not enough time in the day? So how come some individuals have enough time to accomplish everything? The key is managing time...',
    image: '/image/Blog4-Image-750x465.jpg',
    date: 'Dec 23, 2022',
  },
  {
    title: 'Top 5 Law Professions in India',
    excerpt:
      'A large number of students are choosing Career Consultant in Delhi to pursue LLB after finishing high school. In the past, students with an inclination towards LLB programmes were bombarded...',
    image: '/image/blog2.png',
    date: 'Dec 22, 2022',
  },
  {
    title: 'What are the Career Options in Physiotherapy?',
    excerpt:
      'Physiotherapy is the treatment of disease, injury or deformity in any outer organ of the body through massages, heat treatment, and exercise rather than any medicines or drugs...',
    image: '/image/blog3.png',
    date: 'Dec 21, 2022',
  },
  {
    title: 'Architect Vs. Civil Engineer: What is the Difference?',
    excerpt:
      'An architect is a professional involved in designing and planning every construction element and is responsible for the project’s aesthetic appeal along with operations and safety...',
    image: '/image/blog4.png',
    date: 'Dec 20, 2022',
  },
];

export default function BlogSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Blogs</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {blogPosts.map((post, idx) => (
            <div key={idx} className="flex gap-6">
              {/* Blog Image with Date Overlay */}
              <div className="relative w-[160px] h-[120px] shrink-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={160}
                  height={120}
                  className="object-cover rounded"
                />
                <div className="absolute top-0 right-0 bg-blue-800 text-white text-xs px-2 py-1">
                  {post.date}
                </div>
              </div>

              {/* Blog Content */}
              <div>
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {post.excerpt} <span className="text-blue-600">[...]</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
