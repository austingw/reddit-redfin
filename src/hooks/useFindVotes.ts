import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ListingParams } from "@/types/listings";

//GET a set of votes for a given listing/comment from the API
export const findVotes = async (data: { type: string; id: number }) => {
  try {
    const response = await axios.get("/api/getVotes", {
      params: {
        type: data.type,
        id: data.id,
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.error("Error fetching votes:", error);
  }
};

const useFindVotes = (data: { type: string; id: number }) => {
  return useQuery(["votes", data], () => findVotes(data));
};

export default useFindVotes;
