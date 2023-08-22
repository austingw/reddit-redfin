import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { body, listingId, name } = req.body;

  console.log(req.body);

  try {
    await prisma.comment.create({
      data: {
        body,
        listingId,
        name,
      },
    });

    res.status(200).json({ message: "Comment successfully created!" });
  } catch {
    res.status(500).json({ message: "Error creating comment" });
  }
}
