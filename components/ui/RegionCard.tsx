import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface RegionCardProps {
  name: string;
  successCount: number;
  topInstitutions: string[];
  image: string;
  delay?: number;
}

export const RegionCard = ({ name, successCount, topInstitutions, image, delay = 0 }: RegionCardProps) => {
  return (
    <Card 
      className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300"
      data-aos="zoom-in"
      data-aos-delay={delay}
    >
      <div className="relative h-48">
        <img 
          src={image} 
          alt={`Students from ${name}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white flex items-center">
            <MapPin className="h-5 w-5 mr-1" /> {name}
          </h3>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <Badge className="bg-primary text-white hover:bg-primary/90">
            {successCount}+ Students
          </Badge>
          <span className="text-sm text-gray-500">Top Placements</span>
        </div>

        <div className="space-y-2">
          {topInstitutions.map((institution, index) => (
            <div key={index} className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
              <span className="text-gray-700">{institution}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
