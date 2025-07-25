"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/app/hooks/use-toast";
import { Send } from "lucide-react";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits" }),
  courseInterest: z.string().min(1, { message: "Please select a course" }),
  location: z.string().min(2, { message: "Please enter your location" }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const EnquiryForm = () => {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormValues) => {
    const { name, email, phone, courseInterest, location, message } = data;

    const textMessage = `
📝 *New Enquiry Received from FastAdmissionPortal!*

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Phone:* ${phone}
🎓 *Interested In:* ${courseInterest}
📍 *Location:* ${location}
💬 *Message:* ${message || "No additional message."}
    `.trim();

    const encodedMessage = encodeURIComponent(textMessage);
    const whatsappNumber = "916200594193"; // your number with country code

    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank");

    toast({
      title: "Redirecting to WhatsApp...",
      description: "You’ll be redirected to WhatsApp to send your enquiry.",
    });

    reset();
  };

  return (
    <section id="enquiry" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Enquire Now</h2>
          <p className="text-lg text-gray-600 mt-2">
            Fill the form and our team will connect with you shortly.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                {...register("name")}
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                {...register("phone")}
                placeholder="Your phone number"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Interested In</label>
              <select
                {...register("courseInterest")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a course</option>
                <option value="engineering">Engineering</option>
                <option value="medical">Medical</option>
                <option value="law">Law</option>
                <option value="management">Management</option>
                <option value="abroad">Study Abroad</option>
                <option value="other">Other Courses</option>
              </select>
              {errors.courseInterest && <p className="text-red-500 text-sm mt-1">{errors.courseInterest.message}</p>}
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Your Location</label>
            <input
              type="text"
              {...register("location")}
              placeholder="City / State"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Message (Optional)</label>
            <textarea
              {...register("message")}
              placeholder="Any specific questions?"
              className="w-full border border-gray-300 rounded-md px-4 py-3 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-3 rounded-md hover:bg-primary/90 transition"
          >
            Submit Enquiry <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
};
