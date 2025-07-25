import { ServiceCard } from "@/components/ui/ServiceCard";
import { Book, Stethoscope, Scale, Building, GraduationCap, Globe } from "lucide-react";

export const Services = () => {
  const services = [
    {
      title: "Engineering Counseling",
      description: "Get expert guidance for admissions to top engineering colleges across India. We help you navigate JEE, BITSAT, and state-level entrance exams.",
      icon: <Book className="h-8 w-8 text-primary" />,
      aos: "fade-up",
      delay: 0
    },
    {
      title: "Medical Counseling",
      description: "Secure your spot in prestigious medical colleges. Our specialists guide you through NEET preparations, counseling sessions, and admission procedures.",
      icon: <Stethoscope className="h-8 w-8 text-primary" />,
      aos: "fade-up",
      delay: 100
    },
    {
      title: "Law Counseling",
      description: "Navigate CLAT, AILET, and other law entrance exams with our expert guidance. We'll help you secure admission in top law schools across the country.",
      icon: <Scale className="h-8 w-8 text-primary" />,
      aos: "fade-up",
      delay: 200
    },
    {
      title: "Management Counseling",
      description: "Get personalized guidance for MBA admissions, CAT/MAT preparations, and choosing the right specialization for your career goals.",
      icon: <Building className="h-8 w-8 text-primary" />,
      aos: "fade-up",
      delay: 300
    },
    {
      title: "Career Guidance",
      description: "Confused about career choices? Our expert counselors will help you identify your strengths and choose the right path for your future.",
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      aos: "fade-up",
      delay: 400
    },
    {
      title: "Study Abroad Programs",
      description: "Explore international education opportunities with our comprehensive guidance on university selection, visa procedures, and scholarships.",
      icon: <Globe className="h-8 w-8 text-primary" />,
      aos: "fade-up",
      delay: 500
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            data-aos="fade-up"
          >
            Our Services
          </h2>
          <p 
            className="text-lg text-gray-600"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Comprehensive admission counseling services to shape your future
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard 
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
              aos={service.aos}
              delay={service.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
