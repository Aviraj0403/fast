"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight, Brain, Sparkles, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", id: "home" },
  { name: "AI Assessment", id: "assessment" },
  { name: "Services", id: "services" },
  { name: "Success Stories", id: "testimonials" },
  { name: "About", id: "about" },
  { name: "Contact", id: "contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      const scrollY = window.scrollY;

      navItems.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          const offsetTop = section.offsetTop - 100;
          const offsetBottom = offsetTop + section.offsetHeight;

          if (scrollY >= offsetTop && scrollY < offsetBottom) {
            setActiveSection(id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToEnquiry = () => {
    setIsMenuOpen(false);
    const el = document.getElementById("enquiry");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 group"
              onClick={() => scrollToSection("home")}
            >
              <div className="relative">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ${
                  scrolled 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600" 
                    : "bg-gradient-to-r from-cyan-500 to-blue-600"
                }`}>
                  <Brain className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-bold transition-colors duration-300 ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}>
                  FastAdmission
                </span>
                <span className={`text-xs font-medium transition-colors duration-300 ${
                  scrolled ? "text-blue-600" : "text-cyan-200"
                }`}>
                  AI Career Counselor
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                    activeSection === item.id
                      ? scrolled
                        ? "bg-blue-50 text-blue-700 shadow-md"
                        : "bg-white/20 text-white backdrop-blur-sm shadow-lg"
                      : scrolled
                      ? "text-gray-700 hover:bg-gray-50 hover:text-blue-700"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {activeSection === item.id && (
                    <div className={`absolute inset-0 ${
                      scrolled 
                        ? "bg-gradient-to-r from-blue-50 to-purple-50" 
                        : "bg-white/20"
                    } rounded-xl`}></div>
                  )}
                </button>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("tel:+919876543210", "_self")}
                className={`border-2 transition-all duration-300 hover:scale-105 rounded-xl ${
                  scrolled
                    ? "border-blue-200 text-blue-700 hover:bg-blue-50 bg-white/80"
                    : "border-white/40 text-white hover:bg-white/20 backdrop-blur-sm bg-white/10"
                }`}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              
              <Button
                onClick={scrollToEnquiry}
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 btn-hover group rounded-xl"
              >
                <MessageCircle className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                Get Started
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 ${
                scrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/20"
              }`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 overflow-hidden ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-blue-50 text-blue-700 shadow-md"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-700"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                
                {/* Mobile CTA Buttons */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => window.open("tel:+919876543210", "_self")}
                    className="w-full border-2 border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  
                  <Button
                    onClick={scrollToEnquiry}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Get Started
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16 lg:h-20"></div>
    </>
  );
};