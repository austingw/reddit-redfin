import { Listing } from "@/types/listings";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import dayjs from "dayjs";

interface ListingsTableProps {
  listings: Listing[];
}

const ListingsTable = ({ listings }: ListingsTableProps) => {
  console.log(listings, "this is in fact coming thru");

  const columnHeaders = [
    {
      field: "fullAddress",
      headerName: "Address",
    },
    {
      field: "price",
      headerName: "Price",
    },
    {
      field: "bedsBaths",
      headerName: "Beds/Baths",
    },
    {
      field: "sqft",
      headerName: "Sqft",
    },
    {
      field: "soldDate",
      headerName: "Sold Date",
    },
  ];

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columnHeaders.map((column) => (
              <TableCell key={column.field}>{column.headerName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {listings?.map((listing) => {
            return (
              <TableRow key={listing.id}>
                <TableCell>{`${listing?.address} ${listing?.city} ${listing?.state} ${listing?.zip}`}</TableCell>
                <TableCell>{listing?.price}</TableCell>
                <TableCell>{`${listing?.beds} Beds/${listing?.baths} Baths`}</TableCell>
                <TableCell>{listing?.squareFeet + "Sq. Ft."}</TableCell>
                <TableCell>
                  {dayjs(listing?.soldDate).format("DD/MM/YYYY")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListingsTable;
