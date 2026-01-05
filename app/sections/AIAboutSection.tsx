"use client";

import { 
  Brain, 
  Users, 
  Award, 
  TrendingUp, 
  Target, 
  Sparkles,
  CheckCircle,
  ArrowRight,
  Calendar,
  MapPin,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const AIAboutSection = () => {
  const achievements = [
    {
      icon: Users,
      value: "50,000+",
      label: "Students Guided",
      description: "Successfully counseled students across India"
    },
    {
      icon: Award,
      value: "95%",
      label: "Success Rate",
      description: "Students placed in their preferred colleges"
    },
    {
      icon: TrendingUp,
      value: "500+",
      label: "Partner Colleges",
      description: "Top institutions across multiple streams"
    },
    {
      icon: Calendar,
      value: "9+ Years",
      label: "Experience",
      description: "Pioneering AI-powered career counseling"
    }
  ];

  const aiFeatures = [
    {
      icon: Brain,
      title: "Advanced AI Algorithms",
      description: "Machine learning models trained on thousands of successful career paths"
    },
    {
      icon: Target,
      title: "Precision Matching",
      description: "99.2% accuracy in career-college matching based on comprehensive profiling"
    },
    {
      icon: Sparkles,
      title: "Continuous Learning",
      description: "AI system constantly evolves with new data and industry trends"
    },
    {
      icon: CheckCircle,
      title: "Verified Results",
      description: "All recommendations backed by real student success stories and data"
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Rajesh Kumar",
      role: "Chief AI Scientist",
      experience: "15+ years in ML/AI",
      image: "/team/rajesh.jpg",
      specialization: "Machine Learning, Career Analytics"
    },
    {
      name: "Priya Sharma",
      role: "Lead Career Counselor",
      experience: "12+ years in counseling",
      image: "/team/priya.jpg", 
      specialization: "Psychology, Student Guidance"
    },
    {
      name: "Amit Patel",
      role: "Data Science Head",
      experience: "10+ years in data science",
      image: "/team/amit.jpg",
      specialization: "Predictive Analytics, Big Data"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-6 py-2 mb-6"
            data-aos="fade-up"
          >
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">About FastAdmission AI</span>
          </div>
          
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Pioneering the Future of{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Career Counseling
            </span>
          </h2>
          
          <p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Since 2015, we've been revolutionizing career guidance with cutting-edge AI technology, 
            helping students make informed decisions about their future.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div data-aos="fade-right">
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Our AI-Powered Journey
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">2015 - The Beginning</h4>
                  <p className="text-gray-600">Started as a traditional counseling service with a vision to transform career guidance through technology.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">2019 - AI Integration</h4>
                  <p className="text-gray-600">Introduced machine learning algorithms to analyze student profiles and predict career success.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">2022 - Advanced AI</h4>
                  <p className="text-gray-600">Launched comprehensive AI platform with predictive analytics and personalized recommendations.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">2024 - Industry Leader</h4>
                  <p className="text-gray-600">Recognized as India's most advanced AI-powered career counseling platform with 95% success rate.</p>
                </div>
              </div>
            </div>
          </div>

          <div data-aos="fade-left" className="relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Main Image Placeholder */}
              <div className="w-full h-96 bg-gradient-to-br from-purple-100 to-blue-100 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
                <div className="relative z-10 text-center">
                  <Brain className="w-24 h-24 text-purple-600 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Platform</h4>
                  <p className="text-gray-600">Advanced technology meets human expertise</p>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-medium">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-sm font-semibold">4.9/5 Rating</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-medium">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-semibold">50K+ Students</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
          data-aos="fade-up"
        >
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 text-center shadow-soft hover:shadow-medium transition-all duration-300 card-hover group"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <achievement.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.value}</div>
              <div className="text-lg font-semibold text-gray-800 mb-2">{achievement.label}</div>
              <div className="text-sm text-gray-600">{achievement.description}</div>
            </div>
          ))}
        </div>

        {/* AI Features */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Our AI Technology Advantage
            </h3>
            <p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Cutting-edge artificial intelligence that understands your unique potential
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {aiFeatures.map((feature, index) => (
              <div 
                key={index}
                className="flex gap-6 bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 card-hover"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              data-aos="fade-up"
            >
              Meet Our Expert Team
            </h3>
            <p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              AI experts and career counselors working together for your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-soft hover:shadow-medium transition-all duration-300 card-hover group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Profile Image Placeholder */}
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users className="w-12 h-12 text-white" />
                </div>
                
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-sm text-gray-600 mb-3">{member.experience}</p>
                <p className="text-sm text-gray-500">{member.specialization}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div 
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
          data-aos="fade-up"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Experience AI-Powered Counseling?
            </h3>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have transformed their careers with our advanced AI technology.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 btn-hover group"
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
                Contact Our Experts
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};