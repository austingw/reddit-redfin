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
      })) || [];

    res.status(200).json({ data: comments });
  } catch {
    res.status(500).json({ message: "Error getting comments" });
  }
}
