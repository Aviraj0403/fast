"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { waLink } from "@/lib/site";

const studyGoals = [
  { title: "Engineering", subtitle: "B.Tech, M.Tech, Diploma, Integrated Bachelors + Masters", colleges: 147, image: "/image/engineer.webp" },
  { title: "Arts", subtitle: "BA, B.Ed, DFD, 3D Animation, BA + LLB, MA", colleges: 92, image: "/image/Art.webp" },
  { title: "Management", subtitle: "BBA, BMS, BBM, BHMCT, BA LLB, MHM, EMBA", colleges: 118, image: "/image/mangement.webp" },
  { title: "Commerce", subtitle: "B.Com, LLB, DCA, CA, CS, CFP, M.Com", colleges: 228, image: "/image/commerce.webp" },
  { title: "Medical", subtitle: "MBBS, BAMS, BUMS, BDS, MS, MD, PG Yoga", colleges: 194, image: "/image/medical.webp" },
  { title: "Mass Communication", subtitle: "BJMC, BHJMC, DJMC, MJMC, BAFMC, BMMMC", colleges: 67, image: "/image/masscomm.webp" },
];

export const StudyGoalSection = () => (
  <section className="section bg-canvas" id="about">
    <div className="container-x">
      <SectionHeading eyebrow="Choose your path" title="Pick your academic goal" description="Guidance for top colleges, entrance exams and career paths across India. Find the stream that fits you." />

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:gap-6">
        {studyGoals.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 2) * 0.08 }}
            className="card card-hover flex flex-col gap-5 p-6 sm:flex-row sm:items-center"
          >
            <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-brand-50 p-3">
              <Image src={item.image} alt="" width={96} height={96} className="h-full w-full object-contain" unoptimized />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="text-xl font-bold">{item.title}</h3>
                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700">{item.colleges}+ institutions</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.subtitle}</p>
              <a
                href={waLink(`I want to apply for ${item.title} courses - FastAdmission`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                Get free guidance <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
