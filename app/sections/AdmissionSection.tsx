"use client";

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
    <section id="admission" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50 -z-20"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-[100px] -z-10 animate-pulse delay-1000"></div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full px-6 py-2 mb-8 shadow-sm hover:shadow-md transition-all duration-300"
            data-aos="fade-down"
          >
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent transform uppercase tracking-wider">Admission Excellence</span>
          </div>

          <h2
            className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight"
            data-aos="fade-up"
          >
            Your Gateway to <br />
            <span className="text-gradient">Top Institutions</span>
          </h2>

          <p
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Unlock elite education opportunities with AI-driven insights.
            From customized college matching to seamless admission processes,
            we engineer your success.
          </p>

          {/* Stats Bar */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-20"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl flex items-center justify-center gap-4 card-hoverable">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg text-white">
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className="text-left">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid Items */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {gridItems.map((item, index) => (
            <div
              key={index}
              className="group relative glass-card p-8 rounded-3xl overflow-hidden card-hoverable h-full border-t border-white/60"
            >
              <div className={`absolute -right-10 -top-10 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>

              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.gradient} flex items-center justify-center text-white text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all">
                  {item.label}
                </h3>

                <p className="text-gray-600 mb-4 font-medium">
                  {item.description}
                </p>

                <div className="flex items-end justify-between">
                  <span className={`text-3xl font-extrabold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                    {item.count}
                  </span>
                  <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-blue-600 -translate-x-4 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className="relative rounded-[2.5rem] p-10 md:p-16 text-center text-white overflow-hidden shadow-2xl"
          data-aos="zoom-in"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700"></div>

          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-8 border border-white/20">
              <Brain className="w-5 h-5 text-cyan-300 animate-pulse" />
              <span className="text-sm font-medium text-cyan-100">AI-Powered Guidance</span>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to Design Your Future?
            </h3>

            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Leverage our advanced algorithms to match your profile with
              institutions where you will thrive.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Button
                size="lg"
                className="bg-white text-blue-700 hover:bg-blue-50 font-bold px-10 py-7 rounded-full text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                onClick={() => {
                  const element = document.getElementById("assessment");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="mr-2">Start Free Assessment</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-bold px-10 py-7 rounded-full text-lg backdrop-blur-sm transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Chat with Counselor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
