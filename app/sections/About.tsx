"use client";

import { BookOpen, Target, Users, Award } from "lucide-react";
import Image from "next/image";
// Simple reusable Button component
const Button = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-3 rounded-md font-medium transition ${className || "bg-primary text-white hover:bg-primary/90"
        }`}
    >
      {children}
    </button>
  );
};

// Simple reusable Card component
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`bg-gray-50 rounded-lg shadow-sm border border-transparent ${className}`}
    >
      {children}
    </div>
  );
};

const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`p-4 flex flex-col items-center text-center ${className}`}>
      {children}
    </div>
  );
};

export const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            data-aos="fade-up"
          >
            About FAST
          </h2>
          <p
            className="text-lg text-gray-600"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Future Advice for Successful Tomorrow
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative" data-aos="fade-right">
            <div className="relative z-10 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1588873281272-14886ba1f737"
                alt="Counseling session"
                className="w-full h-auto object-cover"
                width={800} // adjust as needed
                height={600} // adjust as needed
                unoptimized // optional if you don't want Next.js to optimize it
              />
            </div>
            <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-primary/20 rounded-full z-0"></div>
            <div className="absolute -top-5 -left-5 w-24 h-24 bg-primary/20 rounded-full z-0"></div>
          </div>

          <div data-aos="fade-left" data-aos-delay="100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Your Path to Success Since 2015
            </h3>
            <p className="text-gray-600 mb-6">
              FAST (Future Advice for Successful Tomorrow) has been dedicated to guiding students toward their academic goals since 2015. With a rich history of success and expertise in educational counseling, we&apos;ve helped over 1700 students secure admissions in their dream institutions.
            </p>

            <p className="text-gray-600 mb-8">
              Our team of experienced counselors specializes in admissions
              across various disciplines, including Engineering, Medical, Law,
              and more. We take pride in our strong network of 600+ partner
              colleges across India, ensuring that our students have access to
              the best educational opportunities.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                {
                  icon: <BookOpen className="h-6 w-6 text-primary" />,
                  title: "Expert Guidance",
                  desc: "Professional counselors with deep industry knowledge",
                },
                {
                  icon: <Target className="h-6 w-6 text-primary" />,
                  title: "Personalized Approach",
                  desc: "Tailored solutions for each student's needs",
                },
                {
                  icon: <Users className="h-6 w-6 text-primary" />,
                  title: "Strong Network",
                  desc: "Connections with 600+ colleges nationwide",
                },
                {
                  icon: <Award className="h-6 w-6 text-primary" />,
                  title: "Proven Results",
                  desc: "History of successful placements since 2015",
                },
              ].map((item, index) => (
                <Card key={index}>
                  <CardContent>
                    <div className="mb-2">{item.icon}</div>
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              onClick={() => {
                const servicesSection = document.getElementById("services");
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Explore Our Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
