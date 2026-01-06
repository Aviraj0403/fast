"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Clock,
  Award,
  BarChart3
} from "lucide-react";

export const AIAssessmentSection = () => {
  const [isAssessmentStarted, setIsAssessmentStarted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // eslint-disable-line @typescript-eslint/no-unused-vars

  const assessmentFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze your interests, skills, and personality",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: Target,
      title: "Personalized Matching",
      description: "Get matched with careers and colleges that fit your profile perfectly",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: TrendingUp,
      title: "Future-Ready Insights",
      description: "Discover emerging career paths and industry trends",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Award,
      title: "Success Prediction",
      description: "AI predicts your success probability in different career paths",
      color: "from-orange-500 to-red-600"
    }
  ];

  const assessmentSteps = [
    "Personal Interests",
    "Skills Assessment", 
    "Academic Preferences",
    "Career Goals",
    "AI Analysis"
  ];

  const startAssessment = () => {
    setIsAssessmentStarted(true);
    // Here you would integrate with your actual assessment system
  };

  return (
    <section id="assessment" className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-6 py-2 mb-6"
            data-aos="fade-up"
          >
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">AI-Powered Assessment</span>
          </div>
          
          <h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Discover Your Perfect{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Career Path
            </span>
          </h2>
          
          <p 
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Take our comprehensive AI-powered assessment to get personalized career recommendations, 
            college matches, and success predictions tailored just for you.
          </p>

          {/* Assessment Stats */}
          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {[
              { icon: Users, value: "50K+", label: "Assessments Taken" },
              { icon: Clock, value: "15 min", label: "Average Time" },
              { icon: BarChart3, value: "95%", label: "Accuracy Rate" },
              { icon: Award, value: "4.9/5", label: "User Rating" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {!isAssessmentStarted ? (
          <>
            {/* Features Grid */}
            <div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {assessmentFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-medium transition-all duration-300 card-hover group"
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
              data-aos="fade-up"
              data-aos-delay="500"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 border border-white rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Discover Your Future?
                </h3>
                <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of students who have found their perfect career path through our AI assessment.
                </p>
                
                <Button
                  onClick={startAssessment}
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 btn-hover group"
                >
                  <Brain className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Start AI Assessment
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <p className="text-sm text-purple-200 mt-4">
                  ✨ Free • No registration required • Instant results
                </p>
              </div>
            </div>
          </>
        ) : (
          /* Assessment Interface */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-large p-8 md:p-12">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">AI Career Assessment</h3>
                  <span className="text-sm text-gray-500">Step {currentStep + 1} of {assessmentSteps.length}</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / assessmentSteps.length) * 100}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between mt-2">
                  {assessmentSteps.map((step, index) => (
                    <span 
                      key={index}
                      className={`text-xs ${index <= currentStep ? 'text-purple-600 font-medium' : 'text-gray-400'}`}
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>

              {/* Assessment Content */}
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                  <Brain className="w-12 h-12 text-white" />
                </div>
                
                <h4 className="text-2xl font-bold text-gray-900 mb-4">
                  AI Assessment in Progress...
                </h4>
                
                <p className="text-gray-600 mb-8">
                  Our AI is analyzing your responses to provide personalized recommendations.
                </p>
                
                <div className="flex justify-center space-x-2">
                  {[...Array(3)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Demo Results Preview */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 mt-8">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h5 className="text-lg font-semibold text-gray-900">Assessment Complete!</h5>
                </div>
                
                <p className="text-gray-600 mb-4">
                  Based on your responses, here are your top career matches:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { career: "Software Engineer", match: "95%", color: "bg-green-500" },
                    { career: "Data Scientist", match: "88%", color: "bg-blue-500" },
                    { career: "Product Manager", match: "82%", color: "bg-purple-500" }
                  ].map((result, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-soft">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">{result.career}</span>
                        <span className="text-sm font-bold text-gray-700">{result.match}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${result.color} h-2 rounded-full`}
                          style={{ width: result.match }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button
                  className="w-full mt-6 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-semibold"
                  onClick={() => {
                    const element = document.getElementById("enquiry");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Get Detailed Report & Counseling
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};