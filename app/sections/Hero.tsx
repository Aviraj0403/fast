import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const Hero = () => {
  const scrollToEnquiry = () => {
    const element = document.getElementById("enquiry");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden"
    >
      {/* Overlay with partly transparent pattern */}
      <div 
        className="absolute inset-0 bg-blue-900 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <span className="block">Future Advice for</span>
            <span className="block">Successful Tomorrow</span>
          </h1>
          
          <p 
            className="text-xl text-white/90 mb-8"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Professional admission counseling for Engineering, Medical, Law, and more. 
            Guiding students to their dream colleges since 2015.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <Button 
              onClick={scrollToEnquiry}
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
            >
              Enquire Now <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
              // className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              onClick={() => {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Learn More
            </Button>
          </div>
          
          <div 
            className="mt-12 text-white"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <p className="font-medium">Trusted by students across India</p>
            <div className="mt-2 flex items-center space-x-4">
              <div className="bg-blue-500/30 px-4 py-2 rounded-lg">
                <span className="text-lg font-semibold">1700+</span>
                <span className="ml-2">Students</span>
              </div>
              <div className="bg-blue-500/30 px-4 py-2 rounded-lg">
                <span className="text-lg font-semibold">600+</span>
                <span className="ml-2">Colleges</span>
              </div>
              <div className="bg-blue-500/30 px-4 py-2 rounded-lg">
                <span className="text-lg font-semibold">Since</span>
                <span className="ml-2">2015</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-full">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};
