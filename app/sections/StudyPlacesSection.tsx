import { ArrowRight } from "lucide-react";

const StudyPlacesSection = () => {
    const places = [
      { name: "Patna", id: 1 },
      { name: "Ghaziabad", id: 2 },
      { name: "Noida", id: 3 },
      { name: "Delhi", id: 4 },
      { name: "Greater Noida", id: 5 },
      { name: "Gurugram", id: 6 },
      { name: "Faridabad", id: 7 },
      { name: "Meerut", id: 8 },
      { name: "Mumbai", id: 9 },
      { name: "Pune", id: 10 },
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
      { name: "Lucknow", id: 31 },
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
  
    return (
      <section className="w-full bg-[#0f172a] py-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4 block">National Presence</span>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tighter">
                Direct Guidance In <span className="text-blue-500">60+ Cities</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm font-medium italic max-w-sm mb-2 border-l-2 border-blue-500/30 pl-4">
              Our specialists are strategically located across PAN India to provide localized university mapping.
            </p>
          </div>
  
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6">
            {places.map((place) => (
              <div
                key={place.id}
                className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500/50 group-hover:bg-blue-400 group-hover:scale-125 transition-all"></div>
                <span className="text-slate-400 group-hover:text-white text-xs font-black uppercase tracking-widest transition-colors">
                  {place.name}
                </span>
                <ArrowRight className="w-3 h-3 text-white/0 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default StudyPlacesSection;
