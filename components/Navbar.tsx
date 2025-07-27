"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Services", id: "services" },
  { name: "Success Stories", id: "success-stories" },
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
  }, []); // navItems moved outside, no need to add here

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/image/contact.jpeg"
              alt="Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <span
              className={`text-2xl md:text-3xl font-bold transition-colors ${
                scrolled ? "text-blue-600" : "text-white"
              }`}
            >
              FAST
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {navItems.map(({ name, id }) => (
                <li key={id} className="relative group">
                  <button
                    onClick={() => scrollToSection(id)}
                    className={`font-medium transition-colors ${
                      scrolled ? "text-gray-800" : "text-white"
                    } ${activeSection === id ? "text-blue-600" : ""}`}
                  >
                    {name}
                    <span
                      className={`absolute left-0 bottom-0 h-[2px] w-full bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${
                        activeSection === id ? "scale-x-100" : ""
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => scrollToSection("enquiry")}
              className={`ml-4 flex items-center gap-2 px-4 py-2 rounded-md transition-all ${
                scrolled
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-white text-blue-600 hover:bg-gray-100"
              }`}
            >
              Enquire Now
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden ${scrolled ? "text-gray-800" : "text-white"}`}
            aria-label="Toggle Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
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
                    className={`w-full text-left py-2 transition-colors ${
                      activeSection === id
                        ? "text-blue-600 font-semibold"
                        : "text-gray-800"
                    }`}
                  >
                    {name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => scrollToSection("enquiry")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2 transition"
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
