"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Brain, Sparkles, Phone, MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Home", path: "/" },
  { name: "AI Assessment", path: "/assessment" },
  { name: "Services", path: "/services" },
  { name: "Blogs", path: "/blogs" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Logic: Show gradient/solid background if:
  // 1. Scrolled down
  // 2. Mobile menu is open
  // 3. User is NOT on the home page (Inner pages need contrast)
  const isHomePage = pathname === "/";
  const showGradient = scrolled || isMenuOpen || !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${showGradient
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
            >
              <div className="relative">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 ${showGradient
                  ? "bg-gradient-to-r from-blue-600 to-purple-600"
                  : "bg-gradient-to-r from-cyan-500 to-blue-600"
                  }`}>
                  <Brain className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2 h-2 md:w-2.5 md:h-2.5 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${showGradient ? "text-blue-900" : "text-white"
                  }`}>
                  FastAdmission
                </span>
                <span className={`text-[10px] md:text-xs font-medium transition-colors duration-300 ${showGradient ? "text-blue-600" : "text-cyan-200"
                  }`}>
                  AI Career Counselor
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${isActive
                      ? showGradient
                        ? "bg-blue-50 text-blue-700 shadow-md"
                        : "bg-white/20 text-white backdrop-blur-sm shadow-lg"
                      : showGradient
                        ? "text-gray-700 hover:bg-gray-50 hover:text-blue-700"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                      }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    {isActive && (
                      <div className={`absolute inset-0 ${showGradient
                        ? "bg-gradient-to-r from-blue-50 to-purple-50"
                        : "bg-white/20"
                        } rounded-xl`}></div>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open("tel:+919876543210", "_self")}
                className={`border-2 transition-all duration-300 hover:scale-105 rounded-xl ${showGradient
                  ? "border-blue-200 text-blue-700 hover:bg-blue-50 bg-white/80"
                  : "border-white/40 text-white hover:bg-white/20 backdrop-blur-sm bg-white/10"
                  }`}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>

              <Link
                href="/contact"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 btn-hover group rounded-xl px-4 py-2 text-sm flex items-center"
              >
                <MessageCircle className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                Get Started
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mobile Header Icons & Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* WhatsApp Quick Link */}
              <a
                href="https://wa.me/918581841853"
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-full transition-colors ${showGradient ? "text-green-600 hover:bg-green-50" : "text-white hover:bg-white/20"
                  }`}
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-6 h-6" />
              </a>

              {/* Call Quick Link */}
              <a
                href="tel:+918581841853"
                className={`p-2 rounded-full transition-colors ${showGradient ? "text-blue-600 hover:bg-blue-50" : "text-white hover:bg-white/20"
                  }`}
                aria-label="Call"
              >
                <Phone className="w-5 h-5" />
              </a>

              {/* Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-xl transition-all duration-300 ${showGradient
                  ? "text-gray-700 hover:bg-gray-100"
                  : "text-white hover:bg-white/20"
                  }`}
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-500 overflow-hidden ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="bg-white/95 backdrop-blur-xl border-t border-gray-100 shadow-2xl">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                        ? "bg-blue-50 text-blue-700 shadow-md"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-700"
                        }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                {/* Mobile CTA Buttons (Menu Bottom) */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => {
                      window.open("tel:+919876543210", "_self");
                      setIsMenuOpen(false);
                    }}
                    className="w-full border-2 border-blue-200 text-blue-700 hover:bg-blue-50 rounded-xl"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>

                  <Link
                    href="/contact"
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-xl flex items-center justify-center py-2.5 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Get Started
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
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