import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEnquiryClick = () => {
    scrollToSection("enquiry");
    toast({
      title: "Ready to help!",
      description: "Please fill the form and we'll get back to you soon.",
    });
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <h1 className={`text-2xl md:text-3xl font-bold text-primary ${!scrolled && !isMobile ? 'text-white' : 'text-primary'}`}>
              FAST
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {[
                { name: "Home", id: "home" },
                { name: "About", id: "about" },
                { name: "Services", id: "services" },
                { name: "Success Stories", id: "success-stories" },
                { name: "Contact", id: "contact" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`font-medium hover:text-primary transition-colors ${
                      !scrolled ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
            <Button onClick={handleEnquiryClick} className="bg-primary hover:bg-primary/90 text-white">
              Enquire Now <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-800"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className={`h-6 w-6 ${!scrolled ? 'text-white' : 'text-gray-800'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${!scrolled ? 'text-white' : 'text-gray-800'}`} />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-4 p-4 absolute left-4 right-4 z-50 animate-in slide-in-from-top-5 duration-300">
            <ul className="space-y-4">
              {[
                { name: "Home", id: "home" },
                { name: "About", id: "about" },
                { name: "Services", id: "services" },
                { name: "Success Stories", id: "success-stories" },
                { name: "Contact", id: "contact" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-800 hover:text-primary w-full text-left py-2 transition-colors"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
              <li>
                <Button 
                  onClick={handleEnquiryClick} 
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  Enquire Now <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
