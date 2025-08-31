import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, DollarSign, Home } from "lucide-react";

interface SearchFilters {
  location: string;
  priceRange: string;
  propertyType: string;
}

interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
  className?: string;
}

const SearchBar = ({ onSearch, className = "" }: SearchBarProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    location: "",
    priceRange: "",
    propertyType: "",
  });

  const handleSearch = () => {
    onSearch?.(filters);
  };

  const handleInputChange = (field: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className={`bg-card rounded-lg shadow-lg p-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Location
          </label>
          <Input
            placeholder="Enter city or area"
            value={filters.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            Price Range
          </label>
          <Select onValueChange={(value) => handleInputChange("priceRange", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-2000">$0 - $2,000</SelectItem>
              <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
              <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
              <SelectItem value="10000+">$10,000+</SelectItem>
              <SelectItem value="0-500000">$0 - $500K (Sale)</SelectItem>
              <SelectItem value="500000-1000000">$500K - $1M (Sale)</SelectItem>
              <SelectItem value="1000000+">$1M+ (Sale)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center">
            <Home className="w-4 h-4 mr-1" />
            Property Type
          </label>
          <Select onValueChange={(value) => handleInputChange("propertyType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="residential-rent">Residential (Rent)</SelectItem>
              <SelectItem value="residential-sale">Residential (Sale)</SelectItem>
              <SelectItem value="commercial-rent">Commercial (Rent)</SelectItem>
              <SelectItem value="commercial-sale">Commercial (Sale)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button 
            onClick={handleSearch}
            className="w-full gradient-primary h-10"
          >
            <Search className="w-4 h-4 mr-2" />
            Search Properties
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;