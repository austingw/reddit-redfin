import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

import parseSearchTerm from "@/utils/parseSearchTerm";

// GET /api/listings
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //gets filters from query params
  const { searchTerm, page, rows, sort, price, type, beds, baths } = req.query;

  let parsedSearchTerm = {};

  //Check if search term is a coordinate pair, else parse search term
  if (searchTerm?.includes("coords:")) {
    //Splits up lat and lon
    const coords = String(searchTerm).split("coords:")[1].split(",");
    const lat = Number(coords[0]);
    const lon = Number(coords[1]);
    let location = "";

    //Hit geoapify for some cool reverse geocaching
    await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=f0d972e672fd49d6aa727cc9ad707c04`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then(
        (result) => (location = `${result.features?.[0].properties.postcode}`)
      )
      .catch((error) => console.log("error", error));

    parsedSearchTerm = parseSearchTerm(location);
  } else {
    parsedSearchTerm = parseSearchTerm(searchTerm as string);
  }

  const splitPrice = price ? (price as string).split("-") : null;

  //Format bed + bath filters for Prisma
  let bedsVal = {};
  if (beds == "0") {
    bedsVal = {
      beds: {
        gte: 0,
      },
    };
  } else {
    bedsVal = {
      beds: {
        equals: Number(beds) > 0 ? Number(beds) : null,
      },
    };
  }

  let bathsVal = {};
  if (baths == "0") {
    bathsVal = {
      baths: {
        gte: 0,
      },
    };
  } else {
    bathsVal = {
      baths: {
        equals: Number(baths) > 0 ? Number(baths) : null,
      },
    };
  }

  //Uses switch statement to determine sort value based on query params
  let sortVal = {};
  switch (sort) {
    case "New":
      sortVal = {
        soldDate: "desc",
      };
      break;
    case "Old":
      sortVal = {
        soldDate: "asc",
      };
      break;
    case "Most":
      sortVal = {
        votes: {
          _count: "desc",
        },
      };
      break;
    case "Least":
      sortVal = {
        votes: {
          _count: "asc",
        },
      };
      break;
    case "Hiprice":
      sortVal = {
        price: "desc",
      };
      break;
    case "Loprice":
      sortVal = {
        price: "asc",
      };
      break;
    default:
      break;
  }

  //gets listings from db based on filters
  const listings = await prisma.listing.findMany({
    skip: Number(page) * Number(rows),
    take: Number(rows),
    where: {
      ...parsedSearchTerm,
      propertyType: {
        contains: type && type != "All" ? String(type) : "",
      },
      ...bedsVal,
      ...bathsVal,
      price: {
        gte: String(splitPrice?.[0]) != "All" ? Number(splitPrice?.[0]) : 0,
        lte:
          String(splitPrice?.[0]) != "All"
            ? Number(splitPrice?.[1])
            : 999999999,
      },
    },
    orderBy: {
      ...sortVal,
    },
  });

  //gets total number of listings from db based on filters
  const total = await prisma.listing.count({
    where: {
      ...parsedSearchTerm,
      propertyType: {
        contains: type && type != "All" ? String(type) : "",
      },
      ...bedsVal,
      ...bathsVal,
      price: {
        gte: String(splitPrice?.[0]) != "All" ? Number(splitPrice?.[0]) : 0,
        lte:
          String(splitPrice?.[0]) != "All"
            ? Number(splitPrice?.[1])
            : 999999999,
      },
    },
  });

  res.status(200).json({ data: { listings, total } });
}
