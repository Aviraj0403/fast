import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  aos?: string;
  delay?: number;
}

export const ServiceCard = ({ title, description, icon, aos, delay }: ServiceCardProps) => {
  return (
    <Card 
      className="border-none shadow-md hover:shadow-xl transition-all duration-300 group overflow-hidden"
      data-aos={aos}
      data-aos-delay={delay}
    >
      <CardContent className="p-6 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full transform transition-transform group-hover:scale-150"></div>
        
        <div className="bg-blue-50 rounded-xl p-4 inline-flex mb-6 relative z-10">
          {icon}
        </div>
        
        <h3 className="text-xl font-semibold text-gray-800 mb-3 relative z-10">{title}</h3>
        
        <p className="text-gray-600 mb-6 relative z-10">{description}</p>
        
        <button className="text-primary font-medium flex items-center group-hover:underline relative z-10">
          Learn more <ChevronRight className="ml-1 h-4 w-4 group-hover:ml-2 transition-all" />
        </button>
      </CardContent>
    </Card>
  );
};
