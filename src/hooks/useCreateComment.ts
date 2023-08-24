import { CommentData } from "@/types/comments";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

//POST a comment to the API
export const createComment = async (data: CommentData) => {
  try {
    const response = await axios.post("/api/createComments", data);
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
  }
};

const useCreateComment = () => {
  return useMutation(createComment);
};

export default useCreateComment;
