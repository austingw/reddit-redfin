import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Listing } from "@prisma/client";
import { skip } from "node:test";

// GET /api/listings
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //gets listings from db based on filters
  const listings = await prisma.listing.findMany({
    skip: 0,
    take: 10,
    orderBy: {
      soldDate: "desc",
    },
  });

  //gets total number of listings from db based on filters
  const total = await prisma.listing.count();

  res.status(200).json({ data: { listings, total } });
}
