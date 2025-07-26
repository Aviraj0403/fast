'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const studyGoals = [
  {
    title: 'Engineering',
    subtitle: 'B.Tech | M.Tech | Diploma | Bachelors+Masters',
    colleges: 37,
    image: '/images/engineering.png',
  },
  {
    title: 'Arts Courses',
    subtitle: 'BA | B.ED | DFD | 3D-Animation | BA+LLB | MA',
    colleges: 43,
    image: '/images/arts.png',
  },
  {
    title: 'Management',
    subtitle: 'BBA | BMS | BBM | BHMCT | BALLB | MHM | EMBA',
    colleges: 0,
    image: '/images/management.png',
  },
  {
    title: 'Commerce Courses',
    subtitle: 'B.Com | LLB | DCA | CA | CS | CFP | M.COM',
    colleges: 0,
    image: '/images/commerce.png',
  },
  {
    title: 'Medical',
    subtitle: 'MBBS | BAMS | BUMS | BDS | MS | MD | PG-YOGA',
    colleges: 0,
    image: '/images/medical.png',
  },
  {
    title: 'Mass Communication',
    subtitle: 'BJMC | BHJMC | DJMC | MJMC | BAFMC | BMMMC',
    colleges: 0,
    image: '/images/masscomm.png',
  },
];

export const StudyGoalSection = () => {
  return (
    <section className="bg-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold">
          Select Your <span className="text-lime-600">Study Goal</span>
        </h2>
        <p className="mt-4 text-gray-700 max-w-3xl mx-auto">
          Reset your research strategy with top admission consultancy in Patna by browsing through our lists of top colleges, exams, courses and careers based on your area of interest!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {studyGoals.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={80}
                height={80}
                className="object-contain"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  <span className="bg-lime-600 text-white text-sm px-2 py-1 rounded">{item.colleges} College</span>
                </div>
                <p className="text-gray-600 mt-2 text-sm">{item.subtitle}</p>

                <div className="flex items-center gap-4 mt-4 flex-wrap">
                  <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded text-sm font-semibold hover:scale-105 transition">
                    APPLY HERE
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200 flex items-center gap-1">
                    👁 COURSES
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded text-sm hover:bg-gray-200 flex items-center gap-1">
                    🔗 Share
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
