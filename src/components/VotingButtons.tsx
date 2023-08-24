import useCreateVote from "@/hooks/useCreateVote";
import useDeleteVote from "@/hooks/useDeleteVote";
import useFindVotes from "@/hooks/useFindVotes";
import useUpdateVote from "@/hooks/useUpdateVote";
import { Vote } from "@/types/votes";
import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface VotingButtonsProps {
  listingId?: number;
  commentId?: number;
  userId: string;
}

const VotingButtons = ({
  listingId,
  commentId,
  userId,
}: VotingButtonsProps) => {
  const [voteStyle, setVoteStyle] = useState<"up" | "down" | null>(null);

  const { data, refetch, isLoading, error } = useFindVotes({
    type: listingId ? "listing" : "comment",
    id: listingId ? listingId : commentId!,
  });

  const total =
    data?.filter((vote: Vote) => vote.isUpvote).length -
    data?.filter((vote: Vote) => !vote.isUpvote).length;
  const userVote = data?.find((vote: Vote) => vote.userId === userId);

  const createUpvoteMutation = useCreateVote();
  const deleteUpvoteMutation = useDeleteVote();
  const updateVoteMutation = useUpdateVote();

  console.log("data", data, "total", total, "userVote", userVote);

  useEffect(() => {
    if (userVote?.isUpvote) {
      setVoteStyle("up");
    } else if (userVote?.isUpvote === false) {
      setVoteStyle("down");
    } else {
      setVoteStyle(null);
    }
  }, [userVote]);

  const handleUpvote = () => {
    createUpvoteMutation
      .mutateAsync({
        listingId,
        commentId,
        userId: userId || "",
        isUpvote: true,
      })
      .then(() => {
        setVoteStyle("up");
        refetch();
      });
  };

  const handleDownvote = () => {
    createUpvoteMutation
      .mutateAsync({
        listingId,
        commentId,
        userId: userId || "",
        isUpvote: false,
      })
      .then(() => {
        setVoteStyle("down");
        refetch();
      });
  };
  const handleUnvote = () => {
    deleteUpvoteMutation
      .mutateAsync({
        id: userVote?.id,
        commentId: userVote?.commentId,
        listingId: userVote?.listingId,
      })
      .then(() => {
        setVoteStyle(null);
        refetch();
      });
  };
  const handleUpdateVote = () => {
    updateVoteMutation
      .mutateAsync({
        id: userVote?.id,
        isUpvote: userVote?.isUpvote,
        commentId: userVote?.commentId,
        listingId: userVote?.listingId,
      })
      .then(() => {
        refetch();
      });
  };

  return (
    <Stack direction={"column"} alignItems={"center"} justifyContent={"center"}>
      <IconButton
        onClick={
          voteStyle === "up"
            ? handleUnvote
            : voteStyle === "down"
            ? handleUpdateVote
            : handleUpvote
        }
      >
        <ArrowUpwardOutlined
          fontSize="small"
          htmlColor={voteStyle === "up" ? "orange" : "gray"}
        />
      </IconButton>
      <Typography variant={"body2"} color={"gray"}>
        {total ? total : 0}
      </Typography>
      <IconButton
        onClick={
          voteStyle === "down"
            ? handleUnvote
            : voteStyle === "up"
            ? handleUpdateVote
            : handleDownvote
        }
      >
        <ArrowDownwardOutlined
          fontSize="small"
          htmlColor={voteStyle === "down" ? "blue" : "gray"}
        />
      </IconButton>
    </Stack>
  );
};

export default VotingButtons;
