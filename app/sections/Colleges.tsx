"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

// Native CollegeCard component
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
    <img src={image} alt={`${name} image`} className="w-full h-44 object-cover" />
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

  const colleges = [
    {
      name: "Engineering Excellence Institute",
      location: "New Delhi",
      image: "https://images.unsplash.com/photo-1562774053-701939374585",
      category: "Engineering",
    },
    {
      name: "Medical Sciences University",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd",
      category: "Medical",
    },
    {
      name: "National Law School",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b",
      category: "Law",
    },
    {
      name: "Business Management Institute",
      location: "Hyderabad",
      image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952",
      category: "Management",
    },
    {
      name: "Technical University",
      location: "Vellore",
      image: "https://images.unsplash.com/photo-1562774053-701939374585",
      category: "Engineering",
    },
    {
      name: "Health Sciences College",
      location: "Kolkata",
      image: "https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd",
      category: "Medical",
    },
    {
      name: "Institute of Legal Studies",
      location: "Pune",
      image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b",
      category: "Law",
    },
    {
      name: "College of Future Technologies",
      location: "Noida",
      image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952",
      category: "Engineering",
    },
  ];

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
            We've partnered with over 600 top colleges across India to provide the
            best opportunities for our students
          </p>
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
            {colleges.map((college, index) => (
              <CollegeCard
                key={index}
                name={college.name}
                location={college.location}
                image={college.image}
                category={college.category}
              />
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
