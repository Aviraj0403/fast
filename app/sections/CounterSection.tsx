"use client";

import { useEffect, useState, useRef } from "react";
import { GraduationCap, Building, Users, Clock } from "lucide-react";

// Counter animation helper
const animateCounter = (
  start: number,
  end: number,
  duration: number,
  setValue: (val: number) => void
) => {
  let startTime: number | null = null;

  const step = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    setValue(Math.floor(progress * (end - start) + start));
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

export const CounterSection = () => {
  const [students, setStudents] = useState(0);
  const [colleges, setColleges] = useState(0);
  const [experience, setExperience] = useState(0);
  const [regions, setRegions] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          animateCounter(0, 1700, 2000, setStudents);
          animateCounter(0, 600, 2000, setColleges);
          animateCounter(0, new Date().getFullYear() - 2015, 2000, setExperience);
          animateCounter(0, 8, 2000, setRegions);
        }
      },
      { threshold: 0.2 }
    );

    const target = sectionRef.current;
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, []);

  const stats = [
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      count: students,
      label: "Students Guided",
      suffix: "+",
    },
    {
      icon: <Building className="h-10 w-10 text-primary" />,
      count: colleges,
      label: "Partner Colleges",
      suffix: "+",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      count: experience,
      label: "Years of Experience",
      suffix: "+",
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      count: regions,
      label: "Regional Success",
      suffix: "",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-blue-50"
      data-aos="fade-up"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Since 2015, we&apos;ve been making a significant difference in the educational journey of students across India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 text-center"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                {item.icon}
              </div>
              <h3 className="text-4xl font-bold text-gray-800 mb-2">
                {item.count}
                {item.suffix}
              </h3>
              <p className="text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
