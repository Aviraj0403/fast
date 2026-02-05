"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles, Brain, Target, Users, Award, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";

export const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const dynamicTexts = [
    "AI-Powered Career Guidance",
    "Smart College Matching",
    "Personalized Study Plans",
    "Intelligent Course Selection"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentText((prev) => (prev + 1) % dynamicTexts.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [dynamicTexts.length]);

  const scrollToEnquiry = () => {
    const element = document.getElementById("enquiry");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAssessment = () => {
    const element = document.getElementById("assessment");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const trustMetrics = [
    { icon: Users, value: "10,000+", label: "Students Guided" },
    { icon: Award, value: "95%", label: "Success Rate" },
    { icon: TrendingUp, value: "500+", label: "Top Colleges" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Floating Particles - Client Side Only */}
        <ClientParticles />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* AI Badge */}
            <div
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">Powered by Artificial Intelligence</span>
            </div>

            {/* Main Heading */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Transform Your Future with{" "}
              <span className="relative">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  AI-Powered
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"></div>
              </span>{" "}
              Career Counseling
            </h1>

            {/* Dynamic Subtitle */}
            <div className="h-16 mb-8">
              <p
                className={`text-xl md:text-2xl text-blue-100 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                Experience the future of education with{" "}
                <span className="font-semibold text-cyan-300">
                  {dynamicTexts[currentText]}
                </span>
              </p>
            </div>

            {/* Description */}
            <p
              className="text-lg text-blue-100/80 mb-8 max-w-2xl mx-auto lg:mx-0"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Get personalized career guidance, smart college recommendations, and AI-driven insights
              to make the best educational decisions for your future success.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              <Button
                onClick={scrollToAssessment}
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 btn-hover group"
              >
                <Brain className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Start AI Assessment
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                onClick={scrollToEnquiry}
                variant="outline"
                size="lg"
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold px-8 py-4 rounded-full transition-all duration-300 btn-hover group"
              >
                <Target className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Get Expert Guidance
              </Button>
            </div>

            {/* Trust Metrics */}
            <div
              className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              {trustMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <metric.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-blue-200">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - AI Visualization */}
          <div
            className="relative"
            data-aos="fade-left"
            data-aos-delay="700"
          >
            <div className="relative w-full max-w-lg mx-auto">
              {/* Central AI Brain */}
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full animate-pulse delay-500"></div>
                <div className="absolute inset-8 bg-gradient-to-r from-cyan-300/40 to-blue-300/40 rounded-full animate-pulse delay-1000"></div>

                {/* Central Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                </div>

                {/* Orbiting Elements */}
                {[
                  { icon: Target, angle: 0, delay: 0 },
                  { icon: Users, angle: 72, delay: 200 },
                  { icon: Award, angle: 144, delay: 400 },
                  { icon: TrendingUp, angle: 216, delay: 600 },
                  { icon: Sparkles, angle: 288, delay: 800 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="absolute w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center animate-bounce"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: `translate(-50%, -50%) rotate(${item.angle}deg) translateY(-120px) rotate(-${item.angle}deg)`,
                      animationDelay: `${item.delay}ms`,
                    }}
                  >
                    <item.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                ))}
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 animate-fadeInLeft">
                <div className="text-sm font-medium text-white">Smart Matching</div>
                <div className="text-xs text-blue-200">AI Algorithm</div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-3 animate-fadeInRight">
                <div className="text-sm font-medium text-white">Success Rate</div>
                <div className="text-xs text-blue-200">95% Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

function ClientParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        ></div>
      ))}
    </div>
  );
}