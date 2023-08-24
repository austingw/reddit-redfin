import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isUpvote, listingId, commentId, userId } = req.body;

  //Create a vote for a given listing or comment based on whatever value is there
  try {
    await prisma.vote.create({
      data: {
        isUpvote,
        listingId,
        commentId,
        userId,
      },
    });

    res.status(200).json({ message: "Vote successfully created!" });
  } catch {
    res.status(500).json({ message: "Error creating comment" });
  }
}
