import { Listing } from "@/types/listings";
import {
  Box,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  useTheme,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import ListingView from "./ListingView";
import VotingButtons from "./VotingButtons";
import parsePrice from "@/utils/parsePrice";

interface ListingsTableProps {
  listings: Listing[];
  userId: string;
  total: number;
}

const ListingsTable = ({ listings, userId, total }: ListingsTableProps) => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const theme = useTheme();

  const columnHeaders = [
    { field: "voteButtons", headerName: "Votes" },
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

  const handleRowClick = (listing: Listing) => {
    setSelectedListing(listing);
    setOpen(true);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRows(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        borderTop={`1px solid ${theme.palette.divider}`}
      >
        <TableContainer>
          <Table>
            <TableBody>
              {listings?.map((listing) => {
                return (
                  <TableRow
                    hover
                    key={listing.id}
                    sx={{
                      border: 0,
                      cursor: "pointer",
                    }}
                  >
                    <TableCell>
                      <VotingButtons listingId={listing.id} userId={userId} />
                    </TableCell>
                    <TableCell
                      onClick={() => handleRowClick(listing)}
                    >{`${listing?.address} ${listing?.city} ${listing?.state} ${listing?.zip}`}</TableCell>
                    <TableCell onClick={() => handleRowClick(listing)}>
                      {parsePrice(listing?.price)}
                    </TableCell>
                    <TableCell
                      onClick={() => handleRowClick(listing)}
                    >{`${listing?.beds}/${listing?.baths}`}</TableCell>
                    <TableCell onClick={() => handleRowClick(listing)}>
                      {listing?.squareFeet > 0
                        ? listing?.squareFeet + " " + "Sq. Ft."
                        : "--"}
                    </TableCell>
                    <TableCell onClick={() => handleRowClick(listing)}>
                      {dayjs(listing?.soldDate).format("MM/DD/YYYY")}
                    </TableCell>
                  </TableRow>
                );
              }, [])}
            </TableBody>
            <TablePagination
              count={total}
              rowsPerPageOptions={[10, 25, 50]}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPage={rows}
              page={page}
              onPageChange={handleChangePage}
            />
          </Table>
        </TableContainer>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <>
            {selectedListing && (
              <ListingView listing={selectedListing} userId={userId} />
            )}
          </>
        </Modal>
      </Box>
    </>
  );
};

export default ListingsTable;
