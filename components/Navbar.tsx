"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Services", id: "services" },
    { name: "Success Stories", id: "success-stories" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className={`text-2xl md:text-3xl font-bold ${!scrolled ? "text-white" : "text-primary"}`}>
            FAST
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {navItems.map(({ name, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`font-medium transition-colors ${
                      !scrolled ? "text-white hover:text-primary" : "text-gray-800 hover:text-primary"
                    }`}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => scrollToSection("enquiry")}
              className="ml-4 flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition"
            >
              Enquire Now
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${!scrolled ? "text-white" : "text-gray-800"}`}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-4 p-4 absolute left-4 right-4 z-50 animate-in slide-in-from-top-5 duration-300">
            <ul className="space-y-4">
              {navItems.map(({ name, id }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollToSection(id)}
                    className="text-gray-800 hover:text-primary w-full text-left py-2 transition-colors"
                  >
                    {name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => scrollToSection("enquiry")}
                  className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition"
                >
                  Enquire Now <ChevronRight className="h-4 w-4" />
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
