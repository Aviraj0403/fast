"use client"

import { useRef } from "react";
import { CollegeCard } from "@/components/ui/CollegeCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Colleges = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.8;
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Simulated list of top partner colleges
  const colleges = [
    {
      name: "Engineering Excellence Institute",
      location: "New Delhi",
      image: "https://images.unsplash.com/photo-1562774053-701939374585",
      category: "Engineering"
    },
    {
      name: "Medical Sciences University",
      location: "Mumbai",
      image: "https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd",
      category: "Medical"
    },
    {
      name: "National Law School",
      location: "Bangalore",
      image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b",
      category: "Law"
    },
    {
      name: "Business Management Institute",
      location: "Hyderabad",
      image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952",
      category: "Management"
    },
    {
      name: "Technical University",
      location: "Vellore",
      image: "https://images.unsplash.com/photo-1562774053-701939374585",
      category: "Engineering"
    },
    {
      name: "Health Sciences College",
      location: "Kolkata",
      image: "https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd",
      category: "Medical"
    },
    {
      name: "Institute of Legal Studies",
      location: "Pune",
      image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b", 
      category: "Law"
    },
    {
      name: "College of Future Technologies",
      location: "Noida",
      image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952",
      category: "Engineering"
    }
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
            We've partnered with over 600 top colleges across India to provide the best opportunities for our students
          </p>
        </div>

        <div className="relative" data-aos="fade-up" data-aos-delay="200">
          {/* Navigation Buttons */}
          <div className="absolute -left-5 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
            <Button 
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-primary hover:text-white"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="absolute -right-5 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
            <Button 
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-primary hover:text-white"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Scrollable Container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
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
          
          <div className="mt-10 text-center">
            <p className="text-gray-600 italic">
              And many more across various disciplines and regions...
            </p>
            <div 
              className="flex justify-center mt-4 gap-2 md:hidden"
            >
              <Button 
                variant="outline"
                size="icon"
                className="rounded-full bg-white shadow-md hover:bg-primary hover:text-white"
                onClick={() => scroll('left')}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline"
                size="icon"
                className="rounded-full bg-white shadow-md hover:bg-primary hover:text-white"
                onClick={() => scroll('right')}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
