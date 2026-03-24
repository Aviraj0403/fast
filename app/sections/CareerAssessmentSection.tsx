'use client';

import Image from 'next/image';
import {
  FaChalkboardTeacher,
  FaUserTie,
  FaUniversity,
  FaComments,
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'FREE Career Counselling',
    icon: <FaComments />,
    color: 'text-blue-500 bg-blue-50',
  },
  {
    title: 'One-on-one Advice for Best Results',
    icon: <FaUserTie />,
    color: 'text-indigo-500 bg-indigo-50',
  },
  {
    title: 'Best Career Guidance from the Experts',
    icon: <FaChalkboardTeacher />,
    color: 'text-emerald-500 bg-emerald-50',
  },
  {
    title: 'Only the Best Colleges for you',
    icon: <FaUniversity />,
    color: 'text-amber-500 bg-amber-50',
  },
];

export default function CareerAssessmentSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden min-h-[700px] flex items-center">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image/our_career.webp"
          alt="Career Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0f172a]/80 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Industry Benchmark
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
            Elevate Your Future with Our <br/> <span className="text-gradient">Career Assessment</span>
          </h2>
          <p className="text-xl text-slate-400 mb-8 font-medium italic">
            &quot;Our groundwork takes you sky high&quot;
          </p>
          <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed mb-16 text-lg">
            Admission Expert (FAST) is a pioneer in professional career counselling. 
            Our highly qualified team provides sound advice to thousands of students every year, 
            ensuring impeccable results and successful academic journeys.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass p-10 rounded-[40px] flex flex-col items-center justify-center text-center group hover:bg-white transition-all duration-500"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 ${feature.color}`}>
                {feature.icon}
              </div>
              <p className="text-[#0f172a] font-black text-lg leading-tight group-hover:text-blue-600 transition-colors">
                {feature.title}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
