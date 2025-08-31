import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square, Star, Eye } from "lucide-react";
import { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const formatPrice = (price: number, type: string) => {
    if (type === "rent") {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getImageSrc = (imagePath: string) => {
    // Convert the data path to actual import
    const imageName = imagePath.split('/').pop();
    switch (imageName) {
      case 'property-1.jpg':
        return '/src/assets/property-1.jpg';
      case 'property-2.jpg':
        return '/src/assets/property-2.jpg';
      case 'property-3.jpg':
        return '/src/assets/property-3.jpg';
      case 'property-4.jpg':
        return '/src/assets/property-4.jpg';
      case 'property-5.jpg':
        return '/src/assets/property-5.jpg';
      case 'property-6.jpg':
        return '/src/assets/property-6.jpg';
      default:
        return imagePath;
    }
  };

  return (
    <Card className={`overflow-hidden hover-scale ${property.featured ? 'property-card-featured' : 'property-card'}`}>
      <div className="relative">
        <img
          src={getImageSrc(property.images[0])}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge 
            variant={property.type === "rent" ? "secondary" : "default"}
            className={property.type === "rent" ? "bg-property-rent text-white" : "bg-property-sale text-white"}
          >
            {property.type === "rent" ? "For Rent" : "For Sale"}
          </Badge>
          {property.featured && (
            <Badge className="bg-property-featured text-white">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            {property.category === "residential" ? "Residential" : "Commercial"}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-1">
              {property.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {property.description}
            </p>
          </div>

          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{property.location}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            {property.category === "residential" && (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-1" />
                  <span>{property.bedrooms} bed</span>
                </div>
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-1" />
                  <span>{property.bathrooms} bath</span>
                </div>
              </div>
            )}
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span>{property.area.toLocaleString()} sq ft</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-2xl font-bold text-primary">
              {formatPrice(property.price, property.type)}
            </div>
            <Button asChild className="gradient-primary">
              <Link to={`/property/${property.id}`} className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;