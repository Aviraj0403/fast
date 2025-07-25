import { Link } from "wouter";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ArrowUp
} from "lucide-react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">FAST</h2>
            <p className="text-gray-300">
              Future Advice for Successful Tomorrow - Professional admission counseling since 2015, helping students achieve their dreams.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", id: "home" },
                { name: "About Us", id: "about" },
                { name: "Services", id: "services" },
                { name: "Success Stories", id: "success-stories" },
                { name: "Contact Us", id: "contact" },
                { name: "Enquire Now", id: "enquiry" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(link.id);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Our Services</h3>
            <ul className="space-y-2">
              {[
                "Engineering Counseling",
                "Medical Counseling",
                "Law Counseling",
                "Management Counseling",
                "Study Abroad Programs",
                "Career Guidance",
              ].map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300 hover:text-primary transition-colors">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <span className="text-gray-300">
                  FAST Headquarters, Educational Hub, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info@fastadmission.com" className="text-gray-300 hover:text-primary transition-colors">
                  info@fastadmission.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+918581841853" className="text-gray-300 hover:text-primary transition-colors">
                  +91 85818 41853
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+917079005999" className="text-gray-300 hover:text-primary transition-colors">
                  +91 70790 05999
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-gray-700" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} FAST. All rights reserved.
          </p>
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 bg-primary hover:bg-primary/80 text-white p-2 rounded-full transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
