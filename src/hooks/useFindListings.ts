import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ListingParams } from "@/types/listings";

//GET a set of listings from the API
export const findListings = async (data: ListingParams) => {
  try {
    const response = await axios.get("/api/getListings", {
      params: {
        page: data.page,
        limit: data.limit,
        sort: data.sort,
        order: data.order,
        searchTerm: data.searchTerm,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
};

const useFindListings = (data: ListingParams) => {
  return useQuery(["listings", data], () => findListings(data));
};

export default useFindListings;
