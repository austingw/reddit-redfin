import { Vote } from "./votes";

export type Listing = {
  id: number;
  soldDate: string;
  propertyType: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds: number;
  baths: number;
  squareFeet: number;
  lotSize: number;
  yearBuilt: number;
  daysOnMarket: number;
  monthlyHoa: number;
  mlsNumber: number;
  identifier: string;
  latitude: number;
  longitude: number;
  description: string;
  votes: Vote[];
};

export type ListingParams = {
  searchTerm?: string;
  page?: number;
  rows?: number;
  sort?: string;
  price?: string;
  type?: string;
  beds?: number;
  baths?: number;
};
