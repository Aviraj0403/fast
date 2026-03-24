"use client";

import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  ArrowUp,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#0f172a] text-slate-400 pt-24 pb-12 overflow-hidden relative">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Info */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
                <Image src="/image/contact.jpeg" alt="Logo" width={40} height={40} className="rounded-lg" />
              </div>
              <span className="text-2xl font-black text-white tracking-widest">FAST<span className="text-blue-500">ADMISSION</span></span>
            </div>
            <p className="leading-relaxed font-medium">
              We empower students to achieve their academic dreams through professional counselling and strategic admission guidance since 2015.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-white font-bold text-lg uppercase tracking-widest">Navigation</h3>
            <ul className="space-y-4">
              {[
                { name: "Home", path: "/" },
                { name: "Academic Courses", path: "/courses" },
                { name: "Educational Blogs", path: "/blogs" },
                { name: "About FastAdmission", path: "/#about" },
                { name: "Contact Us", path: "/#contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="hover:text-blue-500 transition-colors font-medium flex items-center group text-sm"
                  >
                    <span className="w-0 group-hover:w-4 h-[2px] bg-blue-500 mr-0 group-hover:mr-3 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-8">
            <h3 className="text-white font-bold text-lg uppercase tracking-widest">Specializations</h3>
            <ul className="space-y-4 font-medium text-sm">
              {[
                "Engineering (B.Tech)",
                "Medical (MBBS/BDS)",
                "Business (MBA/BBA)",
                "Legal Studies (LLB)",
                "Career Assessment",
                "Admission Counselling",
              ].map((service) => (
                <li key={service} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50"></div>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-8">
            <h3 className="text-white font-bold text-lg uppercase tracking-widest">Connect With Us</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Visit Our Office</p>
                  <p className="text-xs mt-1">FAST Headquarters, Educational Hub, India</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">Email Support</p>
                  <p className="text-xs mt-1">info@fastadmission.com</p>
                </div>
              </div>
              <a 
                href="https://wa.me/918581841853?text=Hi%20FastAdmission%2C%20I%20need%20help%20with%20admissions"
                target="_blank"
                className="flex items-center gap-3 p-4 bg-blue-600 rounded-2xl text-white font-black hover:bg-blue-700 transition-all text-xs uppercase tracking-widest"
              >
                <MessageCircle className="h-5 w-5" />
                WHATSAPP SUPPORT
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium uppercase tracking-widest">
            &copy; {new Date().getFullYear()} FastAdmission. Crafting Careers since 2015.
          </p>
          <div className="flex items-center gap-8">
             <button
              onClick={scrollToTop}
              className="bg-white/10 hover:bg-blue-600 text-white p-3 rounded-xl transition-all group"
            >
              <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
