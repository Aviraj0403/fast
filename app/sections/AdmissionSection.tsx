"use client";

import { useEffect, useState } from "react";
import {
  FaUniversity,
  FaBuilding,
  FaBookOpen,
  FaClipboardCheck,
  FaPenFancy,
  FaBriefcase,
} from "react-icons/fa";

export const AdmissionSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridItems = [
    {
      label: "COLLEGES",
      icon: <FaBuilding className="text-2xl mb-2" />,
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      label: "UNIVERSITY",
      icon: <FaUniversity className="text-2xl mb-2" />,
      gradient: "from-pink-500 to-rose-600",
    },
    {
      label: "COURSES",
      icon: <FaBookOpen className="text-2xl mb-2" />,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      label: "ADMISSION",
      icon: <FaClipboardCheck className="text-2xl mb-2" />,
      gradient: "from-yellow-500 to-amber-600",
    },
    {
      label: "EXAM",
      icon: <FaPenFancy className="text-2xl mb-2" />,
      gradient: "from-red-500 to-pink-600",
    },
    {
      label: "PLACEMENTS",
      icon: <FaBriefcase className="text-2xl mb-2" />,
      gradient: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <section className="bg-white -mt-8 pt-0 px-4 relative overflow-hidden">
      {/* Mobile-only blue SVG curve (optional) */}
      {isMobile && (
        <div className="absolute top-0 left-0 w-full z-0">
          {/* Optional SVG curve */}
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-10 relative z-10 pt-12">
        {/* LEFT INFO */}
        <div className="flex-1 space-y-8">
          {/* Features */}
          <div className="grid md:grid-cols-2 gap-6 text-gray-800">
            {[
              { icon: "🏫", title: "Top Engineering", desc: "College In India" },
              { icon: "🎓", title: "Top Medical", desc: "College In India" },
              {
                icon: "🪪",
                title: "Get Admission",
                desc: "Bihar Students Credit Card",
              },
              {
                icon: "📝",
                title: "Top EXAM",
                desc: "WBJEE / NEET / JEE MAIN",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="text-2xl">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-lg">{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Blue Animated Cards with Icons */}
          <div className="w-full md:w-auto mx-auto md:mx-0 pt-8">
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {gridItems.map(({ label, gradient, icon }, i) => (
                <div
                  key={i}
                  className={`group flex flex-col items-center justify-center p-4 aspect-square rounded-lg bg-gradient-to-br ${gradient} text-white shadow-lg transition transform hover:scale-105 hover:shadow-2xl animate-pulse hover:animate-none`}
                >
                  <div className="transition-transform duration-300 group-hover:rotate-6">
                    {icon}
                  </div>
                  <p className="text-sm font-semibold tracking-wide uppercase mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="flex-1 bg-white shadow-xl border border-gray-200 p-8 rounded-2xl max-w-lg w-full transition-all duration-300 hover:shadow-2xl mt-8 lg:mt-0">
          <p className="text-sm font-semibold text-gray-600 uppercase">
            Register for the
          </p>
          <h2 className="text-4xl font-bold text-orange-500 mb-2">
            ADMISSIONS
          </h2>
          <p className="text-gray-600 mb-6">Fill below details</p>

          <form className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Name"
                className="w-1/2 p-3 rounded border border-gray-300 focus:outline-orange-400"
              />
              <input
                type="email"
                placeholder="Email ID"
                className="w-1/2 p-3 rounded border border-gray-300 focus:outline-orange-400"
              />
            </div>
            <div className="flex gap-3">
              <input
                type="tel"
                placeholder="Phone number"
                className="w-1/2 p-3 rounded border border-gray-300 focus:outline-orange-400"
              />
              <input
                type="text"
                placeholder="Courses"
                className="w-1/2 p-3 rounded border border-gray-300 focus:outline-orange-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold transition"
            >
              REGISTER NOW
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
