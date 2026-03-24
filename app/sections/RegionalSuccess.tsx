"use client";
import Image from "next/image";

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
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-12" data-aos="fade-up">
           <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#2563eb] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            National Impact
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] mb-6 tracking-tighter">
            Regional <span className="text-[#2563eb]">Success Stories</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Our strategic influence spans across India, empowering students from every corner to reach the peak of academic excellence.
          </p>
        </div>

        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {regions.map((region, index) => (
            <div
              key={index}
              className="group bg-white rounded-[40px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={region.image + "?auto=format&fit=crop&w=400&q=80"}
                  alt={`${region.name} landscape`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/40 to-transparent"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black text-[#0f172a] mb-2">{region.name}</h3>
                <p className="text-[#2563eb] text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span> {region.successCount}+ Success Stories
                </p>
                <div className="pt-4 border-t border-slate-50">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Key Institutions</p>
                    <p className="text-slate-500 text-xs font-bold leading-relaxed">
                      {region.topInstitutions.join(", ")}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
