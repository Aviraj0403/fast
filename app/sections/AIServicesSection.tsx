"use client";

import { useState } from "react";
import { 
  Brain, 
  Target, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const AIServicesSection = () => {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      icon: Brain,
      title: "AI Career Counseling",
      description: "Personalized career guidance powered by advanced AI algorithms",
      features: [
        "Personality & aptitude analysis",
        "Career path recommendations", 
        "Skills gap identification",
        "Industry trend insights"
      ],
      color: "from-purple-500 to-indigo-600",
      bgColor: "from-purple-50 to-indigo-50"
    },
    {
      icon: Target,
      title: "Smart College Matching",
      description: "AI-powered college selection based on your profile and preferences",
      features: [
        "Personalized college recommendations",
        "Admission probability analysis",
        "Scholarship opportunity alerts",
        "Campus culture matching"
      ],
      color: "from-blue-500 to-cyan-600",
      bgColor: "from-blue-50 to-cyan-50"
    },
    {
      icon: BookOpen,
      title: "Intelligent Course Planning",
      description: "AI-curated academic pathways for optimal career preparation",
      features: [
        "Custom curriculum design",
        "Skill-based course selection",
        "Learning path optimization",
        "Progress tracking & analytics"
      ],
      color: "from-green-500 to-emerald-600",
      bgColor: "from-green-50 to-emerald-50"
    },
    {
      icon: TrendingUp,
      title: "Future Skills Prediction",
      description: "Stay ahead with AI insights on emerging skills and careers",
      features: [
        "Industry trend analysis",
        "Future job market predictions",
        "Skill demand forecasting",
        "Career pivot recommendations"
      ],
      color: "from-orange-500 to-red-600",
      bgColor: "from-orange-50 to-red-50"
    }
  ];

  const aiAdvantages = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get instant recommendations in seconds, not weeks"
    },
    {
      icon: Shield,
      title: "Data-Driven Accuracy",
      description: "95% accuracy rate based on thousands of success stories"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "AI counselor available anytime, anywhere"
    },
    {
      icon: Users,
      title: "Personalized Experience",
      description: "Tailored guidance based on your unique profile"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full px-6 py-2 mb-6"
            data-aos="fade-up"
          >
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">AI-Powered Services</span>
          </div>
          
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Revolutionary{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Services
            </span>
          </h2>
          
          <p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Experience the future of career counseling with our cutting-edge AI technology 
            that provides personalized, accurate, and instant guidance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br ${service.bgColor} rounded-3xl p-8 cursor-pointer transition-all duration-300 ${
                activeService === index ? 'ring-2 ring-blue-500 shadow-large' : 'hover:shadow-medium'
              }`}
              onClick={() => setActiveService(index)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Service Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>

              {/* Service Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>

              {/* Features List */}
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Active Indicator */}
              {activeService === index && (
                <div className="absolute top-4 right-4">
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AI Advantages */}
        <div 
          className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
          data-aos="fade-up"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose AI-Powered Counseling?
              </h3>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Experience the advantages of artificial intelligence in career guidance
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {aiAdvantages.map((advantage, index) => (
                <div 
                  key={index}
                  className="text-center group"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <advantage.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h4 className="text-xl font-semibold mb-3">{advantage.title}</h4>
                  <p className="text-blue-100">{advantage.description}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 btn-hover group"
                onClick={() => {
                  const element = document.getElementById("assessment");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Brain className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Experience AI Counseling
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>

        {/* Service Process */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              How Our AI Works
            </h3>
            <p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Simple 4-step process to get personalized career guidance
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Data Collection",
                description: "Complete our comprehensive assessment questionnaire",
                icon: BookOpen
              },
              {
                step: "02", 
                title: "AI Analysis",
                description: "Our AI analyzes your responses using advanced algorithms",
                icon: Brain
              },
              {
                step: "03",
                title: "Matching Process",
                description: "AI matches you with suitable careers and colleges",
                icon: Target
              },
              {
                step: "04",
                title: "Personalized Report",
                description: "Receive detailed recommendations and action plan",
                icon: Award
              }
            ].map((process, index) => (
              <div 
                key={index}
                className="text-center group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <process.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{process.step}</span>
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{process.title}</h4>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};