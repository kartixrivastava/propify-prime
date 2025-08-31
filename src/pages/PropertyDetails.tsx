import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Star,
  Phone, 
  Mail, 
  Calendar,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { Property } from "@/types/property";
import properties from "@/data/properties.json";

const PropertyDetails = () => {
  const { id } = useParams();
  const property = (properties as Property[]).find(p => p.id === parseInt(id || "0"));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h2 className="text-2xl font-bold text-foreground mb-4">Property Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The property you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/properties">Back to Properties</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatPrice = (price: number, type: string) => {
    if (type === "rent") {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  const getImageSrc = (imagePath: string) => {
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/properties" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Properties</span>
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Carousel */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={getImageSrc(property.images[currentImageIndex])}
                  alt={property.title}
                  className="w-full h-96 object-cover"
                />
                
                {property.images.length > 1 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                      onClick={nextImage}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </>
                )}

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

                <div className="absolute top-4 right-4 flex gap-2">
                  <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Image Indicators */}
              {property.images.length > 1 && (
                <div className="flex justify-center space-x-2 p-4">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              )}
            </Card>

            {/* Property Info */}
            <Card>
              <CardContent className="p-6 space-y-6">
                {/* Title and Price */}
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                      {property.title}
                    </h1>
                    <div className="flex items-center text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      {formatPrice(property.price, property.type)}
                    </div>
                    <Badge variant="outline">
                      {property.category === "residential" ? "Residential" : "Commercial"}
                    </Badge>
                  </div>
                </div>

                {/* Property Stats */}
                <div className="flex items-center space-x-6 text-muted-foreground">
                  {property.category === "residential" && (
                    <>
                      <div className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        <span>{property.bedrooms} Bedrooms</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        <span>{property.bathrooms} Bathrooms</span>
                      </div>
                    </>
                  )}
                  <div className="flex items-center">
                    <Square className="w-4 h-4 mr-1" />
                    <span>{property.area.toLocaleString()} sq ft</span>
                  </div>
                </div>

                <Separator />

                {/* Description */}
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-3">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Contact Owner</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-foreground">{property.owner.name}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>{property.owner.phone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{property.owner.email}</span>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button className="w-full gradient-primary">
                      <Calendar className="w-4 h-4 mr-2" />
                      Request Viewing
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">Property Features</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Property Type</span>
                    <span className="font-medium">{property.category === "residential" ? "Residential" : "Commercial"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Listing Type</span>
                    <span className="font-medium">{property.type === "rent" ? "For Rent" : "For Sale"}</span>
                  </div>
                  {property.category === "residential" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bedrooms</span>
                        <span className="font-medium">{property.bedrooms}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Bathrooms</span>
                        <span className="font-medium">{property.bathrooms}</span>
                      </div>
                    </>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Area</span>
                    <span className="font-medium">{property.area.toLocaleString()} sq ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability</span>
                    <Badge variant={property.availability ? "default" : "secondary"}>
                      {property.availability ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;