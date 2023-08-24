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

//I really enjoyed making a seed script in order to quickly test schema changes and re-seed the db,
//Unfortunately it doesn't work in Docker. I'm leaving it here for reference,
//Please use the instructions in the README
async function main() {
  // Define absolute path to csv file
  const path = require("path");
  const csvFilePath = path.join(__dirname, "data.csv");
  // Read and process it in chunks
  const readStream = fs.createReadStream(csvFilePath, "utf8");

  // Unfortunately, adjusting the batch size to 100 still wouldn't work in Docker...
  const batchSize = 100000;
  let batchedData: Row[] = [];

  // Process the batched data
  const processBatch = async (batch: Row[]) => {
    console.log(`Processing ${batch.length} listings...`);
    if (batch.length > 0) {
      // Create the listings in the database
      await prisma.listing.createMany({
        data: batch.map((listing) => {
          return {
            soldDate: listing.sold_date,
            propertyType: listing.property_type,
            address: listing.address,
            city: listing.city,
            state: listing.state,
            zip: listing.zip,
            price: listing.price,
            beds: listing.beds,
            baths: listing.baths,
            squareFeet: listing.square_feet,
            lotSize: listing.lot_size,
            yearBuilt: listing.year_built,
            daysOnMarket: listing.days_on_market,
            monthlyHoa: listing.monthly_hoa,
            mlsNumber: listing.mls_number,
            identifier: listing.identifier,
            latitude: listing.latitude,
            longitude: listing.longitude,
            description: listing.description,
          };
        }),
        skipDuplicates: true,
      });
    }
  };

  // Parse the csv file and process it in chunks
  Papa.parse(readStream, {
    header: true,
    chunkSize: 1024 * 1024,
    chunk: async (results: { data: Row[] }) => {
      for (const row of results.data) {
        batchedData.push({
          sold_date: dayjs(row.sold_date).toDate(),
          property_type: row.property_type,
          address: row.address,
          city: row.city,
          state: row.state,
          zip: row.zip,
          price: Number(row.price),
          beds: Number(row.beds),
          baths: Number(row.baths),
          square_feet: Number(row.square_feet),
          lot_size: Number(row.lot_size),
          year_built: Number(row.year_built),
          days_on_market: Number(row.days_on_market),
          monthly_hoa: Number(row.monthly_hoa),
          mls_number: Number(row.mls_number),
          identifier: row.identifier,
          latitude: Number(row.latitude),
          longitude: Number(row.longitude),
          description: String(row.description),
        });
      }
      while (batchedData.length >= batchSize) {
        const batchToProcess = batchedData.slice(0, batchSize);
        await processBatch(batchToProcess);
        batchedData = batchedData.slice(batchSize); // Remove processed batch from array
      }
    },
    complete: async () => {
      // Process the remaining data
      while (batchedData.length > 0) {
        const batchToProcess = batchedData.slice(0, batchSize);
        await processBatch(batchToProcess);
        batchedData = batchedData.slice(batchSize); // Remove processed batch from array
      }
      console.log("All listings are now in the database!");
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
