"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone must be at least 10 digits" }),
  courseInterest: z.string().min(1, { message: "Select a course" }),
  location: z.string().min(2, { message: "Enter your location" }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const EnquiryForm = () => {
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
    <section id="enquiry" className="py-20 bg-gradient-to-b from-blue-50 to-white relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Enquire Now</h2>
          <p className="text-lg text-gray-600 mt-2">Fill the form and we’ll contact you soon.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="Phone number"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Interested In</label>
              <select
                {...register("courseInterest")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <label className="block mb-1 font-medium text-gray-700">Location</label>
            <input
              type="text"
              {...register("location")}
              placeholder="City/State"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Message (Optional)</label>
            <textarea
              {...register("message")}
              placeholder="Any specific query?"
              className="w-full border border-gray-300 rounded-md px-4 py-2 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-md hover:bg-blue-700 transition"
          >
            Submit Enquiry <Send className="h-4 w-4" />
          </button>
        </form>

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
