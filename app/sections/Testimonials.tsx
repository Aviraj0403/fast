"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

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
    <div className="bg-white rounded-[48px] p-10 md:p-12 w-[350px] md:w-[450px] flex flex-col border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
      <div className="relative mb-10">
          <Quote className="absolute -top-4 -left-4 w-12 h-12 text-blue-500/10 group-hover:text-blue-500/20 transition-colors" />
          <p className="text-slate-600 font-medium leading-relaxed italic relative z-10 text-lg">
            &quot;{testimonial}&quot;
          </p>
      </div>
      
      <div className="flex items-center mt-auto pt-8 border-t border-slate-50">
        <div className="relative w-16 h-16 rounded-2xl overflow-hidden mr-5 shadow-lg border-2 border-white">
            <Image
              src={image}
              alt={`${name}'s photo`}
              fill
              className="object-cover"
              unoptimized
            />
        </div>
        <div>
          <h3 className="text-lg font-black text-[#0f172a] tracking-tight">{name}</h3>
          <p className="text-[#2563eb] text-[10px] font-black uppercase tracking-widest">{college}</p>
          <div className="flex items-center gap-1 mt-1">
             <span className="w-1 h-1 rounded-full bg-slate-200"></span>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{region}</p>
          </div>
        </div>
      </div>
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
        "FAST's counseling was truly transformative for my career. Their guidance helped me secure admission in IIT Delhi. The personalized coaching sessions were invaluable!",
    },
    {
      name: "Rahul Verma",
      college: "AIIMS Bhopal",
      image: "https://images.unsplash.com/photo-1542868796-20f2ddc9d41f",
      region: "Madhya Pradesh",
      testimonial:
        "I had almost given up on my dream of becoming a doctor until I found FAST. Their counselors helped me strategize my NEET preparation and guided me throughout.",
    },
    {
      name: "Ananya Das",
      college: "National Law University",
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc",
      region: "West Bengal",
      testimonial:
        "Getting into NLU seemed impossible, but with FAST's specialized law counseling, I was able to crack CLAT and secure a seat. Their network and insights are unmatched.",
    },
    {
      name: "Vikram Singh",
      college: "IIM Bangalore",
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad",
      region: "Bangalore",
      testimonial:
        "FAST provided clarity and direction after engineering. Their MBA counseling helped me get into IIM Bangalore, which changed my life trajectory completely.",
    },
  ];

  return (
    <section id="success-stories" className="py-16 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#2563eb] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            Voice of Achievement
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] mb-6 tracking-tighter">
            Wall of <span className="text-[#2563eb]">Excellence</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Witness the journeys of our top-performing students who redefined their limits with FastAdmission guidance.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block">
            <button
               onClick={() => scroll("left")}
               className="w-16 h-16 rounded-full bg-white shadow-2xl border border-slate-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all group"
            >
              <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block">
             <button
               onClick={() => scroll("right")}
               className="w-16 h-16 rounded-full bg-white shadow-2xl border border-slate-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all group"
            >
              <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-8 pb-12 scrollbar-hide px-4"
            style={{ scrollbarWidth: "none" }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="flex-shrink-0">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center mt-8 gap-4 lg:hidden">
              <button
                onClick={() => scroll("left")}
                className="w-14 h-14 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-[#0f172a]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-14 h-14 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-[#0f172a]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
          </div>
        </div>
      </div>
    </section>
  );
};
