import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Listing } from "@prisma/client";
import { skip } from "node:test";

// GET /api/listings
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const listings = await prisma.listing.findMany({
    select: {
      id: true,
      soldDate: true,
      propertyType: true,
      address: true,
      city: true,
      state: true,
      zip: true,
      price: true,
      beds: true,
      baths: true,
      squareFeet: true,
      lotSize: true,
      yearBuilt: true,
      daysOnMarket: true,
      monthlyHoa: true,
      mlsNumber: true,
      latitude: true,
      longitude: true,
      description: true,
      votes: {
        select: {
          id: true,
          isUpvote: true,
        },
      },
    },
    skip: 0,
    take: 100,
    orderBy: {
      soldDate: "desc",
    },
  });

  res.status(200).json({ listings });
}
