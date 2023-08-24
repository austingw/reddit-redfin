import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface UpdateVoteQuery {
  id: number;
  isUpvote: boolean;
  listingId?: number;
  commentId?: number;
}

export const updateVote = async (data: UpdateVoteQuery) => {
  try {
    const response = await axios.put(`/api/updateVotes`, data);
    return response?.data?.data;
  } catch (error) {
    console.error("Error updating vote", error);
  }
};

const useUpdateVote = () => {
  return useMutation(updateVote);
};

export default useUpdateVote;
