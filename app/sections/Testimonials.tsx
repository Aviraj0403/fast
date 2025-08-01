"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  name: string;
  college: string;
  image: string;
  region: string;
  testimonial: string;
};

const TestimonialCard = ({
  name,
  college,
  image,
  region,
  testimonial,
}: Testimonial) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-72 flex flex-col">
      <div className="flex items-center mb-4">
        <img
          src={image}
          alt={`${name}'s photo`}
          className="w-14 h-14 rounded-full object-cover mr-4"
          loading="lazy"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{college}</p>
          <p className="text-xs text-gray-400">{region}</p>
        </div>
      </div>
      <p className="text-gray-700 flex-grow">{testimonial}</p>
    </div>
  );
};

export const Testimonials = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = current.clientWidth * 0.8;

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  const testimonials: Testimonial[] = [
    {
      name: "Priya Sharma",
      college: "IIT Delhi",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
      region: "Uttarakhand",
      testimonial:
        "FAST's counseling was truly transformative for my career. Their guidance helped me secure admission in IIT Delhi. The personalized coaching and mock interview sessions were invaluable!",
    },
    {
      name: "Rahul Verma",
      college: "AIIMS Bhopal",
      image: "https://images.unsplash.com/photo-1542868796-20f2ddc9d41f",
      region: "Madhya Pradesh",
      testimonial:
        "I had almost given up on my dream of becoming a doctor until I found FAST. Their counselors helped me strategize my NEET preparation and guided me through the admission process. Forever grateful!",
    },
    {
      name: "Ananya Das",
      college: "National Law University",
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc",
      region: "West Bengal",
      testimonial:
        "Getting into NLU seemed impossible, but with FAST's specialized law counseling, I was able to not only crack CLAT but also secure a scholarship. Their network and insights are unmatched.",
    },
    {
      name: "Vikram Singh",
      college: "IIM Bangalore",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
      region: "Bangalore",
      testimonial:
        "As someone who was confused about career options after engineering, FAST provided clarity and direction. Their MBA counseling helped me get into IIM Bangalore, which changed my life trajectory.",
    },
    {
      name: "Divya Patel",
      college: "VIT Vellore",
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70",
      region: "Vellore",
      testimonial:
        "FAST understood my strengths and guided me towards the right engineering program. Their counselors have in-depth knowledge about each college's specializations, which proved extremely helpful.",
    },
    {
      name: "Arjun Kumar",
      college: "KIMS Hyderabad",
      image: "https://images.unsplash.com/photo-1542868796-20f2ddc9d41f",
      region: "Hyderabad",
      testimonial:
        "The FAST team went above and beyond to help me secure a seat in one of the top medical colleges. Their guidance on entrance preparation and document verification made the process seamless.",
    },
  ];

  return (
    <section id="success-stories" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            data-aos="fade-up"
          >
            Success Stories
          </h2>
          <p
            className="text-lg text-gray-600"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Hear from our students who achieved their academic dreams with our
            guidance
          </p>
        </div>

        <div className="relative" data-aos="fade-up" data-aos-delay="200">
          {/* Navigation Buttons */}
          <div className="absolute -left-5 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-primary hover:text-white"
              onClick={() => scroll("left")}
              aria-label="Scroll testimonials left"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </div>

          <div className="absolute -right-5 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-primary hover:text-white"
              onClick={() => scroll("right")}
              aria-label="Scroll testimonials right"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            tabIndex={0}
            className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="snap-start min-w-[300px]">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="mt-6 text-center">
            <div className="flex justify-center mt-4 gap-2 md:hidden">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white shadow-md hover:bg-primary hover:text-white"
                onClick={() => scroll("left")}
                aria-label="Scroll testimonials left"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-white shadow-md hover:bg-primary hover:text-white"
                onClick={() => scroll("right")}
                aria-label="Scroll testimonials right"
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
