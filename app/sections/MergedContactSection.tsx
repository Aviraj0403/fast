"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, MapPin, ChevronRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone must be at least 10 digits" }),
  courseInterest: z.string().min(1, { message: "Select a course" }),
  location: z.string().min(2, { message: "Enter your location" }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const MergedContactSection = () => {
  const [toast, setToast] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    const message = `📝 *New High-Value Enquiry!*
👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
🎓 *Course:* ${data.courseInterest}
📍 *Location:* ${data.location}
💬 *Message:* ${data.message || "No message"}
--
Ref: Web Apply 2026`.trim();

    const encoded = encodeURIComponent(message);
    const phoneNumber = "918581841853";
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");

    setToast("Redirecting to WhatsApp...");
    reset();
  };

  useEffect(() => {
    if (toast) {
      const timeout = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [toast]);

  return (
    <section className="py-16 bg-white relative overflow-hidden" id="contact">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#2563eb] text-[10px] font-black uppercase tracking-[0.3em] mb-4">
            Connect With Expertise
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[#0f172a] tracking-tighter">Reach Out <span className="text-[#2563eb]">Securely</span></h2>
          <p className="text-lg text-slate-500 mt-4 max-w-xl mx-auto font-medium">
            Contact the primary desk of Rajnish Singh for direct institutional guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">
          {/* Enquiry Form */}
          <div className="bg-slate-50 p-10 md:p-12 rounded-[48px] border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-black text-[#0f172a] mb-2">Priority Selection Form</h3>
              <p className="text-slate-400 mb-8 font-medium">Get a response within 60 minutes from our senior desk.</p>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#0f172a] ml-4">Full Name</label>
                    <input
                      {...register("name")}
                      className="w-full bg-white border border-slate-100 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-[#2563eb] transition-all font-bold text-sm"
                      placeholder="Enter Name"
                    />
                    {errors.name && <p className="text-red-500 text-[10px] font-bold ml-4">{errors.name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#0f172a] ml-4">Email ID</label>
                    <input
                      {...register("email")}
                      className="w-full bg-white border border-slate-100 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-[#2563eb] transition-all font-bold text-sm"
                      placeholder="Enter Email"
                    />
                    {errors.email && <p className="text-red-500 text-[10px] font-bold ml-4">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#0f172a] ml-4">Mobile Phone</label>
                    <input
                      {...register("phone")}
                      className="w-full bg-white border border-slate-100 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-[#2563eb] transition-all font-bold text-sm"
                      placeholder="WhatsApp Number"
                    />
                    {errors.phone && <p className="text-red-500 text-[10px] font-bold ml-4">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#0f172a] ml-4">Target Program</label>
                    <select
                      {...register("courseInterest")}
                      className="w-full bg-white border border-slate-100 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-[#2563eb] transition-all font-bold text-sm appearance-none"
                    >
                      <option value="">Choose Course</option>
                      <option value="engineering">B.Tech / Engineering</option>
                      <option value="medical">MBBS / Medical</option>
                      <option value="management">MBA / Management</option>
                      <option value="cse-ai-ml">CSE (AI-ML Focus)</option>
                      <option value="law">Law Pathways</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-[#0f172a] ml-4">Current Location</label>
                  <input
                    {...register("location")}
                    className="w-full bg-white border border-slate-100 px-6 py-4 rounded-2xl focus:ring-2 focus:ring-[#2563eb] transition-all font-bold text-sm"
                    placeholder="City / State"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0f172a] hover:bg-[#2563eb] text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group"
                >
                  START WHATSAPP COUNSELLING <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 flex flex-col items-center justify-center text-center group hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl mb-6 shadow-lg shadow-blue-500/20">
                  <Phone className="w-6 h-6" />
                </div>
                <h4 className="text-[#0f172a] font-black text-lg mb-2">Call Direct</h4>
                <a href="tel:+918581841853" className="text-sm font-black text-[#2563eb] hover:underline">+91 85818 41853</a>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Rajnish Singh (Desk)</p>
              </div>

              <div className="bg-[#0f172a] p-8 rounded-[40px] flex flex-col items-center justify-center text-center group shadow-2xl">
                <div className="w-14 h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center text-xl mb-6 backdrop-blur-md border border-white/10">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="text-white font-black text-lg mb-2">Email Support</h4>
                <a href="mailto:info@fastadmission.com" className="text-sm font-bold text-white/70 hover:text-white">info@fastadmission.com</a>
              </div>

              <div className="col-span-1 sm:col-span-2 bg-[#2563eb] p-10 rounded-[40px] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
                  <h4 className="text-2xl font-black mb-4 flex items-center gap-3">
                    <MapPin className="w-6 h-6" /> Our Presence
                  </h4>
                  <p className="text-white/80 font-medium leading-relaxed mb-6">
                    Admission Expert (FAST) - Head Office Patna. Serving students across Bihar and PAN India with premier institutional tie-ups.
                  </p>
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Patna HQ</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Delhi Desk</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Bangalore Desk</span>
                  </div>
              </div>
          </div>
        </div>

        {/* Leadership - Redesigned to Hero-style cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {[
            {
              name: "Rajnish Singh",
              title: "Founder & Chief Advisor",
              phone: "+91 85818 41853",
              img: "/image/contact.jpeg",
              desc: "Providing elite tactical guidance for students aiming for elite technical and medical institutions. Your primary contact for 2026 admissions."
            },
            {
              name: "Rahul Singh",
              title: "Operations Director",
              phone: "+91 62020 00340",
              img: "/image/contact.jpeg",
              desc: "Ensuring smooth operational flow and university liaison for all our registered candidates."
            },
          ].map((leader, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center gap-10 p-10 bg-white border border-slate-100 rounded-[56px] hover:shadow-2xl transition-all duration-700">
               <div className="w-32 h-32 shrink-0 rounded-[32px] overflow-hidden border-4 border-slate-50 shadow-xl">
                  <Image src={leader.img} alt={leader.name} width={128} height={128} className="object-cover w-full h-full" unoptimized />
               </div>
               <div className="text-center md:text-left">
                  <p className="text-[10px] font-black text-[#2563eb] uppercase tracking-[0.3em] mb-2">{leader.title}</p>
                  <h4 className="text-2xl font-black text-[#0f172a] mb-4">{leader.name}</h4>
                  <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed italic">&quot;{leader.desc}&quot;</p>
                  <a href={`tel:${leader.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 font-black text-xs text-[#0f172a] border-b-2 border-[#2563eb] pb-1 hover:text-[#2563eb] transition-colors">
                    CONNECT DIRECTLY
                  </a>
               </div>
            </div>
          ))}
        </div>
        
        {toast && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-[#0f172a] text-white px-8 py-4 rounded-full shadow-2xl z-[100] font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             {toast}
          </div>
        )}
      </div>
    </section>
  );
};

export default MergedContactSection;
