"use client";
import React from "react";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import Link from "next/link";
import { waLink } from "@/lib/site";
import { cities } from "../data/cities";

const featuredPlaces = [
  { name: "Delhi NCR", slug: "delhi-ncr", image: "/image/delhi-city.jpg" },
  { name: "Mumbai", slug: "mumbai", image: "/image/mumbai-city.jpg" },
  { name: "Bangalore", slug: "bangalore", image: "/image/bangalore-city.jpg" },
  { name: "Pune", slug: "pune", image: "/image/pune-city.jpg" },
  { name: "Patna", slug: "patna", image: "/image/patna.jpeg" },
  { name: "Lucknow", slug: "lucknow", image: "/image/lucknow-city.jpg" },
];
const featuredSlugs = new Set(featuredPlaces.map((p) => p.slug));
const otherCities = cities.filter((c) => !featuredSlugs.has(c.slug));


const apply = (place: string) => waLink(`I am looking for colleges in ${place} - FastAdmission`);

const StudyPlacesSection = () => (
  <section className="section bg-white">
    <div className="container-x">
      <SectionHeading eyebrow="Where to study" title="Find your campus in India's top education cities" description="We work with colleges in every major hub. Tell us a city and we will shortlist the best options for your profile." />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {featuredPlaces.map((place) => (
          <Link
            key={place.name}
            href={`/admission/${place.slug}`}
            className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-brand-900 shadow-[var(--shadow-card)]"
          >
            <Image src={place.image} alt={`${place.name} campus city`} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
              <div>
                <p className="text-xs font-medium text-brand-200">Admission guidance</p>
                <h3 className="mt-0.5 text-2xl font-bold !text-white">{place.name}</h3>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors group-hover:bg-brand-500">
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="card mt-10 p-6 sm:p-10">
        <h3 className="flex items-center gap-2.5 text-lg font-semibold">
          <MapPin className="h-5 w-5 text-brand-600" /> Admission guidance in more cities
        </h3>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {otherCities.map((place) => (
            <li key={place.slug}>
              <Link href={`/admission/${place.slug}`} prefetch={false} className="inline-block rounded-full border border-line bg-canvas px-3.5 py-1.5 text-sm text-body transition-colors hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700">
                {place.name}
              </Link>
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
