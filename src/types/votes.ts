export type Vote = {
  id: number;
  isUpvote: boolean;
  userId: string;
  listingId?: number;
  commentId?: number;
};

export type VoteData = {
  isUpvote: boolean;
  userId: string;
  listingId?: number;
  commentId?: number;
};
