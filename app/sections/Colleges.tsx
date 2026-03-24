"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { colleges } from "../data/colleges";

// Native Button component
const Button = ({
  children,
  onClick,
  className = "",
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className={`p-2 rounded-full shadow-md bg-white hover:bg-[#2563eb] hover:text-white transition ${className}`}
  >
    {children}
  </button>
);

// Updated CollegeCard with <Image />
const CollegeCard = ({
  name,
  location,
  image,
  category,
}: {
  name: string;
  location: string;
  image: string;
  category: string;
}) => (
  <div className="min-w-[280px] bg-white rounded-3xl shadow-lg overflow-hidden flex-shrink-0 border border-slate-100 group">
    <div className="relative h-44 w-full overflow-hidden">
        <Image
          src={image}
          alt={`${name} image`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
    </div>
    <div className="p-6">
      <h3 className="font-black text-lg text-[#0f172a] mb-1">{name}</h3>
      <p className="text-[#2563eb] text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span> {location}
      </p>
      <p className="mt-4 inline-block px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full bg-slate-50 text-slate-500 border border-slate-100">
        {category}
      </p>
    </div>
  </div>
);

export const Colleges = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [areaFilter, setAreaFilter] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    colleges.forEach((c) => c.category && set.add(c.category));
    return Array.from(set);
  }, []);

  const areas = useMemo(() => {
    const set = new Set<string>();
    colleges.forEach((c) => c.location && set.add(c.location));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    return colleges.filter((c) => {
      if (categoryFilter !== "all" && categoryFilter !== c.category) return false;
      if (areaFilter && !c.location.toLowerCase().includes(areaFilter.toLowerCase())) return false;
      return true;
    });
  }, [categoryFilter, areaFilter]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const { current } = scrollContainerRef;
    const scrollAmount = current.clientWidth * 0.8;

    if (direction === "left") {
      current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-slate-50 overflow-hidden" id="colleges">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
           <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#2563eb] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            Elite Partnerships
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 tracking-tighter">
            Our <span className="text-[#2563eb]">Partner Institutions</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            We&apos;ve partnered with over 600 top colleges across India to
            provide the best opportunities for our students.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border-none bg-white shadow-sm ring-1 ring-slate-200 rounded-2xl px-6 py-4 font-black text-xs uppercase tracking-widest outline-none focus:ring-2 focus:ring-[#2563eb] transition-all"
            >
              <option value="all">Every Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              className="border-none bg-white shadow-sm ring-1 ring-slate-200 rounded-2xl px-6 py-4 font-black text-xs uppercase tracking-widest outline-none focus:ring-2 focus:ring-[#2563eb] transition-all"
            >
              <option value="">Every Region</option>
              {areas.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>

            <input
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value)}
              placeholder="QUICK SEARCH AREA..."
              className="border-none bg-white shadow-sm ring-1 ring-slate-200 rounded-2xl px-6 py-4 font-black text-xs uppercase tracking-widest outline-none focus:ring-2 focus:ring-[#2563eb] transition-all w-full md:w-80"
            />
          </div>
        </div>

        <div className="relative">
          {/* Navigation Buttons for md+ */}
          <div className="absolute -left-5 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
            <Button onClick={() => scroll("left")} ariaLabel="Scroll left">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute -right-5 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
            <Button onClick={() => scroll("right")} ariaLabel="Scroll right">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Scrollable container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-8 pb-10 scrollbar-hide px-4"
            style={{ scrollbarWidth: "none" }}
          >
            {filtered.map((college) => (
              <Link key={college.slug} href={`/colleges/${college.slug}`} className="inline-block transform transition-transform hover:-translate-y-2">
                <CollegeCard
                  name={college.name}
                  location={college.location}
                  image={college.image}
                  category={college.category}
                />
              </Link>
            ))}
          </div>

          {/* Bottom message */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] italic">
              Empowering excellence in 600+ disciplinary institutions...
            </p>
            <div className="flex justify-center mt-8 gap-4 md:hidden">
              <Button onClick={() => scroll("left")} ariaLabel="Scroll left">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button onClick={() => scroll("right")} ariaLabel="Scroll right">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
