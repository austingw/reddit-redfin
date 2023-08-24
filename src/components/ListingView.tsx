import useCreateComment from "@/hooks/useCreateComment";
import useFindComments from "@/hooks/useFindComments";
import { Comment, CommentData } from "@/types/comments";
import { Listing } from "@/types/listings";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import VotingButtons from "./VotingButtons";
import parsePrice from "@/utils/parsePrice";
import dayjs from "dayjs";

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
      <Box width={"100%"}>
        <Stack
          direction={"column"}
          position={"relative"}
          width={"100%"}
          alignItems={"flex-start"}
          justifyContent={"center"}
          boxSizing={"border-box"}
          gap={2}
          p={2}
          overflow={"scroll"}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={4}
          >
            <VotingButtons listingId={listing.id} userId={userId} />
            <Typography variant="h5" color={"black"}>
              <b>Address:</b>{" "}
              {`${listing?.address}, ${listing?.city}, ${listing?.state} ${listing?.zip}`}
            </Typography>
          </Stack>
          <Typography variant="body2" color={"black"}>
            <b> Description: </b> {listing?.description}
          </Typography>
          <Divider flexItem />

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            gap={2}
          >
            <Typography variant="body2" color={"black"}>
              <b>Price:</b> {parsePrice(listing?.price)}
            </Typography>
            <Typography variant="body2" color={"black"}>
              <b>Year Build:</b> {listing?.yearBuilt}{" "}
            </Typography>

            <Typography variant="body2" color={"black"}>
              {" "}
              <b>Days on Market:</b> {listing?.daysOnMarket}{" "}
            </Typography>
            <Typography variant="body2" color={"black"}>
              <b>Sold Date: </b> {dayjs(listing?.soldDate).format("MM/DD/YYYY")}{" "}
            </Typography>
          </Stack>
          <Divider flexItem />

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            gap={2}
          >
            <Typography variant="body2" color={"black"}>
              <b> Property Type: </b>
              {listing?.propertyType}
            </Typography>
            <Typography variant="body2" color={"black"}>
              <b> Beds: </b> {listing?.beds}
            </Typography>
            <Typography variant="body2" color={"black"}>
              <b> Baths: </b>
              {listing?.baths}
            </Typography>
            <Typography variant="body2" color={"black"}>
              <b> Size: </b>
              {listing?.squareFeet > 0
                ? listing?.squareFeet + " " + "Sq. Ft."
                : "--"}
            </Typography>
            <Typography variant="body2" color={"black"}>
              <b> Lot Size:</b> {listing?.lotSize}
            </Typography>
            <Typography variant="body2" color={"black"}>
              <b> Monthly Hoa: </b>
              {listing?.monthlyHoa}
            </Typography>
          </Stack>
          <Divider flexItem />

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            gap={2}
          >
            <Typography variant="body2" color={"black"}>
              <b> MLS Number:</b> {listing?.mlsNumber}
            </Typography>
            <Typography variant="body2" color={"black"}>
              <b> Identifier:</b> {listing?.identifier}
            </Typography>
          </Stack>
          <Divider flexItem />
          <Typography variant="h6" color={"black"}>
            Comments:
          </Typography>
          {!isLoading &&
            data?.map((comment: Comment) => {
              return (
                <Stack
                  key={comment?.id}
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"flex-start"}
                  width={"100%"}
                >
                  <VotingButtons commentId={comment?.id} userId={userId} />
                  <Typography variant="body2" color={"black"}>
                    <b>{comment.name}:</b> {comment.body}
                  </Typography>
                </Stack>
              );
            })}
          <Stack width={"100%"} gap={2}>
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
        </Stack>
      </Box>
    </>
  );
};

export default ListingView;
