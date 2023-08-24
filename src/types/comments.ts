export type CommentData = {
  body: string;
  name: string;
  listingId: number;
};

export type Comment = {
  id: number;
  body: string;
  name: string;
  votes: {
    id: number;
    isUpvote: boolean;
  }[];
};
