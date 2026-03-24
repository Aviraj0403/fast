import { getCourseBySlug } from "@/app/data/courses";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ChevronRight, 
  CheckCircle2, 
  Home, 
  MessageCircle,
  Clock,
  BookOpen
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white text-[#0f172a]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* BREADCRUMB - Enhanced Spacing & Visibility */}
        <nav className="flex items-center gap-6 mb-16 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 overflow-x-auto whitespace-nowrap pb-4 border-b border-slate-100">
          <Link href="/" className="hover:text-[#2563eb] transition-colors flex items-center gap-2 shrink-0">
             <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0 opacity-30" />
          <Link href="/courses" className="hover:text-[#2563eb] transition-colors shrink-0">
             Academic Programs
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0 opacity-30" />
          <span className="text-[#2563eb] line-clamp-1 shrink-0 bg-blue-50 px-3 py-1 rounded-md">{course.title}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16 mb-24">
          <div className="relative h-[450px] lg:h-auto rounded-[56px] overflow-hidden shadow-2xl group border border-slate-100">
            <Image
              src={course.image}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000"
              unoptimized
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/40 via-transparent to-transparent"></div>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-[#2563eb] font-black uppercase tracking-[0.3em] text-[10px] mb-4 bg-blue-50 w-fit px-4 py-1.5 rounded-full border border-blue-100">
              {course.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter">
              {course.title}
            </h1>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed font-medium italic border-l-4 border-blue-100 pl-6">
              {course.description}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-12">
              <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 hover:border-blue-100 transition-colors group">
                <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-2 flex items-center gap-2">
                  <Clock className="w-3 h-3 text-[#2563eb]" /> Duration
                </p>
                <p className="font-black text-xl text-[#0f172a]">{course.duration}</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 hover:border-blue-100 transition-colors group">
                <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest mb-2 flex items-center gap-2">
                  <BookOpen className="w-3 h-3 text-[#2563eb]" /> Eligibility
                </p>
                <p className="font-black text-xl text-[#0f172a]">{course.eligibility}</p>
              </div>
            </div>

            <a 
              href={`https://wa.me/918581841853?text=I%20want%20to%20apply%20for%20${encodeURIComponent(course.title)}%20-%20Expert%20Guidance`}
              target="_blank"
              className="bg-[#2563eb] text-white px-10 py-5 rounded-[24px] font-black text-sm uppercase tracking-widest text-center shadow-2xl shadow-blue-500/20 hover:bg-[#1d4ed8] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
            >
              Consult Admission Expert <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* PROCESS SECTION - Standardized Padding */}
        <div className="bg-[#0f172a] rounded-[64px] p-12 md:p-20 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/5 blur-[120px] rounded-full"></div>
          <div className="relative z-10">
            <div className="text-center mb-16">
               <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4 block">Strategic Roadmap</span>
               <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">Elite <span className="text-blue-400">Admission Process</span></h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-5xl mx-auto">
              {[
                { step: "01", title: "Strategy Session", desc: "Speak with Rajnish Singh to map your academic potential to premier institution clusters." },
                { step: "02", title: "Portfolio Prep", desc: "Professional assistance in documentation and portfolio building for top-tier selection." },
                { step: "03", title: "Direct Liaison", desc: "Strategic communication with university heads to ensure your application is prioritized." },
                { step: "04", title: "Final Boarding", desc: "Seamless completion of fees and registration with 100% seat assurance." }
              ].map((item) => (
                <div key={item.step} className="flex gap-8 group">
                  <div className="text-5xl font-black text-white/10 group-hover:text-blue-500/20 transition-colors duration-500">{item.step}</div>
                  <div>
                    <h3 className="text-2xl font-black mb-3 text-white flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* FOOTER CTA */}
        <div className="mt-24 text-center">
            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-8">Ready to secure your future?</p>
            <a 
              href="https://wa.me/918581841853?text=I%20want%20to%20start%20my%20enrolment%20process"
              target="_blank"
              className="inline-flex items-center gap-3 bg-slate-50 hover:bg-slate-100 text-[#0f172a] px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest transition-all"
            >
              Contact Head Office <MessageCircle className="w-4 h-4 text-[#2563eb]" />
            </a>
        </div>
      </div>
    </div>
  );
}
