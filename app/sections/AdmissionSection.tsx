"use client";

import { useState } from "react";
import {
  FaUniversity,
  FaBuilding,
  FaBookOpen,
  FaClipboardCheck,
  FaPenFancy,
  FaBriefcase,
} from "react-icons/fa";
import { ChevronRight } from "lucide-react";

export const AdmissionSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `📝 *New High-Value Enquiry!*
👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone}
🎓 *Course:* ${formData.course}
--
Ref: Priority Admission 2026`.trim();
    
    window.open(`https://wa.me/918581841853?text=${encodeURIComponent(message)}`, "_blank");
  };

  const gridItems = [
    { label: "Colleges", icon: <FaBuilding />, color: "bg-blue-50 text-blue-600" },
    { label: "University", icon: <FaUniversity />, color: "bg-purple-50 text-purple-600" },
    { label: "Courses", icon: <FaBookOpen />, color: "bg-emerald-50 text-emerald-600" },
    { label: "Admission", icon: <FaClipboardCheck />, color: "bg-orange-50 text-orange-600" },
    { label: "Exam", icon: <FaPenFancy />, color: "bg-pink-50 text-pink-600" },
    { label: "Placements", icon: <FaBriefcase />, color: "bg-cyan-50 text-cyan-600" },
  ];

  return (
    <section id="admission" className="bg-white py-20 px-6 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-50/50 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* LEFT INFO */}
        <div className="flex-1 space-y-10">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#2563eb] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
              Your Journey Starts Here
            </span>
            <h3 className="text-4xl md:text-6xl font-black text-[#0f172a] leading-tight mb-8 tracking-tighter">
              Navigate the Future of <br/> <span className="text-[#2563eb]">Elite Education</span>
            </h3>
            <p className="text-lg text-slate-500 max-w-xl leading-relaxed font-medium">
              We provide expert consultancy for the most prestigious universities and professional courses in India. Secure your seat through simplified, high-priority admission processes.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {gridItems.map((item, i) => (
              <div key={i} className="flex items-center gap-5 group">
                <div className={`p-4 rounded-2xl text-2xl transition-all duration-500 group-hover:scale-110 shadow-lg ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-black text-[#0f172a] text-lg">{item.label}</h4>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Expert Guidance</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="flex-1 w-full max-w-xl">
          <div className="bg-[#0f172a] p-10 md:p-14 rounded-[56px] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563eb]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#2563eb]/30 transition-colors"></div>
            
            <div className="relative z-10">
              <h4 className="text-white text-3xl font-black mb-2 tracking-tight transition-colors">Register for Seating</h4>
              <p className="text-slate-400 mb-10 font-medium">Get a response within 60 minutes from our senior desk specialists.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Student Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter Name"
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-[#2563eb] focus:bg-white/10 transition-all font-bold text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Email ID</label>
                    <input
                      required
                      type="email"
                      placeholder="Email Address"
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-[#2563eb] focus:bg-white/10 transition-all font-bold text-sm"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">WhatsApp No.</label>
                    <input
                      required
                      type="tel"
                      placeholder="Phone Number"
                      className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-[#2563eb] focus:bg-white/10 transition-all font-bold text-sm"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Selected Course Goal</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g., Engineering, Medical, Law"
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-white outline-none focus:border-[#2563eb] focus:bg-white/10 transition-all font-bold text-sm"
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-2xl shadow-blue-500/20 flex items-center justify-center gap-3 mt-8"
                >
                  START WHATSAPP COUNSELLING
                  <ChevronRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
