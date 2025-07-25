
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <Card 
            className="shadow-md hover:shadow-lg transition-all border-none"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Call Us</h3>
              <p className="text-gray-600 mb-4">Our team is here to help you with your queries</p>
              <div className="space-y-2">
                <p className="font-medium">
                  Founder: Rajnish Singh
                  <a 
                    href="tel:+918581841853" 
                    className="block text-primary hover:underline mt-1"
                  >
                    +91 85818 41853
                  </a>
                </p>
                <p className="font-medium">
                  Director: Rahul Singh
                  <a 
                    href="tel:+917079005999" 
                    className="block text-primary hover:underline mt-1"
                  >
                    +91 70790 05999
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="shadow-md hover:shadow-lg transition-all border-none"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Email Us</h3>
              <p className="text-gray-600 mb-4">Send us an email and we'll get back to you</p>
              <div className="space-y-2">
                <p className="font-medium">
                  General Enquiries
                  <a 
                    href="mailto:info@fastadmission.com" 
                    className="block text-primary hover:underline mt-1"
                  >
                    info@fastadmission.com
                  </a>
                </p>
                <p className="font-medium">
                  Counseling Requests
                  <a 
                    href="mailto:counseling@fastadmission.com" 
                    className="block text-primary hover:underline mt-1"
                  >
                    counseling@fastadmission.com
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="shadow-md hover:shadow-lg transition-all border-none"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="h-14 w-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Office Hours</h3>
              <p className="text-gray-600 mb-4">Visit us during our working hours</p>
              <div className="space-y-2">
                <p className="font-medium">
                  Monday to Saturday
                  <span className="block text-gray-600 mt-1">10:00 AM - 7:00 PM</span>
                </p>
                <p className="font-medium">
                  Sunday
                  <span className="block text-gray-600 mt-1">By appointment only</span>
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  Our counselors are also available for online meetings
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
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
            <Card className="shadow-md border-none">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2"
                    alt="Rajnish Singh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-semibold">Rajnish Singh</h4>
                <p className="text-primary font-medium mb-3">Founder</p>
                <p className="text-gray-600 text-center mb-4">
                  With over a decade of experience in educational counseling, Rajnish has helped thousands of students achieve their academic dreams.
                </p>
                <a 
                  href="tel:+918581841853" 
                  className="text-primary hover:underline flex items-center"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  +91 85818 41853
                </a>
              </CardContent>
            </Card>
            
            <Card className="shadow-md border-none">
              <CardContent className="p-6 flex flex-col items-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mb-4 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644"
                    alt="Rahul Singh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-xl font-semibold">Rahul Singh</h4>
                <p className="text-primary font-medium mb-3">Director</p>
                <p className="text-gray-600 text-center mb-4">
                  Rahul specializes in strategic partnerships with educational institutions, ensuring our students have access to the best opportunities.
                </p>
                <a 
                  href="tel:+917079005999" 
                  className="text-primary hover:underline flex items-center"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  +91 70790 05999
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
