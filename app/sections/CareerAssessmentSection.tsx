'use client';

import Image from 'next/image';
import {
  FaChalkboardTeacher,
  FaUserTie,
  FaUniversity,
  FaComments,
} from 'react-icons/fa';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    title: 'FREE Career Counselling',
    icon: <FaComments className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" />,
    gradient: "from-blue-400 to-blue-600"
  },
  {
    title: 'One-on-one Advice for Best Results',
    icon: <FaUserTie className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" />,
    gradient: "from-purple-400 to-purple-600"
  },
  {
    title: 'Best Career Guidance from the Experts',
    icon: <FaChalkboardTeacher className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" />,
    gradient: "from-pink-400 to-pink-600"
  },
  {
    title: 'Only the Best Colleges for you',
    icon: <FaUniversity className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300" />,
    gradient: "from-cyan-400 to-cyan-600"
  },
];

export default function CareerAssessmentSection() {
  return (
    <section className="relative py-12 md:py-24 px-4 overflow-hidden bg-black text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image/our_career.webp"
          alt="Career Background"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-blue-950/90 mix-blend-multiply"></div>
      </div>

      {/* Decorative Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse delay-1000"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto z-10">
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md mb-8">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold text-blue-200 tracking-wide uppercase">Industry Benchmark</span>
          </div>

          <h2 className="text-3xl md:text-6xl font-bold mb-6 leading-tight">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Career Trajectory</span>
          </h2>

          <p className="text-xl md:text-2xl text-blue-200/80 mb-8 font-light">
            "Our groundwork takes you sky high"
          </p>

          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-12">
            Admission Expert (FAST) pioneers online career counselling using advanced analytics
            and human expertise. Our counselors don't just give advice; they architect your future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              <div className={`text-transparent bg-clip-text bg-gradient-to-br ${feature.gradient}`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 leading-snug">
                {feature.title}
              </h3>
              <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${feature.gradient} mt-4 group-hover:w-full transition-all duration-500`}></div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-12 py-8 rounded-full text-xl shadow-[0_0_40px_rgba(37,99,235,0.5)] hover:shadow-[0_0_60px_rgba(37,99,235,0.7)] transition-all duration-300 group"
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Schedule Free Consultation
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
