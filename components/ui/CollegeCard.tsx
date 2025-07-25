import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CollegeCardProps {
  name: string;
  location: string;
  image: string;
  category: string;
}

export const CollegeCard = ({ name, location, image, category }: CollegeCardProps) => {
  return (
    <Card className="min-w-[250px] md:min-w-[300px] border-none shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0 overflow-hidden">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-primary hover:bg-primary/90">
          {category}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2">{name}</h3>
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{location}</span>
        </div>
      </CardContent>
    </Card>
  );
};
