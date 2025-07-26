'use client';

import Image from 'next/image';
import {
  FaChalkboardTeacher,
  FaUserTie,
  FaUniversity,
  FaComments,
} from 'react-icons/fa';

const features = [
  {
    title: 'FREE Career Counselling',
    icon: <FaComments size={40} className="text-blue-500 mb-2 sm:mb-4" />,
  },
  {
    title: 'One-on-one Advice for Best Results',
    icon: <FaUserTie size={40} className="text-blue-500 mb-2 sm:mb-4" />,
  },
  {
    title: 'Best Career Guidance from the Experts',
    icon: <FaChalkboardTeacher size={40} className="text-blue-500 mb-2 sm:mb-4" />,
  },
  {
    title: 'Only the Best Colleges for you',
    icon: <FaUniversity size={40} className="text-blue-500 mb-2 sm:mb-4" />,
  },
];

export default function CareerAssessmentSection() {
  return (
    <section className="relative text-white py-16 sm:py-20 px-4 overflow-hidden min-h-[600px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/image/our_career.webp"
          alt="Career Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto z-10 text-center">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
          Our Career Assessment is an Industry Benchmark
        </h2>
        <p className="text-lg sm:text-xl text-blue-200 mb-4 sm:mb-6">
          Our groundwork takes you sky high
        </p>
        <p className="text-sm sm:text-base max-w-3xl mx-auto text-gray-100 leading-relaxed mb-12 sm:mb-16">
          Admission Expert (FAST) is one of the pioneers in online career counselling.
          Our expert team of counsellors are highly qualified, experienced and
          well-versed in giving sound advice to aspiring students. They impart
          career counselling to thousands of students every year with impeccable
          results.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-xl shadow-md p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-transform hover:scale-105 duration-300"
            >
              {feature.icon}
              <p className="text-sm sm:text-md font-semibold">{feature.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
