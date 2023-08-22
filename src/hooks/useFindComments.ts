import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//GET the comments for a given listing from the API
export const findComments = async (listingId: string) => {
  axios
    .get("/api/getComments", {
      params: {
        id: listingId,
      },
    })
    .then((res) => res?.data);
};

const useFindComments = (listingId: string) => {
  return useQuery(["comments", listingId], () => findComments(listingId));
};

export default useFindComments;
