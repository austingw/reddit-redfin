import dayjs from "dayjs";

import { PrismaClient } from "@prisma/client";
import Papa from "papaparse";
import fs from "fs";

const prisma = new PrismaClient();

interface Row {
  sold_date: Date | null;
  property_type: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  price: number | null;
  beds: number | null;
  baths: number | null;
  square_feet: number | null;
  lot_size: number | null;
  year_built: number | null;
  days_on_market: number | null;
  monthly_hoa: number | null;
  mls_number: number | null;
  identifier: string | null;
  latitude: number | null;
  longitude: number | null;
  description: string | null;
}

//Seed file for database
async function seedFile(csvFilePath: string) {
  return new Promise(async (resolve, reject) => {
    const readStream = fs.createReadStream(csvFilePath, "utf8");

    // Parse the csv file and process it in chunks
    Papa.parse(readStream, {
      header: true,
      chunkSize: 1024 * 100,
      chunk: async (results: { data: Row[] }) => {
        try {
          for (const listing of results.data) {
            await prisma.listing.create({
              data: {
                soldDate: dayjs(listing.sold_date).toDate(),
                propertyType: listing.property_type,
                address: listing.address,
                city: listing.city,
                state: listing.state,
                zip: listing.zip,
                price: Number(listing.price),
                beds: Number(listing.beds),
                baths: Number(listing.baths),
                squareFeet: Number(listing.square_feet) || 0,
                lotSize: Number(listing.lot_size),
                yearBuilt: Number(listing.year_built),
                daysOnMarket: Number(listing.days_on_market),
                monthlyHoa: Number(listing.monthly_hoa),
                mlsNumber: Number(listing.mls_number),
                identifier: listing.identifier,
                latitude: Number(listing.latitude),
                longitude: Number(listing.longitude),
                description: String(listing.description),
              },
            });
            console.log(`Listing ${listing.identifier} created!`);
          }
        } catch (e) {
          console.error(e);
        }
      },
      complete: async () => {
        console.log("All listings for this file are now in the database!");
        resolve(true);
      },
      error: (e) => {
        console.error("Parsing error: ", e);
        reject(e);
      },
    });
  });
}

async function main() {
  const path = require("path");
  const csvFilePath = path.join(__dirname, `data.csv`);
  try {
    await seedFile(csvFilePath);
  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
