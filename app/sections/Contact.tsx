"use client";

import { Phone, Mail, Clock } from "lucide-react";
import Image from "next/image";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            data-aos="fade-up"
          >
            Contact Us
          </h2>
          <p
            className="text-lg text-gray-600"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Reach out to our team for any questions or to schedule a counseling session
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Call Us Card */}
          <article
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Call Us</h3>
            <p className="text-gray-600 mb-4">Our team is here to help you with your queries</p>
            <div className="space-y-2 text-gray-800 font-medium">
              <div>
                Founder:{" "}
                <a href="tel:+918581841853" className="text-blue-600 hover:underline">
                  +91 85818 41853
                </a>
              </div>
              <div>
                Director:{" "}
                <a href="tel:+917079005999" className="text-blue-600 hover:underline">
                  +91 70790 05999
                </a>
              </div>
            </div>
          </article>

          {/* Email Us Card */}
          <article
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Email Us</h3>
            <p className="text-gray-600 mb-4">Send us an email and we&apos;ll get back to you</p>
            <div className="space-y-2 text-gray-800 font-medium">
              <div>
                General Enquiries:{" "}
                <a href="mailto:info@fastadmission.com" className="text-blue-600 hover:underline">
                  info@fastadmission.com
                </a>
              </div>
              <div>
                Counseling Requests:{" "}
                <a href="mailto:counseling@fastadmission.com" className="text-blue-600 hover:underline">
                  counseling@fastadmission.com
                </a>
              </div>
            </div>
          </article>

          {/* Office Hours Card */}
          <article
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 flex flex-col items-center text-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Office Hours</h3>
            <p className="text-gray-600 mb-4">Visit us during our working hours</p>
            <div className="space-y-2 font-medium text-gray-800">
              <div>
                Monday to Saturday{" "}
                <span className="block text-gray-600 mt-1">10:00 AM - 7:00 PM</span>
              </div>
              <div>
                Sunday{" "}
                <span className="block text-gray-600 mt-1">By appointment only</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Our counselors are also available for online meetings
            </p>
          </article>
        </div>

        {/* Leadership Team */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3
            className="text-2xl font-bold text-gray-800 mb-8"
            data-aos="fade-up"
          >
            Our Leadership Team
          </h3>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {/* Rajnish Singh */}
            <article className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2"
                  alt="Rajnish Singh"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <h4 className="text-xl font-semibold">Rajnish Singh</h4>
              <p className="text-blue-600 font-medium mb-3">Founder</p>
              <p className="text-gray-600 text-center mb-4">
                With over a decade of experience in educational counseling, Rajnish has helped thousands of students achieve their academic dreams.
              </p>
              <a
                href="tel:+918581841853"
                className="text-blue-600 hover:underline flex items-center justify-center gap-1"
              >
                <Phone className="h-4 w-4" /> +91 85818 41853
              </a>
            </article>

            {/* Rahul Singh */}
            <article className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 bg-gray-200">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
                  alt="Rahul Singh"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </div>
              <h4 className="text-xl font-semibold">Rahul Singh</h4>
              <p className="text-blue-600 font-medium mb-3">Director</p>
              <p className="text-gray-600 text-center mb-4">
                Rahul specializes in strategic partnerships with educational institutions, ensuring our students have access to the best opportunities.
              </p>
              <a
                href="tel:+917079005999"
                className="text-blue-600 hover:underline flex items-center justify-center gap-1"
              >
                <Phone className="h-4 w-4" /> +91 70790 05999
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
