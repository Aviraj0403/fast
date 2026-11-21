"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaUserTie, FaUniversity, FaComments } from "react-icons/fa";
import { SectionHeading } from "@/components/SectionHeading";

const features = [
  { title: "Free career counselling", text: "Your first consultation costs nothing.", icon: <FaComments /> },
  { title: "One-on-one advice", text: "A counsellor who knows your profile and goals.", icon: <FaUserTie /> },
  { title: "Expert career guidance", text: "Backed by years of admission experience.", icon: <FaChalkboardTeacher /> },
  { title: "Right-fit colleges", text: "Shortlists based on your marks, budget and city.", icon: <FaUniversity /> },
];

export default function CareerAssessmentSection() {
  return (
    <section className="relative overflow-hidden bg-brand-950 section">
      <Image src="/image/our_career.webp" alt="" fill sizes="100vw" className="object-cover opacity-25" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-brand-950/70 via-brand-950/80 to-brand-950" />

      <div className="container-x relative">
        <SectionHeading
          tone="dark"
          eyebrow="Career assessment"
          title="Know where you fit before you choose"
          description="Admission Expert (FAST) is a pioneer in professional career counselling. Our qualified team advises thousands of students every year so they enter the right course with confidence."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-sm transition-colors hover:bg-white/[0.09]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/20 text-xl text-brand-300">{f.icon}</span>
              <h3 className="mt-5 text-lg font-semibold !text-white">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-300">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
