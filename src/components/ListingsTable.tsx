import { Listing } from "@/types/listings";
import {
  Box,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
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
  rows: number;
  setRows: (rows: number) => void;
  page: number;
  setPage: (page: number) => void;
}

const ListingsTable = ({
  listings,
  userId,
  total,
  rows,
  setRows,
  page,
  setPage,
}: ListingsTableProps) => {
  const [open, setOpen] = useState(false);

  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const theme = useTheme();

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
        minHeight={"100vh"}
        borderTop={`1px solid ${theme.palette.divider}`}
      >
        (
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
                    >{`${listing?.address}, ${listing?.city}, ${listing?.state} ${listing?.zip}`}</TableCell>
                    <TableCell onClick={() => handleRowClick(listing)}>
                      {parsePrice(listing?.price)}
                    </TableCell>
                    <TableCell
                      onClick={() => handleRowClick(listing)}
                    >{`${listing?.beds} Beds`}</TableCell>
                    <TableCell
                      onClick={() => handleRowClick(listing)}
                    >{`${listing?.baths} Baths`}</TableCell>
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
        )
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <>
            {selectedListing && (
              <ListingView listing={selectedListing} userId={userId} />
            )}
          </>
        </Dialog>
      </Box>
    </>
  );
};

export default ListingsTable;
