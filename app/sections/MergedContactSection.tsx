"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Phone, Mail, Clock, MapPin, MessageCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
    const message = `
📝 *New Enquiry Received!*

👤 *Name:* ${data.name}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
🎓 *Course:* ${data.courseInterest}
📍 *Location:* ${data.location}
💬 *Message:* ${data.message || "No message"}
`.trim();

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
    <section className="py-24 bg-white relative" id="contact">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10 skew-x-12 origin-top transform translate-x-20"></div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-semibold text-sm mb-6">
            <MessageCircle className="w-4 h-4" />
            <span>We're Here to Help</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about your career? Fill out the form or reach out to us directly
            to start your journey towards success.
          </p>
        </div>

        {/* Enquiry + Contact Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white shadow-xl shadow-blue-900/5 rounded-3xl p-8 md:p-10 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Send className="w-6 h-6 text-blue-600" />
                Send Enquiry
              </h3>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Full Name</label>
                    <input
                      {...register("name")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50/50"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs font-medium">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input
                      {...register("email")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50/50"
                      placeholder="you@company.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs font-medium">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                    <input
                      {...register("phone")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50/50"
                      placeholder="+91 99999 99999"
                    />
                    {errors.phone && <p className="text-red-500 text-xs font-medium">{errors.phone.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Interested Course</label>
                    <select
                      {...register("courseInterest")}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50/50"
                    >
                      <option value="">Select a course</option>
                      <option value="engineering">Engineering</option>
                      <option value="medical">Medical</option>
                      <option value="law">Law</option>
                      <option value="management">Management</option>
                      <option value="abroad">Study Abroad</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.courseInterest && <p className="text-red-500 text-xs font-medium">{errors.courseInterest.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Location</label>
                  <input
                    {...register("location")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50/50"
                    placeholder="City, State"
                  />
                  {errors.location && <p className="text-red-500 text-xs font-medium">{errors.location.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Message (Optional)</label>
                  <textarea
                    {...register("message")}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-gray-50/50 min-h-[120px]"
                    placeholder="How can we help you?"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  Submit Enquiry <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Call Us</p>
                    <a href="tel:+918581841853" className="block text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">+91 85818 41853</a>
                    <a href="tel:+916202000340" className="block text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors">+91 62020 00340</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Email Us</p>
                    <a href="mailto:info@fastadmission.com" className="block text-gray-900 font-medium hover:text-blue-600 transition-colors">info@fastadmission.com</a>
                    <a href="mailto:counselling@fastadmission.com" className="block text-gray-900 font-medium hover:text-blue-600 transition-colors">counselling@fastadmission.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600 shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Office Hours</p>
                    <p className="text-gray-900 font-medium">Mon–Sat: 10am – 7pm</p>
                    <p className="text-gray-600 text-sm">Sunday: By appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Leadership Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">Leadership Team</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "Rajnish Singh",
                    title: "Founder",
                    phone: "+91 85818 41853",
                    img: "/image/contact.jpeg",
                  },
                  {
                    name: "Rahul Singh",
                    title: "Director",
                    phone: "+91 62020 00340",
                    img: "/image/contact.jpeg",
                  },
                ].map((leader, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-slate-100">
                      <Image
                        src={leader.img}
                        alt={leader.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{leader.name}</h4>
                      <p className="text-blue-600 text-xs font-semibold mb-1">{leader.title}</p>
                      <a href={`tel:${leader.phone.replace(/\s+/g, "")}`} className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        Call Now
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Toast Message */}
        {toast && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in-up z-50">
            <div className="bg-green-500 rounded-full p-1">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">{toast}</span>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translate(-50%, 20px); }
          100% { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default MergedContactSection;
