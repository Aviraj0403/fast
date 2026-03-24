import { colleges } from '../../data/colleges';
import SEO from '../../../components/Seo';
import Image from 'next/image';

interface Params {
  params: Promise<{ area: string }>;
}

export default async function AreaPage({ params }: Params) {
  const { area: areaParam } = await params;
  const area = decodeURIComponent(areaParam || '');
  const matches = colleges.filter((c) => c.location.toLowerCase().includes(area.toLowerCase()));

  const title = `Colleges in ${area}`;
  const description = `Discover colleges and programs in ${area}. Find top colleges by category, apply, and get counselling assistance.`;

  return (
    <>
      <SEO title={title} description={description} />
      <main className="py-24 pt-40 min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#2563eb] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              Regional Directory
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tighter mb-4">{title}</h1>
            <p className="text-lg text-slate-500 font-medium max-w-2xl">{description}</p>
          </header>

          {matches.length === 0 ? (
            <div className="bg-white p-20 rounded-[48px] border border-slate-100 text-center">
              <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No colleges found in this area.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {matches.map((c) => (
                <div key={c.slug} className="group bg-white rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image 
                        src={c.image} 
                        alt={c.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                        unoptimized
                    />
                  </div>
                  <div className="p-8">
                    <span className="text-[10px] font-black text-[#2563eb] uppercase tracking-widest mb-2 block">{c.category}</span>
                    <h3 className="text-xl font-black text-[#0f172a] mb-2">{c.name}</h3>
                    <p className="text-sm text-slate-400 font-black uppercase tracking-tight mb-4">{c.location}</p>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed line-clamp-2">{c.description}</p>
                    <div className="mt-8">
                         <a 
                            href={`/colleges/${c.slug}`}
                            className="text-[10px] font-black text-[#0f172a] border-b-2 border-blue-500 pb-1 hover:text-blue-500 transition-colors"
                         >
                            VIEW DETAILS
                         </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
