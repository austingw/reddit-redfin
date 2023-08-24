import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Listing } from "@prisma/client";
import { skip } from "node:test";

// GET /api/getComments
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { type, id } = req.query;

  //Get votes based on whether it's a listing or comment
  if (type === "listing") {
    const votes =
      (await prisma.vote.findMany({
        where: {
          listingId: Number(id),
        },
      })) || [];

    console.log("votes", votes);

    res.status(200).json({ data: votes });
  }

  if (type === "comment") {
    const votes =
      (await prisma.vote.findMany({
        where: {
          commentId: Number(id),
        },
      })) || [];

    res.status(200).json({ data: votes });
  }
}
