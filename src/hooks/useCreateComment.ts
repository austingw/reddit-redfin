import { queryClient } from "@/pages/_app";
import { CommentData } from "@/types/comments";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const createComment = async (data: CommentData) => {
  try {
    const response = await axios.post("/api/createComment", data);
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
  }
};

const useCreateComment = () => {
  return useMutation(createComment, {
    onSuccess: (data, variables, context) => {
      //Ivalidate the cache for the comments for the listing that was just commented on
      queryClient.invalidateQueries(["comments", variables?.listingId]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useCreateComment;
