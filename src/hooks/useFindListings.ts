import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ListingParams } from "@/types/listings";

//GET a set of listings from the API
export const findListings = async (data: ListingParams) => {
  try {
    const response = await axios.get("/api/getListings", {
      params: {
        searchTerm: data.searchTerm,
        rows: data.rows,
        page: data.page,
        sort: data.sort,
        price: data.price,
        type: data.type,
        beds: data.beds,
        baths: data.baths,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
};

const useFindListings = (data: ListingParams) => {
  return useQuery(["listings", data], () => findListings(data), {
    keepPreviousData: true,
  });
};

export default useFindListings;
