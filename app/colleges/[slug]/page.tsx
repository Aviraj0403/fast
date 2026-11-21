import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getCollegeBySlug } from '../../data/colleges';
import type { Metadata } from 'next';

interface Props { 
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) return { title: 'College not found' };
  return { 
    title: `${college.name} - FastAdmission`, 
    description: college.description 
  };
}

export default async function CollegePage({ params }: Props) {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) return notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-24 pt-40 min-h-screen">
      <header className="mb-12">
        <span className="text-brand-600 text-xs font-bold tracking-wide mb-4 block">Institutional Deep-Dive</span>
        <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6 tracking-tight leading-tight">{college.name}</h1>
        <div className="flex items-center gap-4 text-slate-400 text-xs font-bold tracking-wide">
           <span className="bg-slate-100 px-3 py-1 rounded-md">{college.location}</span>
           <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
           <span className="bg-blue-50 text-brand-600 px-3 py-1 rounded-md">{college.category}</span>
        </div>
      </header>

      <div className="w-full h-72 md:h-[500px] relative rounded-2xl overflow-hidden mb-12 shadow-lg border border-slate-100">
        <Image src={college.image} alt={college.name} fill className="object-cover" unoptimized />
      </div>

      <section className="prose prose-lg max-w-none prose-slate">
        <div className="p-10 bg-slate-50 rounded-2xl border border-slate-100 mb-10">
            <h2 className="text-xl font-bold text-ink mb-4">Overview</h2>
            <p className="text-slate-600 leading-relaxed font-medium">{college.description}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-brand-950 rounded-2xl text-white">
                <h3 className="text-white font-bold text-lg mb-4">Priority Admission</h3>
                <p className="text-slate-400 text-sm mb-6">Direct institutional liaison available for this college through Rajnish Singh&apos;s primary desk.</p>
                <a 
                  href={`https://wa.me/918581841853?text=I%20want%20to%20apply%20to%20${encodeURIComponent(college.name)}`}
                  target="_blank"
                  className="inline-block bg-brand-500 text-white px-6 py-3 rounded-xl font-bold text-xs tracking-wide"
                >
                  Consult Now
                </a>
            </div>
            <div className="p-8 bg-blue-50 rounded-2xl border border-brand-100">
                <h3 className="text-ink font-bold text-lg mb-4">Key Disciplines</h3>
                <p className="text-slate-500 text-sm">Recognized for excellence in {college.category} and related innovative academic streams.</p>
            </div>
        </div>
      </section>
    </main>
  );
}
