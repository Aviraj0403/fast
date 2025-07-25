"use client"

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Building, Users, Clock } from "lucide-react";

// Function to animate counter
const animateCounter = (
  start: number,
  end: number,
  duration: number,
  setValue: (value: number) => void
) => {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    setValue(Math.floor(progress * (end - start) + start));
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};

export const CounterSection = () => {
  const [studentsCount, setStudentsCount] = useState(0);
  const [collegesCount, setCollegesCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);
  const [regionsCount, setRegionsCount] = useState(0);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only animate once
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          animateCounter(0, 1700, 2000, setStudentsCount);
          animateCounter(0, 600, 2000, setCollegesCount);
          animateCounter(0, new Date().getFullYear() - 2015, 2000, setExperienceCount);
          animateCounter(0, 8, 2000, setRegionsCount);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

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
            Since 2015, we've been making a significant difference in the educational journey of students across India.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Users className="h-10 w-10 text-primary" />,
              count: studentsCount,
              label: "Students Guided",
              suffix: "+"
            },
            {
              icon: <Building className="h-10 w-10 text-primary" />,
              count: collegesCount,
              label: "Partner Colleges",
              suffix: "+"
            },
            {
              icon: <Clock className="h-10 w-10 text-primary" />,
              count: experienceCount,
              label: "Years of Experience",
              suffix: "+"
            },
            {
              icon: <GraduationCap className="h-10 w-10 text-primary" />,
              count: regionsCount,
              label: "Regional Success",
              suffix: ""
            }
          ].map((item, index) => (
            <Card 
              key={index} 
              className="border-none shadow-md hover:shadow-lg transition-shadow"
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <CardContent className="p-6 text-center">
                <div className="bg-blue-100 rounded-full p-4 inline-block mb-4">
                  {item.icon}
                </div>
                <h3 className="text-4xl font-bold text-gray-800 mb-2">
                  {item.count}{item.suffix}
                </h3>
                <p className="text-gray-600">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
