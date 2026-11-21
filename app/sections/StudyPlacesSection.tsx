"use client";
import React from "react";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { waLink } from "@/lib/site";

const featuredPlaces = [
  { name: "Delhi NCR", image: "/image/delhi-city.jpg", count: "150+ colleges" },
  { name: "Mumbai", image: "/image/mumbai-city.jpg", count: "120+ colleges" },
  { name: "Bangalore", image: "/image/bangalore-city.jpg", count: "180+ colleges" },
  { name: "Pune", image: "/image/pune-city.jpg", count: "90+ colleges" },
  { name: "Patna", image: "/image/patna.jpeg", count: "60+ colleges" },
  { name: "Lucknow", image: "/image/lucknow-city.jpg", count: "80+ colleges" },
];

const allPlaces = [
  { name: "Ghaziabad", id: 2 },
  { name: "Noida", id: 3 },
  { name: "Greater Noida", id: 5 },
  { name: "Gurugram", id: 6 },
  { name: "Faridabad", id: 7 },
  { name: "Meerut", id: 8 },
  { name: "Nashik", id: 11 },
  { name: "Nagpur", id: 12 },
  { name: "Thane", id: 13 },
  { name: "Aurangabad", id: 14 },
  { name: "Jalgaon", id: 15 },
  { name: "Ahmedabad", id: 16 },
  { name: "Rajkot", id: 17 },
  { name: "Surat", id: 18 },
  { name: "Vadodara", id: 19 },
  { name: "Indore", id: 20 },
  { name: "Bhopal", id: 21 },
  { name: "Gwalior", id: 22 },
  { name: "Jabalpur", id: 23 },
  { name: "Ujjain", id: 24 },
  { name: "Jaipur", id: 25 },
  { name: "Jodhpur", id: 26 },
  { name: "Udaipur", id: 27 },
  { name: "Kota", id: 28 },
  { name: "Ajmer", id: 29 },
  { name: "Chandigarh", id: 30 },
  { name: "Kanpur", id: 32 },
  { name: "Allahabad", id: 33 },
  { name: "Varanasi", id: 34 },
  { name: "Agra", id: 35 },
  { name: "Aligarh", id: 36 },
  { name: "Bareilly", id: 37 },
  { name: "Gorakhpur", id: 38 },
  { name: "Moradabad", id: 39 },
  { name: "Saharanpur", id: 40 },
  { name: "Amritsar", id: 41 },
  { name: "Ludhiana", id: 42 },
  { name: "Jalandhar", id: 43 },
  { name: "Patiala", id: 44 },
  { name: "Bathinda", id: 45 },
  { name: "Kolkata", id: 46 },
  { name: "Srinagar", id: 47 },
  { name: "Jammu", id: 48 },
  { name: "Shimla", id: 50 },
  { name: "Rohtak", id: 51 },
  { name: "Panipat", id: 52 },
  { name: "Karnal", id: 53 },
  { name: "Bhiwani", id: 54 },
  { name: "Ranchi", id: 55 },
  { name: "Dehradun", id: 56 },
  { name: "Haridwar", id: 57 },
  { name: "Haldwani", id: 58 },
  { name: "Roorkee", id: 59 },
  { name: "Jhansi", id: 60 },
  { name: "Muzaffarpur", id: 61 },
  { name: "Bhagalpur", id: 62 },
  { name: "Gaya", id: 63 },
];

const apply = (place: string) => waLink(`I am looking for colleges in ${place} - FastAdmission`);

const StudyPlacesSection = () => (
  <section className="section bg-white">
    <div className="container-x">
      <SectionHeading eyebrow="Where to study" title="Find your campus in India's top education cities" description="We work with colleges in every major hub. Tell us a city and we will shortlist the best options for your profile." />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {featuredPlaces.map((place) => (
          <a
            key={place.name}
            href={apply(place.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-brand-900 shadow-[var(--shadow-card)]"
          >
            <Image src={place.image} alt={`${place.name} campus city`} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
              <div>
                <p className="text-xs font-medium text-brand-200">{place.count}</p>
                <h3 className="mt-0.5 text-2xl font-bold !text-white">{place.name}</h3>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors group-hover:bg-brand-500">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </a>
        ))}
      </div>

      <div className="card mt-10 p-6 sm:p-10">
        <h3 className="flex items-center gap-2.5 text-lg font-semibold">
          <MapPin className="h-5 w-5 text-brand-600" /> More cities we cover
        </h3>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {allPlaces.map((place) => (
            <li key={place.id}>
              <a href={apply(place.name)} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border border-line bg-canvas px-3.5 py-1.5 text-sm text-body transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700">
                {place.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-muted">Do not see your city? We guide students for colleges across India.</p>
          <a href={apply("All India")} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
            Ask about any city
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default StudyPlacesSection;
