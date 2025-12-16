"use client";

import { useRef, useMemo, useState } from "react";
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
    className={`p-2 rounded-full shadow-md bg-white hover:bg-primary hover:text-white transition ${className}`}
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
  <div className="min-w-[280px] bg-white rounded-lg shadow-lg overflow-hidden flex-shrink-0">
    <Image
      src={image}
      alt={`${name} image`}
      width={400}
      height={176}
      className="w-full h-44 object-cover"
      unoptimized
    />
    <div className="p-4">
      <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
      <p className="text-gray-600 text-sm">{location}</p>
      <p className="mt-2 inline-block px-2 py-1 text-xs font-medium rounded bg-primary/20 text-primary">
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

import { colleges } from "../data/colleges";

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            data-aos="fade-up"
          >
            Our Partner Colleges
          </h2>
          <p
            className="text-lg text-gray-600"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            We&apos;ve partnered with over 600 top colleges across India to
            provide the best opportunities for our students
          </p>
        </div>

          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 justify-center">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <select
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="">All Areas</option>
                {areas.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>

              <input
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
                placeholder="Search area (city, state)"
                className="border rounded-md px-3 py-2 w-full md:w-64"
              />
            </div>
          </div>

          <div className="relative" data-aos="fade-up" data-aos-delay="200">
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
            className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            {filtered.map((college) => (
              <Link key={college.slug} href={`/colleges/${college.slug}`} className="inline-block">
                <CollegeCard
                  name={college.name}
                  location={college.location}
                  image={college.image}
                  category={college.category}
                />
              </Link>
            ))}
          </div>

          {/* Mobile scroll buttons */}
          <div className="mt-10 text-center">
            <p className="text-gray-600 italic">
              And many more across various disciplines and regions...
            </p>
            <div className="flex justify-center mt-4 gap-2 md:hidden">
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
