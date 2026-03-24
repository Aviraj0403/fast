"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const studyGoals = [
  {
    title: "Engineering",
    subtitle: "B.Tech | M.Tech | Diploma | Bachelors+Masters",
    colleges: 147,
    image: "/image/engineer.webp",
  },
  {
    title: "Arts Courses",
    subtitle: "BA | B.ED | DFD | 3D-Animation | BA+LLB | MA",
    colleges: 92,
    image: "/image/Art.webp",
  },
  {
    title: "Management",
    subtitle: "BBA | BMS | BBM | BHMCT | BALLB | MHM | EMBA",
    colleges: 118,
    image: "/image/mangement.webp",
  },
  {
    title: "Commerce Courses",
    subtitle: "B.Com | LLB | DCA | CA | CS | CFP | M.COM",
    colleges: 228,
    image: "/image/commerce.webp",
  },
  {
    title: "Medical",
    subtitle: "MBBS | BAMS | BUMS | BDS | MS | MD | PG-YOGA",
    colleges: 194,
    image: "/image/medical.webp",
  },
  {
    title: "Mass Communication",
    subtitle: "BJMC | BHJMC | DJMC | MJMC | BAFMC | BMMMC",
    colleges: 67,
    image: "/image/masscomm.webp",
  },
];

export const StudyGoalSection = () => {
  const handleApply = (title: string) => {
    window.open(`https://wa.me/918581841853?text=I%20want%20to%20apply%20for%20${encodeURIComponent(title)}%20courses%20-%20FastAdmission`, "_blank");
  };

  return (
    <section className="bg-slate-50 py-20 px-6" id="about">
      <div className="max-w-7xl mx-auto text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#2563eb] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
          Choose Your Path
        </span>
        <h3 className="text-4xl md:text-6xl font-black text-[#0f172a] mb-8 tracking-tighter">
          Select Your <span className="text-[#2563eb]">Academic Goal</span>
        </h3>
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed italic">
          Comprehensive guidance for top colleges, exams, and career paths across India. Find your perfect fit today.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
          {studyGoals.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row items-center md:items-start gap-10 text-center md:text-left group transform hover:-translate-y-2"
            >
              <div className="relative w-36 h-36 shrink-0 group-hover:scale-110 transition-transform duration-700">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={144}
                  height={144}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <div className="flex-1 flex flex-col justify-between h-full py-2">
                <div>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                    <h3 className="text-2xl font-black text-[#0f172a]">
                      {item.title}
                    </h3>
                    <span className="bg-blue-50 text-[#2563eb] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-blue-100 shadow-sm">
                      {item.colleges}+ Institutions
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed mb-10 tracking-tight">{item.subtitle}</p>
                </div>

                <div className="flex items-center justify-center md:justify-start gap-6 mt-auto">
                  <button 
                    onClick={() => handleApply(item.title)}
                    className="bg-[#2563eb] text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-[#1d4ed8] transition-all flex items-center gap-2 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-95"
                  >
                    CONNECT US <ChevronRight className="w-4 h-4" />
                  </button>
                  <button className="text-[#0f172a] font-black text-xs uppercase tracking-widest hover:text-[#2563eb] transition-all pb-1 border-b-2 border-transparent hover:border-[#2563eb]">
                    VIEW DETAILS
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
