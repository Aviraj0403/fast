"use client";

import { useEffect, useState } from "react";

export const AdmissionSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="bg-white -mt-8 pt-0 px-4 relative overflow-hidden">

      {/* SVG Blue Curved Top - only for mobile */}
      {isMobile && (
        <div className="absolute top-0 left-0 w-full z-0">
          {/* <svg viewBox="0 0 1440 320" className="w-full h-28">
            <path
              fill="#1E40AF"
              fillOpacity="1"
              d="M0,224L48,192C96,160,192,96,288,85.3C384,75,480,117,576,138.7C672,160,768,160,864,165.3C960,171,1056,181,1152,176C1248,171,1344,149,1392,138.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            />
          </svg> */}
        </div>
      )}

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-10 relative z-10 pt-12">
        {/* Left Info */}
        <div className="flex-1 space-y-8">
          {/* Features */}
          <div className="grid md:grid-cols-2 gap-6 text-gray-800">
            {[
              { icon: "🏫", title: "Top Engineering", desc: "College In India" },
              { icon: "🎓", title: "Top Medical", desc: "College In India" },
              { icon: "🪪", title: "Get Admission", desc: "Bihar Students Credit Card" },
              { icon: "📝", title: "Top EXAM", desc: "WBJEE / NEET / JEE MAIN" },
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

          {/* Blue Animated Cards */}
         <div className="w-full md:w-auto mx-auto md:mx-0 pt-8">
  <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-4">
    {["COLLEGES", "UNIVERSITY", "COURSES", "ADMISSION", "EXAM", "PLACEMENTS"].map((label, i) => (
      <div
        key={i}
        className="group flex flex-col items-center justify-center p-4 aspect-square rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-lg transition transform hover:scale-105 hover:shadow-2xl animate-pulse hover:animate-none"
      >
        <div className="text-3xl mb-2 transition-transform duration-300 group-hover:rotate-6">🎓</div>
        <p className="text-sm font-semibold tracking-wide uppercase">{label}</p>
      </div>
    ))}
  </div>
</div>


        </div>

        {/* Form Card */}
        <div className="flex-1 bg-white shadow-xl border border-gray-200 p-8 rounded-2xl max-w-lg w-full transition-all duration-300 hover:shadow-2xl mt-8 lg:mt-0">
          <p className="text-sm font-semibold text-gray-600 uppercase">Register for the</p>
          <h2 className="text-4xl font-bold text-orange-500 mb-2">ADMISSIONS</h2>
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
