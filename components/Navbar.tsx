"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronRight } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", id: "home", path: "/" },
  { name: "Courses", id: "courses", path: "/courses" },
  { name: "Blogs", id: "blogs", path: "/blogs" },
  { name: "About", id: "about", path: "/#about" },
  { name: "Contact", id: "contact", path: "/#contact" },
];

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();
  const isHome = pathname === "/";

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

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        (scrolled || !isHome)
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-100 shadow-sm py-2"
          : "bg-transparent py-4 text-white"
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-xl bg-white/20 p-1 backdrop-blur-md">
              <Image
                src="/image/contact.jpeg"
                alt="Logo"
                width={48}
                height={48}
                className="rounded-lg object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span
              className={`text-2xl md:text-3xl font-black tracking-tighter transition-colors ${
                (scrolled || !isHome) ? "text-[#0f172a]" : "text-white"
              }`}
            >
              FAST<span className="text-[#2563eb]">ADMISSION</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <ul className="flex space-x-8">
              {navItems.map(({ name, path, id }) => (
                <li key={id} className="relative group">
                  <Link
                    href={path}
                    className={`text-sm font-black uppercase tracking-widest transition-all duration-300 hover:text-[#2563eb] ${
                      (scrolled || !isHome) ? "text-[#0f172a]/80" : "text-white/80"
                    }`}
                  >
                    {name}
                    <span
                      className={`absolute -bottom-1 left-0 h-[2px] w-0 bg-[#2563eb] group-hover:w-full transition-all duration-300`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/918581841853?text=I%20want%20to%20enquire%20about%20admissions%20-%20General%20Query"
              target="_blank"
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 ${
                (scrolled || !isHome)
                  ? "bg-[#2563eb] text-white shadow-lg shadow-blue-200"
                  : "bg-white text-[#2563eb] shadow-xl"
              }`}
            >
              Connect Us
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors ${
              (scrolled || !isHome) ? "text-[#0f172a] hover:bg-slate-100" : "text-white hover:bg-white/10"
            }`}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 animate-in slide-in-from-top-5 duration-300">
            <div className="bg-white/95 backdrop-blur-2xl shadow-2xl rounded-[32px] p-8 border border-slate-100 space-y-6">
              <ul className="space-y-6">
                {navItems.map(({ name, path, id }) => (
                  <li key={id}>
                    <Link
                      href={path}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-xl font-black text-[#0f172a] py-2 hover:text-[#2563eb] transition-colors"
                    >
                      {name}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://wa.me/918581841853?text=I%20want%20to%20enquire%20about%20admissions"
                    target="_blank"
                    className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 py-5 rounded-2xl flex items-center justify-center gap-2 transition font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-200"
                  >
                    Connect Us <ChevronRight className="h-5 w-5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
