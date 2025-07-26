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
    icon: <FaComments size={50} className="text-blue-500 mb-4" />,
  },
  {
    title: 'One-on-one Advice for Best Results',
    icon: <FaUserTie size={50} className="text-blue-500 mb-4" />,
  },
  {
    title: 'Best Career Guidance from the Experts',
    icon: <FaChalkboardTeacher size={50} className="text-blue-500 mb-4" />,
  },
  {
    title: 'Only the Best Colleges for you',
    icon: <FaUniversity size={50} className="text-blue-500 mb-4" />,
  },
];

export default function CareerAssessmentSection() {
  return (
    <section className="relative bg-[#001e5f] text-white py-20 px-4 overflow-hidden min-h-[600px]">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
      <Image
  src="/image/our_career.png"
  alt="Career Background"
  layout="fill" // same as `fill` but more stable in older versions
  className="object-cover opacity-10"
  style={{ zIndex: 0 }}
  priority
/>

      </div>

      <div className="relative max-w-7xl mx-auto z-10 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Our Career Assessment is an Industry Benchmark
        </h2>
        <p className="text-xl text-[#aad3ff] mb-6">
          Our groundwork takes you sky high
        </p>
        <p className="text-sm sm:text-base max-w-3xl mx-auto text-gray-200 leading-relaxed mb-16">
          AdmissionLelo is one of the pioneers in online career counselling.
          Our expert team of counsellors are highly qualified, experienced and
          well-versed in giving sound advice to aspiring students. They impart
          career counselling to thousands of students every year with impeccable
          results.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-lg shadow-lg p-8 flex flex-col items-center justify-center text-center transition hover:scale-105 duration-300"
            >
              {feature.icon}
              <p className="text-md font-medium">{feature.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
