import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Listing } from "@prisma/client";
import { skip } from "node:test";

// GET /api/getComments
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.query);

  const { listingId } = req.query;

  const comments = await prisma.comment.findMany({
    where: {
      listingId: Number(listingId),
    },
    select: {
      id: true,
      body: true,
      name: true,
      votes: {
        select: {
          id: true,
          isUpvote: true,
          commentId: true,
        },
      },
    },
  });

  res.status(200).json({ data: comments });
}
