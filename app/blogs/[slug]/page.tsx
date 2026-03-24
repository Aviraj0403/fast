import { getPostBySlug } from "@/app/data/posts";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ChevronRight,
  Quote, 
  Clock, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Award,
  Home
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-white text-[#0f172a]">
      {/* Background Gradients for Premium Feel */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/50 to-transparent -z-10"></div>
      
      <div className="container mx-auto px-6 max-w-6xl relative">
        {/* BREADCRUMB - Enhanced Spacing & Visibility */}
        <nav className="flex items-center gap-6 mb-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 overflow-x-auto whitespace-nowrap pb-4 border-b border-slate-100">
          <Link href="/" className="hover:text-[#2563eb] transition-colors flex items-center gap-2 shrink-0">
             <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0 opacity-30" />
          <Link href="/blogs" className="hover:text-[#2563eb] transition-colors shrink-0">
             Strategic Analysis
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0 opacity-30" />
          <span className="text-[#2563eb] line-clamp-1 shrink-0 bg-blue-50 px-3 py-1 rounded-md">{post.category} Focus</span>
        </nav>

        {/* HERO SECTION */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="px-4 py-1.5 bg-[#2563eb] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-500/20">
              {post.category || "Education"}
            </span>
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <Clock className="w-3 h-3" /> {post.duration || "5 Min Read"}
            </div>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-[#0f172a] leading-[1.1] tracking-tighter mb-10 max-w-4xl">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 p-6 bg-slate-50/50 backdrop-blur-sm rounded-[32px] border border-slate-100 w-fit">
            <div className="w-12 h-12 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
              <Image 
                src="/image/contact.jpeg" 
                alt={post.author} 
                width={48} 
                height={48} 
                className="object-cover w-full h-full"
                unoptimized
              />
            </div>
            <div>
              <p className="text-[#0f172a] font-black text-sm">{post.author}</p>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Chief Admission Advisor</p>
            </div>
            <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest hidden sm:block">
              Published {post.date}
            </p>
          </div>
        </header>

        {/* MAIN IMAGE - Redesigned Margin */}
        <div className="relative h-[400px] md:h-[650px] rounded-[64px] overflow-hidden shadow-2xl mb-16 border border-slate-100 group">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/40 via-transparent to-transparent"></div>
        </div>

        {/* CONTENT GRID - Optimized for Perfect Margin */}
        <div className="grid lg:grid-cols-12 gap-16 xl:gap-24">
          {/* SIDEBAR - Key Benefits & Outlook */}
          <aside className="lg:col-span-4 space-y-12 order-2 lg:order-1">
            <div className="p-10 bg-[#0f172a] rounded-[48px] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
              <Sparkles className="text-blue-400 w-8 h-8 mb-6" />
              <h3 className="text-xl font-black mb-10 tracking-tight flex items-center gap-2">
                Strategic Benefits
              </h3>
              <ul className="space-y-8">
                {post.benefits?.map((benefit: { title: string; desc: string }, i: number) => (
                  <li key={i} className="group/item">
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2">
                       <span className="w-1 h-1 bg-blue-400 rounded-full"></span> {benefit.title}
                    </p>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed group-hover/item:text-white transition-colors">
                      {benefit.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-10 bg-slate-50/50 border border-slate-100 rounded-[48px] backdrop-blur-sm">
               <TrendingUp className="text-[#2563eb] w-8 h-8 mb-6" />
               <h3 className="text-xl font-black text-[#0f172a] mb-8 tracking-tight">2026 Projections</h3>
               <div className="space-y-4">
                  {post.perks?.map((perk: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 text-sm font-black text-slate-500 hover:text-[#0f172a] transition-colors cursor-default">
                      <div className="w-2 h-2 rounded-full border-2 border-[#2563eb]"></div>
                      {perk}
                    </div>
                  ))}
               </div>
            </div>
          </aside>

          {/* ARTICLE CONTENT - Balanced Margin */}
          <article className="lg:col-span-8 order-1 lg:order-2">
            <div 
              className="prose prose-lg max-w-none prose-slate 
              prose-headings:text-[#0f172a] prose-headings:font-black prose-headings:tracking-tighter
              prose-p:text-slate-600 prose-p:leading-[1.8] prose-p:font-medium prose-p:mb-8
              prose-strong:text-[#0f172a] prose-strong:font-black
              prose-li:text-slate-600 prose-li:font-medium
              prose-img:rounded-[32px] prose-img:border prose-img:border-slate-100 prose-img:shadow-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* MENTOR MOTIVATION - High-End Accent */}
            <div className="mt-20 p-12 md:p-16 bg-[#0f172a] rounded-[56px] relative group overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-50"></div>
               <Quote className="w-12 h-12 text-[#2563eb] mb-10 opacity-30 transform group-hover:scale-110 transition-transform" />
               <h4 className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tight relative z-10 leading-tight">
                  Counselor&apos;s Vision <span className="text-blue-400">2026</span>
               </h4>
               <p className="text-xl md:text-2xl font-medium text-slate-300 italic leading-relaxed relative z-10 pr-10">
                 &quot;{post.motivation}&quot;
               </p>
               <div className="mt-12 flex items-center gap-5 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#2563eb] flex items-center justify-center shadow-2xl shadow-blue-500/40">
                     <Award className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-sm font-black text-white block">Rajnish Singh</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Chief Strategy Architect</span>
                  </div>
               </div>
            </div>
          </article>
        </div>

        {/* CTA SECTION - Updated Tag & Styling */}
        <section className="mt-20 p-12 md:p-24 bg-[#2563eb] rounded-[64px] shadow-2xl shadow-blue-500/30 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-400/20 to-transparent"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.5em] mb-8">Priority Admission Open 2026</span>
            <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-[1.1]">
              Architect Your <br /> Future Path Today.
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <a 
                href={`https://wa.me/918581841853?text=I%20need%20expert%20guidance%20for%20${encodeURIComponent(post.category)}%20-%20FastAdmission`}
                target="_blank"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#2563eb] px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-blue-50 hover:scale-105 active:scale-95 transition-all shadow-2xl"
              >
                Connect To Desk <ChevronRight className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/918581841853?text=I%20want%20to%20view%202026%20FEE%20STRUCTURE"
                target="_blank"
                className="inline-flex items-center justify-center gap-3 bg-[#0f172a] text-white px-12 py-6 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-[#0f172a]/90 hover:scale-105 active:scale-95 transition-all shadow-2xl"
              >
                Fee Roadmap <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
