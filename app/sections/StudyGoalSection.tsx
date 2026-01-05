"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Users, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Target,
  TrendingUp,
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";

const studyGoals = [
  {
    title: "Engineering",
    subtitle: "B.Tech | M.Tech | Diploma | Bachelors+Masters",
    colleges: 147,
    image: "/image/engineer.webp",
    gradient: "from-blue-500 to-cyan-600",
    description: "Build the future with cutting-edge technology",
    growth: "+15%"
  },
  {
    title: "Arts Courses",
    subtitle: "BA | B.ED | DFD | 3D-Animation | BA+LLB | MA",
    colleges: 92,
    image: "/image/Art.webp",
    gradient: "from-purple-500 to-pink-600",
    description: "Express creativity and cultural understanding",
    growth: "+12%"
  },
  {
    title: "Management",
    subtitle: "BBA | BMS | BBM | BHMCT | BALLB | MHM | EMBA",
    colleges: 118,
    image: "/image/mangement.webp",
    gradient: "from-green-500 to-emerald-600",
    description: "Lead organizations and drive business success",
    growth: "+18%"
  },
  {
    title: "Commerce Courses",
    subtitle: "B.Com | LLB | DCA | CA | CS | CFP | M.COM",
    colleges: 228,
    image: "/image/commerce.webp",
    gradient: "from-orange-500 to-red-600",
    description: "Master finance and business fundamentals",
    growth: "+10%"
  },
  {
    title: "Medical",
    subtitle: "MBBS | BAMS | BUMS | BDS | MS | MD | PG-YOGA",
    colleges: 194,
    image: "/image/medical.webp",
    gradient: "from-red-500 to-pink-600",
    description: "Heal lives and advance healthcare",
    growth: "+22%"
  },
  {
    title: "Mass Communication",
    subtitle: "BJMC | BHJMC | DJMC | MJMC | BAFMC | BMMMC",
    colleges: 67,
    image: "/image/masscomm.webp",
    gradient: "from-indigo-500 to-purple-600",
    description: "Shape public opinion and media landscape",
    growth: "+14%"
  },
];

export const StudyGoalSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full px-6 py-2 mb-6"
            data-aos="fade-up"
          >
            <Target className="w-5 h-5 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Study Goals</span>
          </div>
          
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Choose Your{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Career Path
            </span>
          </h2>
          
          <p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Discover your perfect study destination with our AI-powered recommendations 
            and comprehensive college database across multiple disciplines.
          </p>
        </div>

        {/* Study Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {studyGoals.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-3xl p-8 shadow-soft hover:shadow-large transition-all duration-500 card-hover overflow-hidden relative"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                {/* Image */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-medium group-hover:shadow-large transition-shadow duration-300">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={128}
                      height={128}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  
                  {/* Growth Badge */}
                  <div className={`absolute -top-2 -right-2 bg-gradient-to-r ${item.gradient} text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg`}>
                    <TrendingUp className="w-3 h-3 inline mr-1" />
                    {item.growth}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                      <GraduationCap className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-semibold text-gray-700">
                        {item.colleges} Colleges
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3 text-sm leading-relaxed">
                    {item.subtitle}
                  </p>
                  
                  <p className="text-gray-700 mb-6 font-medium">
                    {item.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      size="sm"
                      className={`bg-gradient-to-r ${item.gradient} hover:shadow-lg transition-all duration-300 text-white font-semibold rounded-full group/btn`}
                    >
                      <BookOpen className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      Explore Courses
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      View Colleges
                    </Button>
                  </div>
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-6 h-6 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          data-aos="fade-up"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              <h3 className="text-3xl md:text-4xl font-bold">
                Still Confused About Your Path?
              </h3>
            </div>
            
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Let our AI career counselor analyze your interests, skills, and goals 
              to recommend the perfect study path for your future success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 btn-hover group"
                onClick={() => {
                  const element = document.getElementById("assessment");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Award className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Take Career Assessment
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
                Get Expert Advice
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
