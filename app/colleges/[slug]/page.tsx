import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getCollegeBySlug } from '../../data/colleges';

import { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) return { title: 'College not found' };
  return { title: college.name, description: college.description };
}

export default async function CollegePage({ params }: Props) {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-16">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{college.name}</h1>
        <p className="text-gray-600">{college.location} • {college.category}</p>
      </header>

      <div className="w-full h-72 relative rounded overflow-hidden mb-6">
        <Image src={college.image} alt={college.name} fill className="object-cover" />
      </div>

      <section className="prose max-w-none">
        <p>{college.description}</p>
        <p>Contact and admission details can be added here. Replace with real data or API integration.</p>
      </section>
    </main>
  );
}
