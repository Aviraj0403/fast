"use client";

import { useEffect, useState } from "react";
import {
  FaUniversity,
  FaBuilding,
  FaBookOpen,
  FaClipboardCheck,
  FaPenFancy,
  FaBriefcase,
} from "react-icons/fa";
import { Brain, Sparkles, ArrowRight, Users, Award, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const AdmissionSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridItems = [
    {
      label: "Colleges",
      icon: <FaBuilding className="text-4xl mb-4" />,
      gradient: "from-purple-500 to-indigo-600",
      description: "Top-ranked institutions",
      count: "500+"
    },
    {
      label: "University",
      icon: <FaUniversity className="text-4xl mb-4" />,
      gradient: "from-pink-500 to-rose-600",
      description: "Premier universities",
      count: "200+"
    },
    {
      label: "Courses",
      icon: <FaBookOpen className="text-4xl mb-4" />,
      gradient: "from-green-500 to-emerald-600",
      description: "Diverse programs",
      count: "1000+"
    },
    {
      label: "Admission",
      icon: <FaClipboardCheck className="text-4xl mb-4" />,
      gradient: "from-yellow-500 to-amber-600",
      description: "Success rate",
      count: "95%"
    },
    {
      label: "Exam",
      icon: <FaPenFancy className="text-4xl mb-4" />,
      gradient: "from-red-500 to-pink-600",
      description: "Entrance exams",
      count: "50+"
    },
    {
      label: "Placements",
      icon: <FaBriefcase className="text-4xl mb-4" />,
      gradient: "from-blue-500 to-cyan-600",
      description: "Career opportunities",
      count: "10K+"
    },
  ];

  const stats = [
    { icon: Users, value: "50,000+", label: "Students Guided" },
    { icon: Award, value: "95%", label: "Success Rate" },
    { icon: TrendingUp, value: "9+ Years", label: "Experience" },
  ];

  return (
    <section id="admission" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6"
            data-aos="fade-up"
          >
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Admission Excellence</span>
          </div>
          
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Your Gateway to{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Top Institutions
            </span>
          </h2>
          
          <p 
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-12"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Discover endless possibilities with our comprehensive admission guidance 
            and AI-powered college matching system.
          </p>

          {/* Stats */}
          <div 
            className="grid md:grid-cols-3 gap-8 max-w-2xl mx-auto mb-16"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid Items */}
        <div 
          className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {gridItems.map((item, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-soft hover:shadow-large transition-all duration-500 card-hover overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                <div className={`text-transparent bg-gradient-to-r ${item.gradient} bg-clip-text group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                  {item.label}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 group-hover:text-gray-700 transition-colors">
                  {item.description}
                </p>
                
                <div className={`text-2xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                  {item.count}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          data-aos="fade-up"
          data-aos-delay="500"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Brain className="w-8 h-8 text-cyan-300" />
              <h3 className="text-3xl md:text-4xl font-bold">
                Ready to Start Your Journey?
              </h3>
            </div>
            
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let our AI-powered platform guide you to the perfect college and course 
              that matches your dreams and aspirations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 btn-hover group"
                onClick={() => {
                  const element = document.getElementById("assessment");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Brain className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Start AI Assessment
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-4 rounded-full transition-all duration-300 btn-hover"
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Talk to Expert
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};