"use client";

import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, GraduationCap, Star } from "lucide-react";
import { waLink } from "@/lib/site";
import { LeadForm } from "@/components/LeadForm";

const stats = [
  { label: "Success rate", value: "99%", icon: Star },
  { label: "Partner colleges", value: "250+", icon: GraduationCap },
  { label: "Guiding since", value: "2015", icon: BadgeCheck },
];

const fade = (delay = 0) => ({ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay } });

export const Hero = ({ title, subtitle, cta }: { title?: string; subtitle?: string; cta?: string } = {}) => (
  <section id="home" className="relative overflow-hidden bg-brand-950 pt-[calc(var(--header-h)+3rem)] pb-16 md:pb-24">
    {/* soft brand glow + fine grid: depth without noise */}
    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_85%_0%,rgb(10_150_208/0.28),transparent_60%),radial-gradient(50%_60%_at_0%_100%,rgb(10_122_176/0.18),transparent_60%)]" />
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:56px_56px]" />

    <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
      <div className="text-center lg:text-left">
        <motion.p {...fade()} className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-sm text-slate-200 lg:mx-0">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Trusted by 50,000+ students and parents
        </motion.p>

        <motion.h1 {...fade(0.08)} className="mt-6 text-balance text-[2.5rem] font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.5rem]">
          {title ? title : (<>
          Choose the right college.
          <br />
          <span className="text-brand-300">Secure the seat.</span>
          </>)}
        </motion.h1>

        <motion.p {...fade(0.16)} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-300 lg:mx-0">
          {subtitle ? subtitle : (<>Career counselling and admission guidance from <strong className="font-semibold text-white">Rajnish Singh</strong> and team, for top Engineering, Medical and Management institutions in 2026.</>)}
        </motion.p>

        <motion.div {...fade(0.24)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <a href="#hero-form" className="btn btn-primary btn-lg">
            {cta || "Get a free call back"} <ArrowRight className="h-5 w-5" />
          </a>
          <a href={waLink("I want to start my journey with FastAdmission - Apply 2026")} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light btn-lg">
            Chat on WhatsApp
          </a>
        </motion.div>

        <motion.dl {...fade(0.32)} className="mx-auto mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8 lg:mx-0">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label}>
              <dt className="flex items-center justify-center gap-1.5 text-xs text-slate-400 lg:justify-start">
                <Icon className="h-3.5 w-3.5 text-brand-300" /> {label}
              </dt>
              <dd className="mt-1 text-center font-display text-xl font-bold text-white lg:text-left">{value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div id="hero-form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="relative mx-auto w-full max-w-md scroll-mt-24 lg:max-w-none">
        <LeadForm form="hero" dark title="Get a free call back" subtitle="Tell us what you want to study. A counsellor will call you with a college shortlist, fees and cutoffs." />
      </motion.div>
    </div>
  </section>
);
