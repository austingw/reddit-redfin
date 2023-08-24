import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { isUpvote, id } = req.body;

  try {
    await prisma.vote.update({
      where: {
        id,
      },
      data: {
        isUpvote: !isUpvote,
      },
    });

    res.status(200).json({ message: "Vote successfully updated!" });
  } catch {
    res.status(500).json({ message: "Error updating comment" });
  }
}
