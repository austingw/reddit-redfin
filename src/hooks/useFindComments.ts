import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//GET the comments for a given listing from the API
export const findComments = async (listingId: number) => {
  try {
    const response = await axios.get("/api/getComments", {
      params: {
        listingId,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching listings:", error);
  }
};

const useFindComments = (listingId: number) => {
  return useQuery(["comments", listingId], () => findComments(listingId));
};

export default useFindComments;
