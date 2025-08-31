export interface Property {
  id: number;
  title: string;
  description: string;
  price: number;
  type: "rent" | "sale";
  category: "residential" | "commercial";
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  availability: boolean;
  featured: boolean;
  owner: {
    name: string;
    phone: string;
    email: string;
  };
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "owner" | "tenant" | "admin";
  properties: number[];
}