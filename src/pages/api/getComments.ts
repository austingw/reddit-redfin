import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Listing } from "@prisma/client";
import { skip } from "node:test";

// GET /api/getComments
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { listingId } = req.query;

  //Get comments for a given listing and always sort by newest
  try {
    const comments =
      (await prisma.comment.findMany({
        where: {
          listingId: Number(listingId),
        },
        select: {
          id: true,
          body: true,
          name: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })) || [];

    res.status(200).json({ data: comments });
  } catch {
    res.status(500).json({ message: "Error getting comments" });
  }
}
