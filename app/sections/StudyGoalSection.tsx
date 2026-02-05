"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Users,
  ArrowRight,
  Sparkles,
  BookOpen,
  Target,
  TrendingUp,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";

const studyGoals = [
  {
    title: "Engineering",
    subtitle: "B.Tech | M.Tech | Diploma | Bachelors+Masters",
    colleges: 147,
    image: "/image/engineer.webp",
    gradient: "from-blue-500 to-cyan-600",
    description: "Build the future with cutting-edge technology",
    growth: "+15%"
  },
  {
    title: "Arts Courses",
    subtitle: "BA | B.ED | DFD | 3D-Animation | BA+LLB",
    colleges: 92,
    image: "/image/Art.webp",
    gradient: "from-purple-500 to-pink-600",
    description: "Express creativity and cultural understanding",
    growth: "+12%"
  },
  {
    title: "Management",
    subtitle: "BBA | BMS | BBM | BHMCT | BALLB | MHM",
    colleges: 118,
    image: "/image/mangement.webp",
    gradient: "from-green-500 to-emerald-600",
    description: "Lead organizations and drive business success",
    growth: "+18%"
  },
  {
    title: "Commerce Courses",
    subtitle: "B.Com | LLB | DCA | CA | CS | CFP | M.COM",
    colleges: 228,
    image: "/image/commerce.webp",
    gradient: "from-orange-500 to-red-600",
    description: "Master finance and business fundamentals",
    growth: "+10%"
  },
  {
    title: "Medical",
    subtitle: "MBBS | BAMS | BUMS | BDS | MS | MD",
    colleges: 194,
    image: "/image/medical.webp",
    gradient: "from-red-500 to-pink-600",
    description: "Heal lives and advance healthcare",
    growth: "+22%"
  },
  {
    title: "Mass Communication",
    subtitle: "BJMC | BHJMC | DJMC | MJMC | BAFMC",
    colleges: 67,
    image: "/image/masscomm.webp",
    gradient: "from-indigo-500 to-purple-600",
    description: "Shape public opinion and media landscape",
    growth: "+14%"
  },
];

export const StudyGoalSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-slate-50">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200/30 rounded-full blur-[100px] -z-10 mix-blend-multiply animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-[100px] -z-10 mix-blend-multiply animate-pulse delay-700"></div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 bg-white border border-green-100 rounded-full px-6 py-2 mb-8 shadow-sm"
            data-aos="fade-down"
          >
            <Target className="w-5 h-5 text-green-600" />
            <span className="text-sm font-bold text-green-700 tracking-wide uppercase">Your Path to Success</span>
          </div>

          <h2
            className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Career Path</span>
          </h2>

          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Explore top-tier programs and colleges curated to match your ambitions.
            From Engineering to Arts, find your perfect fit.
          </p>
        </div>

        {/* Study Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {studyGoals.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-[2rem] p-4 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
            >
              <div className="relative h-64 rounded-[1.5rem] overflow-hidden mb-6">
                <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-20 mix-blend-overlay z-10`} />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10`} />
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  unoptimized
                />

                {/* Overlaid Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-white/20 backdrop-blur-md border border-white/30`}>
                      {item.growth} Growth
                    </span>
                    <div className="flex items-center gap-1 text-white/90 text-sm font-medium">
                      <GraduationCap className="w-4 h-4" />
                      {item.colleges} Colleges
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Body Content */}
              <div className="px-4 pb-4">
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm h-10">
                  {item.subtitle}
                </p>
                <p className="text-gray-800 font-medium mb-6">
                  {item.description}
                </p>

                <div className="flex items-center gap-3">
                  <Button className={`flex-1 bg-gradient-to-r ${item.gradient} text-white border-0 rounded-xl hover:opacity-90 transition-opacity`}>
                    Explore
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="rounded-xl border-gray-200 hover:bg-gray-50 aspect-square p-0 w-10 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-gray-600" />
                  </Button>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className="relative bg-[#0f172a] rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden"
          data-aos="fade-up"
        >
          {/* Neon Glow Effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/20 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl mb-8 backdrop-blur-sm border border-white/10 ring-1 ring-white/20">
              <Sparkles className="w-8 h-8 text-green-400" />
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Still Confused About Your Path?
            </h3>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-light">
              Let our AI career counselor analyze your interests, skills, and goals
              to recommend the perfect study path for your future success.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-400 text-black font-bold px-10 py-7 rounded-2xl text-lg shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById("assessment");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Award className="w-5 h-5 mr-3" />
                Take Career Assessment
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-white/20 text-white hover:bg-white/5 font-bold px-10 py-7 rounded-2xl text-lg backdrop-blur-md"
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Get Expert Advice
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
