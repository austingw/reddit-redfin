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
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  searchTerm?: string;
};
