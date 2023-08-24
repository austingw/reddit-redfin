import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;

  //Delete a vote based on id
  try {
    await prisma.vote.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Vote successfully deleted!" });
  } catch {
    res.status(500).json({ message: "Error deleting vote" });
  }
}
