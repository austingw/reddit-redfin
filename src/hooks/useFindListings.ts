import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Params {
  page?: number;
  limit?: number;
  sort?: string;
  order?: string;
  searchTerm?: string;
}

//GET a set of listings from the API
export const findListings = async (data: Params) => {
  axios
    .get("/api/getListings", {
      params: {
        page: data.page,
        limit: data.limit,
        sort: data.sort,
        order: data.order,
        searchTerm: data.searchTerm,
      },
    })
    .then((res) => res?.data);
};

const useFindListings = (data: Params) => {
  return useQuery(["listings", data], () => findListings(data));
};

export default useFindListings;
