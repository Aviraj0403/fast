import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  college: string;
  image: string;
  region: string;
  testimonial: string;
}

export const TestimonialCard = ({ name, college, image, region, testimonial }: TestimonialCardProps) => {
  return (
    <Card className="min-w-[300px] md:min-w-[360px] border-none shadow-md hover:shadow-xl transition-all duration-300 flex-shrink-0">
      <CardContent className="p-6 relative">
        <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
        
        <div className="flex items-center gap-4 mb-4">
          <Avatar className="h-14 w-14 border-2 border-primary/20">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
            <p className="text-gray-600 text-sm">{college}</p>
            <Badge variant="outline" className="mt-1 bg-blue-50">
              {region}
            </Badge>
          </div>
        </div>
        
        <p className="text-gray-700 italic">
          "{testimonial}"
        </p>
      </CardContent>
    </Card>
  );
};
