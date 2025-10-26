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
      label: "Colleges",
      icon: <FaBuilding className="text-3xl mb-4" />,
      gradient: "from-purple-500 to-indigo-600",
    },
    {
      label: "University",
      icon: <FaUniversity className="text-3xl mb-4" />,
      gradient: "from-pink-500 to-rose-600",
    },
    {
      label: "Courses",
      icon: <FaBookOpen className="text-3xl mb-4" />,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      label: "Admission",
      icon: <FaClipboardCheck className="text-3xl mb-4" />,
      gradient: "from-yellow-500 to-amber-600",
    },
    {
      label: "Exam",
      icon: <FaPenFancy className="text-3xl mb-4" />,
      gradient: "from-red-500 to-pink-600",
    },
    {
      label: "Placements",
      icon: <FaBriefcase className="text-3xl mb-4" />,
      gradient: "from-cyan-500 to-blue-600",
    },
  ];

  return (
    <section className="bg-white pt-16 pb-12 px-6 relative overflow-hidden">
      {/* Optional SVG Curve */}
      {isMobile && (
        <div className="absolute top-0 left-0 w-full z-0">
          {/* Optional SVG Curve */}
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 relative z-10 pt-6">
        {/* LEFT INFO */}
        <div className="flex-1 space-y-10">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Explore Your Future
          </h2>
          <p className="text-lg text-gray-600">
            Find the best colleges, courses, and opportunities to kickstart your career.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-gray-800">
            {[
              { icon: "🏫", title: "Top Engineering", desc: "Colleges in India" },
              { icon: "🎓", title: "Top Medical", desc: "Colleges in India" },
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
              <div
                key={i}
                className="flex gap-4 items-center hover:scale-105 transition duration-300 ease-in-out"
              >
                <div className="text-3xl">{item.icon}</div>
                <div>
                  <h4 className="font-semibold text-xl">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Simple Cards with Icons */}
          <div className="w-full mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
              {gridItems.map(({ label, gradient, icon }, i) => (
                <div
                  key={i}
                  className={`group flex flex-col items-center justify-center p-6 aspect-square rounded-lg bg-gradient-to-br ${gradient} text-white shadow-lg transition duration-200 ease-in-out hover:shadow-xl`}
                >
                  <div>{icon}</div>
                  <p className="text-sm font-semibold tracking-wide uppercase mt-3">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="flex-1 bg-white shadow-2xl border border-gray-200 p-10 rounded-2xl max-w-lg w-full transition-all duration-300 hover:shadow-3xl mt-10 lg:mt-0">
          <p className="text-sm font-semibold text-gray-600 uppercase">Register for the</p>
          <h2 className="text-4xl font-extrabold text-orange-500 mb-4">ADMISSIONS</h2>
          <p className="text-lg text-gray-600 mb-8">
            Fill in your details below to start the registration process.
          </p>

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
              <input
                type="email"
                placeholder="Email ID"
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
              <input
                type="text"
                placeholder="Courses"
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-lg font-semibold transition"
            >
              REGISTER NOW
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
