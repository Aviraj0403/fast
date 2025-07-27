"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Phone, Mail, Clock } from "lucide-react";
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
    <section className="py-20 bg-white" id="contact">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Get in Touch</h2>
          <p className="text-lg text-gray-600 mt-2">
            Fill the form or reach out to us directly
          </p>
        </div>

        {/* Enquiry + Contact Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Enquiry Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-blue-50 shadow-md rounded-lg p-6 space-y-6"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Enquire Now
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Full Name</label>
                <input
                  {...register("name")}
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  {...register("email")}
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 font-medium">Phone</label>
                <input
                  {...register("phone")}
                  className="w-full border px-4 py-2 rounded-md"
                  placeholder="Phone Number"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block mb-1 font-medium">Interested In</label>
                <select
                  {...register("courseInterest")}
                  className="w-full border px-4 py-2 rounded-md"
                >
                  <option value="">Select a course</option>
                  <option value="engineering">Engineering</option>
                  <option value="medical">Medical</option>
                  <option value="law">Law</option>
                  <option value="management">Management</option>
                  <option value="abroad">Study Abroad</option>
                  <option value="other">Other</option>
                </select>
                {errors.courseInterest && <p className="text-red-500 text-sm">{errors.courseInterest.message}</p>}
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Location</label>
              <input
                {...register("location")}
                className="w-full border px-4 py-2 rounded-md"
                placeholder="City/State"
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium">Message (Optional)</label>
              <textarea
                {...register("message")}
                className="w-full border px-4 py-2 rounded-md min-h-[100px]"
                placeholder="Any specific query?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-md flex justify-center items-center gap-2 hover:bg-blue-700 transition"
            >
              Submit Enquiry <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Contact Info */}
          <div className="grid grid-cols-1 gap-8">
            <article className="p-6 bg-white border rounded-lg shadow-sm text-center">
              <div className="text-blue-600 mb-2">
                <Phone className="mx-auto" />
              </div>
              <h4 className="text-xl font-semibold">Call Us</h4>
              <p className="text-gray-600 mb-2">We’re available for all your queries</p>
              <p className="font-medium">
                <a href="tel:+918581841853" className="text-blue-600 hover:underline">+91 85818 41853</a>
              </p>
              <p className="font-medium">
                <a href="tel:+917079005999" className="text-blue-600 hover:underline">+91 70790 05999</a>
              </p>
            </article>

            <article className="p-6 bg-white border rounded-lg shadow-sm text-center">
              <div className="text-blue-600 mb-2">
                <Mail className="mx-auto" />
              </div>
              <h4 className="text-xl font-semibold">Email Us</h4>
              <p className="text-gray-600 mb-2">Send us a message anytime</p>
              <p className="font-medium">
                <a href="mailto:info@fastadmission.com" className="text-blue-600 hover:underline">info@fastadmission.com</a>
              </p>
              <p className="font-medium">
                <a href="mailto:counseling@fastadmission.com" className="text-blue-600 hover:underline">counseling@fastadmission.com</a>
              </p>
            </article>

            <article className="p-6 bg-white border rounded-lg shadow-sm text-center">
              <div className="text-blue-600 mb-2">
                <Clock className="mx-auto" />
              </div>
              <h4 className="text-xl font-semibold">Office Hours</h4>
              <p className="text-gray-600">Mon–Sat: 10am – 7pm</p>
              <p className="text-gray-600">Sunday: By appointment</p>
            </article>
          </div>
        </div>

        {/* Leadership Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800">Our Leadership Team</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              name: "Rajnish Singh",
              title: "Founder",
              phone: "+91 85818 41853",
              img: "https://images.unsplash.com/photo-1472289065668-ce650ac443d2",
              desc:
                "With over a decade of experience in educational counseling, Rajnish has helped thousands of students achieve their academic dreams.",
            },
            {
              name: "Rahul Singh",
              title: "Director",
              phone: "+91 70790 05999",
              img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
              desc:
                "Rahul specializes in strategic partnerships with educational institutions, ensuring our students have access to the best opportunities.",
            },
          ].map((leader, i) => (
            <article key={i} className="p-6 bg-white border rounded-lg shadow-sm text-center">
              <div className="w-24 h-24 rounded-full mx-auto overflow-hidden mb-4">
                <Image
                  src={leader.img}
                  alt={leader.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
              <h4 className="text-xl font-semibold">{leader.name}</h4>
              <p className="text-blue-600 font-medium">{leader.title}</p>
              <p className="text-gray-600 mb-2">{leader.desc}</p>
              <a href={`tel:${leader.phone.replace(/\s+/g, "")}`} className="text-blue-600 hover:underline">
                <Phone className="inline-block w-4 h-4 mr-1" />
                {leader.phone}
              </a>
            </article>
          ))}
        </div>

        {/* Toast Message */}
        {toast && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg animate-fade-in-out">
            {toast}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in-out {
          0% { opacity: 0; transform: translateY(20px); }
          10%, 90% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(20px); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 3s ease forwards;
        }
      `}</style>
    </section>
  );
};

export default MergedContactSection;
