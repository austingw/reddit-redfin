import useCreateComment from "@/hooks/useCreateComment";
import useFindComments from "@/hooks/useFindComments";
import { Comment, CommentData } from "@/types/comments";
import { Listing } from "@/types/listings";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import VotingButtons from "./VotingButtons";

interface ListingViewProps {
  listing: Listing;
  userId: string;
}

const ListingView = ({ listing, userId }: ListingViewProps) => {
  const [submitted, setSubmitted] = useState(false);
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");

  const { data, isLoading, refetch, error } = useFindComments(listing.id);

  console.log("data", data);

  const createCommentMutation = useCreateComment();

  const handleCreateComment = (
    comment: CommentData,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    createCommentMutation
      .mutateAsync({
        ...comment,
        listingId: listing.id,
      })
      .then(() => {
        setSubmitted(true);
        refetch();
        setTimeout(() => setSubmitted(false), 3000);
        refetch();
      });
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute" as "absolute",
          display: "flex",
          direction: "column",
          justifyContent: "center",
          alignItems: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
          bgcolor: "white",
          borderRadius: "20px",
          lineHeight: "1",
        }}
      >
        <Stack>
          <VotingButtons listingId={listing.id} userId={userId} />
          <Typography variant="h1" color={"black"}>
            {listing.address}
          </Typography>
          <Stack>
            <TextField
              id="name"
              label="name"
              value={username}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(event.target.value);
              }}
            />
            <TextField
              multiline
              rows={4}
              id="body"
              label="body"
              value={body}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setBody(event.target.value);
              }}
            />
            <Button
              variant="contained"
              onClick={(e) =>
                handleCreateComment(
                  { body: body, name: username, listingId: listing.id },
                  e
                )
              }
            >
              Submit
            </Button>
          </Stack>
          <Typography variant="h2" color={"black"}>
            Comments:
          </Typography>
          <Box
            gap={2}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyContent={"center"}
            height={"100px"}
            overflow={"scroll"}
          >
            {!isLoading &&
              data?.map((comment: Comment) => {
                return (
                  <Typography variant="body1" color={"black"} key={comment?.id}>
                    <VotingButtons commentId={comment?.id} userId={userId} />
                    {comment.body}
                  </Typography>
                );
              })}
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default ListingView;
