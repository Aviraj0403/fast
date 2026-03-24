"use client";
import React from "react";
import Image from "next/image";
import { MapPin, ArrowRight, Sparkles } from "lucide-react";

const StudyPlacesSection = () => {
    const featuredPlaces = [
        { 
            name: "Delhi NCR", 
            id: 4, 
            image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&q=80&w=800",
            count: "150+ Colleges"
        },
        { 
            name: "Mumbai", 
            id: 9, 
            image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?auto=format&fit=crop&q=80&w=800",
            count: "120+ Colleges"
        },
        { 
            name: "Bangalore", 
            id: 30, 
            image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=800",
            count: "180+ Colleges"
        },
        { 
            name: "Pune", 
            id: 10, 
            image: "https://images.unsplash.com/photo-1566375638496-e10c7149a46a?auto=format&fit=crop&q=80&w=800",
            count: "90+ Colleges"
        },
        { 
            name: "Patna", 
            id: 1, 
            image: "https://images.unsplash.com/photo-1624314138470-5a2f24623f10?auto=format&fit=crop&q=80&w=800",
            count: "60+ Colleges"
        },
        { 
            name: "Lucknow", 
            id: 31, 
            image: "https://images.unsplash.com/photo-1588506195304-77be5c23e20a?auto=format&fit=crop&q=80&w=800",
            count: "80+ Colleges"
        },
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
    { name: "Darbhanga", id: 64 },
  ];

  const handleApply = (place: string) => {
    window.open(`https://wa.me/918581841853?text=I%20am%20looking%20for%20colleges%20in%20${encodeURIComponent(place)}%20-%20FastAdmission`, "_blank");
  };

  return (
    <section className="bg-slate-50 py-16 px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-10">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#2563eb] text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                <Sparkles className="w-3 h-3" /> Peak Regional Network
              </span>
              <h2 className="text-4xl md:text-7xl font-black text-[#0f172a] tracking-tighter leading-[0.95] mb-6">
                Discover Your <span className="text-[#2563eb]">Dream Campus</span> In Top Cities
              </h2>
            </div>
            <p className="text-slate-500 font-medium max-w-sm border-l-4 border-blue-500 pl-6 text-lg italic">
              "Connecting elite talent with premier educational hubs across the Indian subcontinent."
            </p>
        </div>

        {/* Featured Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredPlaces.map((place) => (
                <button
                    key={place.id}
                    onClick={() => handleApply(place.name)}
                    className="group relative h-[450px] rounded-[48px] overflow-hidden shadow-2xl transition-all duration-700 hover:-translate-y-4"
                >
                    <Image
                        src={place.image}
                        alt={place.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    
                    <div className="absolute bottom-0 left-0 w-full p-10 text-left">
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-3 block">{place.count}</span>
                        <h4 className="text-4xl font-black text-white mb-6 tracking-tighter">{place.name}</h4>
                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-white font-black text-[10px] uppercase tracking-widest">
                            APPLY FOR ADMISSION <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </button>
            ))}
        </div>

        {/* More Cities Grid */}
        <div className="bg-white rounded-[64px] p-12 md:p-20 shadow-xl border border-slate-100">
            <h3 className="text-xl font-black text-[#0f172a] mb-12 flex items-center gap-4">
                <MapPin className="text-[#2563eb] w-6 h-6" /> Explore 60+ Other Academic Hubs
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {allPlaces.map((place) => (
                <button
                  key={place.id}
                  onClick={() => handleApply(place.name)}
                  className="group flex flex-col items-start gap-1 p-2 rounded-2xl hover:bg-slate-50 transition-all text-left"
                >
                  <span className="text-xs font-black text-[#0f172a]/40 group-hover:text-[#2563eb] transition-colors uppercase tracking-widest">
                    {place.name}
                  </span>
                  <div className="w-0 group-hover:w-full h-[2px] bg-[#2563eb] transition-all duration-300"></div>
                </button>
              ))}
            </div>
            
            <div className="mt-12 pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Integrated Admission Workflow 2026</p>
                <button 
                    onClick={() => handleApply("All India")}
                    className="bg-[#0f172a] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#2563eb] transition-all shadow-2xl flex items-center gap-4"
                >
                    View All Regional Desks <MapPin className="w-4 h-4" />
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default StudyPlacesSection;
