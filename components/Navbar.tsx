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
      setScrolled(window.scrollY > 50);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Brain className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-bold transition-colors ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}>
                  FastAdmission
                </span>
                <span className={`text-xs font-medium transition-colors ${
                  scrolled ? "text-blue-600" : "text-blue-200"
                }`}>
                  AI Career Counselor
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
                    activeSection === item.id
                      ? scrolled
                        ? "bg-blue-100 text-blue-700"
                        : "bg-white/20 text-white backdrop-blur-sm"
                      : scrolled
                      ? "text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("tel:+919876543210", "_self")}
                className={`border-2 transition-all duration-300 hover:scale-105 ${
                  scrolled
                    ? "border-blue-200 text-blue-700 hover:bg-blue-50"
                    : "border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
                }`}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              
              <Button
                onClick={scrollToEnquiry}
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 btn-hover group"
              >
                <MessageCircle className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                Get Started
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/95 backdrop-blur-md border-t border-gray-200/20 shadow-lg">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-blue-700"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                
                {/* Mobile CTA Buttons */}
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => window.open("tel:+919876543210", "_self")}
                    className="w-full border-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                  
                  <Button
                    onClick={scrollToEnquiry}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold"
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