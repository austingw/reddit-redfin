import { queryClient } from "@/pages/_app";
import { VoteData } from "@/types/votes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

//POST a vote to the API
export const createVote = async (data: VoteData) => {
  try {
    const response = await axios.post("/api/createVotes", data);
    return response.data.data;
  } catch (error) {
    console.error("Error creating vote:", error);
  }
};

const useCreateVote = () => {
  return useMutation(createVote);
};

export default useCreateVote;
