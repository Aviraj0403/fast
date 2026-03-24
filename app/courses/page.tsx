import Link from "next/link";
import Image from "next/image";
import { courses } from "@/app/data/courses";
import { Search } from "lucide-react";

export default function CoursesPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50">
      <div className="container mx-auto px-6 max-w-7xl">
        <header className="mb-20 text-center">
           <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#2563eb] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            Academic Pathways
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tighter mb-6">
            Our <span className="text-[#2563eb]">Professional Programs</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Architect your future with India&apos;s most sought-after degree specializations. We provides end-to-end guidance for premier institution placements.
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-10">
          {courses.map((course) => (
            <div 
              key={course.slug}
              className="group flex flex-col md:flex-row bg-white rounded-[48px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500"
            >
              <div className="md:w-5/12 relative h-72 md:h-auto overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />
              </div>
              <div className="md:w-7/12 p-10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-[#2563eb] uppercase tracking-[0.2em] mb-2 block bg-blue-50 w-fit px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                  <h2 className="text-2xl font-black text-[#0f172a] mb-4 group-hover:text-[#2563eb] transition-colors">
                    {course.title}
                  </h2>
                  <p className="text-slate-500 text-sm mb-6 leading-relaxed font-medium line-clamp-3">
                    {course.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    <div className="bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-100">
                      {course.duration}
                    </div>
                    <div className="bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest border border-slate-100">
                      Eligibility: {course.eligibility}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Link 
                    href={`/courses/${course.slug}`}
                    className="flex-1 text-center bg-slate-50 text-[#0f172a] px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#0f172a] hover:text-white transition-all shadow-sm"
                  >
                    View Details
                  </Link>
                  <a 
                    href={`https://wa.me/918581841853?text=I%20want%20to%20apply%20for%20${encodeURIComponent(course.title)}%20-%20FastAdmission`}
                    target="_blank"
                    className="flex-1 text-center bg-[#2563eb] text-white px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-[#1d4ed8] hover:scale-[1.05] transition-all"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
