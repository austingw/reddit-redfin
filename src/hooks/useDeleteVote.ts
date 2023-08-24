import { queryClient } from "@/pages/_app";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface DeleteVoteQuery {
  id: number;
  listingId?: number;
  commentId?: number;
}

export const deleteVote = async (data: DeleteVoteQuery) => {
  try {
    const response = await axios.delete(`/api/deleteVotes`, {
      data,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error deleting vote", error);
  }
};

const useDeleteVote = () => {
  return useMutation(deleteVote);
};

export default useDeleteVote;
