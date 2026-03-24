"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight, Star, Users, GraduationCap, ShieldCheck } from "lucide-react";

export const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const contactOnWhatsApp = () => {
    window.open("https://wa.me/918581841853?text=I%20want%20to%20start%20my%20journey%20with%20FastAdmission%20-%20Apply%202026", "_blank");
  };

  if (!mounted) return null;

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center pt-24 pb-8 overflow-hidden bg-[#0f172a]"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0f172a] bg-blue-500 flex items-center justify-center overflow-hidden">
                    <Users className="w-3 h-3 text-white" />
                  </div>
                ))}
              </div>
              <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em] ml-2">
                Trusted by 50,000+ Students
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[1] tracking-tighter mb-8"
            >
              Elite Career <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                Consultancy.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed mb-10"
            >
              Architect your academic future with <strong>Rajnish Singh</strong> and Team. Secure premier seats in Tier-1 Engineering, Medical, and Management institutions in 2026.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
            >
              <button
                onClick={contactOnWhatsApp}
                className="px-10 py-5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-[24px] font-black text-lg transition-all shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3 group hover:scale-105 active:scale-95"
              >
                Apply for 2026 Batch
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white rounded-[24px] font-black text-lg transition-all border border-white/10 backdrop-blur-md flex items-center justify-center gap-2 group">
                View Expert Team
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto lg:mx-0 border-t border-white/5 pt-10"
            >
              {[
                { label: "Success Rate", val: "99%", icon: <Star className="w-4 h-4 text-amber-400" /> },
                { label: "Top Colleges", val: "250+", icon: <GraduationCap className="w-4 h-4 text-blue-400" /> },
                { label: "Expert Choice", val: "Verified", icon: <ShieldCheck className="w-4 h-4 text-emerald-400" /> },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest">
                    {stat.icon} {stat.label}
                  </div>
                  <div className="text-white text-2xl font-black tracking-tight">{stat.val}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-[550px] mx-auto">
              <div className="absolute inset-0 bg-blue-500/20 rounded-[60px] rotate-6 border border-white/10"></div>
              <div className="absolute inset-0 bg-indigo-500/20 rounded-[60px] -rotate-3 border border-white/10"></div>
              <div className="relative rounded-[60px] overflow-hidden w-full h-full border border-white/20 shadow-2xl group">
                <Image
                  src="/image/contact.jpeg"
                  alt="Rajnish Singh - Best Admission Counselor in Bihar"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                  unoptimized
                />
                <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent">
                    <p className="text-white text-2xl font-black tracking-tight">Rajnish Singh</p>
                    <p className="text-blue-400 text-xs font-black uppercase tracking-[0.3em]">Chief Admission Advisor</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
