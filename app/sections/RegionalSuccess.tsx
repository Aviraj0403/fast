"use client";

import { useState } from "react";

export const RegionalSuccess = () => {
  const regions = [
    {
      name: "Uttarakhand",
      successCount: 250,
      topInstitutions: ["IIT Roorkee", "AIIMS Rishikesh"],
      image: "https://images.unsplash.com/photo-1542868796-20f2ddc9d41f"
    },
    {
      name: "Madhya Pradesh",
      successCount: 320,
      topInstitutions: ["IIT Indore", "AIIMS Bhopal"],
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
    },
    {
      name: "West Bengal",
      successCount: 210,
      topInstitutions: ["IIT Kharagpur", "AIIMS Kalyani"],
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad"
    },
    {
      name: "Hyderabad",
      successCount: 280,
      topInstitutions: ["BITS Hyderabad", "NIFT Hyderabad"],
      image: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc"
    },
    {
      name: "Bangalore",
      successCount: 310,
      topInstitutions: ["IIM Bangalore", "NLU Bangalore"],
      image: "https://images.unsplash.com/photo-1589190887320-d1b6af2bdac3"
    },
    {
      name: "Vellore",
      successCount: 180,
      topInstitutions: ["VIT Vellore", "CMC Vellore"],
      image: "https://images.unsplash.com/photo-1542868796-20f2ddc9d41f"
    },
    {
      name: "Odisha",
      successCount: 150,
      topInstitutions: ["NIT Rourkela", "AIIMS Bhubaneswar"],
      image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
    },
    {
      name: "Noida",
      successCount: 200,
      topInstitutions: ["Amity University", "Sharda University"],
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Regional Success Stories
          </h2>
          <p className="text-lg text-gray-600" data-aos="fade-up" data-aos-delay="100">
            Our success spans across multiple regions in India, helping students from diverse backgrounds
          </p>
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {regions.map((region, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={region.image + "?auto=format&fit=crop&w=400&q=80"}
                  alt={`${region.name} landscape`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{region.name}</h3>
                <p className="text-primary font-bold mb-2">{region.successCount}+ Success Stories</p>
                <p className="text-gray-600 text-sm">
                  Top Institutions:
                  <br />
                  {region.topInstitutions.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
