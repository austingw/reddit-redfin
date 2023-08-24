import Head from "next/head";
import {
  Box,
  Button,
  CircularProgress,
  Input,
  MenuItem,
  Select,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { NearMe, Search } from "@mui/icons-material";
import { useState } from "react";
import useFindListings from "@/hooks/useFindListings";
import ListingsTable from "@/components/ListingsTable";

enum View {
  HOME = "home",
  RESULTS = "results",
}

const Home = () => {
  const [view, setView] = useState<View>(View.HOME);

  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("New");
  const [price, setPrice] = useState<string>("All");
  const [type, setType] = useState<string>("All");
  const [beds, setBeds] = useState<number>(0);
  const [baths, setBaths] = useState<number>(0);

  const { data, isLoading, isRefetching, refetch, error } = useFindListings({
    searchTerm,
    sort,
    price,
    type,
    beds,
    baths,
    rows,
    page,
  });

  //get user location and override search term
  function success(position: GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setSearchTerm(`coords:${latitude},${longitude}`);
  }

  //placeholder for user id, could be replaced with auth/cookie/token
  //for now, just hardcoding it in order to show full Reddit-style vote styling/behavior
  let userId = "1";

  return (
    <>
      <Head>
        <title>Red(it)fin</title>
        <meta name="description" content="Upvotes for luxury homes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box bgcolor={"white"} height={"100%"} width={"100vw"}>
        <Stack
          py={4}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          height={"100px"}
          top={0}
          px={4}
          bgcolor={"primary.main"}
        >
          <Typography variant="h3" color={"white"}>
            Red(it)fin
          </Typography>
          <Stack gap={2} direction={"row"} minWidth={"600px"}>
            <Input
              placeholder="City, State, or Zip"
              color="secondary"
              onBlur={(e) => setSearchTerm(e.target.value)}
              sx={{
                color: "secondary.main",
                width: "500px",
                height: "50px",
                fontSize: "20px",
                "&:before, &:after": {
                  borderBottom: "2px solid secondary.main",
                },
                "& .MuiInput-underline:hover": {
                  borderBottom: "2px solid secondary.main",
                },
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{
                color: "primary.main",
                width: "120px",
                height: "50px",
              }}
              onClick={() => refetch()}
            >
              <Search /> Search
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              sx={{
                width: "120px",
                height: "50px",
                px: 0,
              }}
              onClick={() => navigator.geolocation.getCurrentPosition(success)}
            >
              <NearMe /> Find Me
            </Button>
          </Stack>
        </Stack>

        <Stack
          px={4}
          py={2}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            gap={1}
          >
            <Typography variant="body1" color={"primary.main"}>
              Sort by:
            </Typography>
            <Select
              variant="standard"
              color="primary"
              disableUnderline
              size="medium"
              defaultValue={"New"}
              name="sort"
              autoWidth
              onChange={(e) => setSort(e.target.value)}
              sx={{
                color: "primary.main",
                mt: 0,
              }}
            >
              <MenuItem value={"New"}>New</MenuItem>
              <MenuItem value={"Old"}>Old</MenuItem>
              <MenuItem value={"Most"}>Most Votes</MenuItem>
              <MenuItem value={"Least"}>Least Votes</MenuItem>
              <MenuItem value={"Hiprice"}>Highest Price</MenuItem>
              <MenuItem value={"Loprice"}>Lowest Price</MenuItem>
            </Select>
          </Stack>
          <Stack flexDirection={"row"} gap={2}>
            <Select
              variant="outlined"
              size="small"
              color="primary"
              disableUnderline
              defaultValue={"All"}
              name="price"
              autoWidth
              onChange={(e) => setPrice(e.target.value)}
              sx={{
                color: "primary.main",
                mt: 0,
              }}
            >
              <MenuItem value={"All"}>Price</MenuItem>
              <MenuItem value={"0-100000"}>$0 - $100,000</MenuItem>
              <MenuItem value={"100001-250000"}>$100,001 - $250,000</MenuItem>
              <MenuItem value={"250001-500000"}>$250,001 - $500,000</MenuItem>
              <MenuItem value={"500001-750000"}>$500,001 - $750,000</MenuItem>
              <MenuItem value={"750000-1000000"}>
                $750,000 - $1,000,000
              </MenuItem>
              <MenuItem value={"1000000-99999999999"}>$1,000,001+</MenuItem>
            </Select>
            <Select
              variant="outlined"
              size="small"
              color="primary"
              disableUnderline
              defaultValue={"All"}
              name="type"
              autoWidth
              onChange={(e) => setType(e.target.value)}
              sx={{
                color: "primary.main",
                mt: 0,
              }}
            >
              <MenuItem value={"All"}>Type</MenuItem>
              <MenuItem value={"Condo"}>Condo</MenuItem>
              <MenuItem value={"Land"}>Land</MenuItem>
              <MenuItem value={"Multi Family"}>Multi-Family</MenuItem>
              <MenuItem value={"Single Family"}>Single-Family</MenuItem>
              <MenuItem value={"Townhouse"}>Townhouse</MenuItem>
            </Select>

            <Select
              variant="outlined"
              size="small"
              color="primary"
              disableUnderline
              defaultValue={0}
              name="beds"
              autoWidth
              onChange={(e) => setBeds(Number(e.target.value))}
              sx={{
                color: "primary.main",
                mt: 0,
              }}
            >
              <MenuItem value={0}>Beds</MenuItem>
              <MenuItem value={1}>1 Bed</MenuItem>
              <MenuItem value={2}>2 Beds</MenuItem>
              <MenuItem value={3}>3 Beds</MenuItem>
              <MenuItem value={4}>4 Beds</MenuItem>
              <MenuItem value={5}>5 Beds</MenuItem>
              <MenuItem value={6}>6 Beds</MenuItem>
              <MenuItem value={6}>7+ Beds</MenuItem>
            </Select>
            <Select
              variant="outlined"
              size="small"
              color="primary"
              disableUnderline
              defaultValue={0}
              name="beds"
              autoWidth
              onChange={(e) => setBaths(Number(e.target.value))}
              sx={{
                color: "primary.main",
                mt: 0,
              }}
            >
              <MenuItem value={0}>Baths</MenuItem>
              <MenuItem value={1}>1 Bath</MenuItem>
              <MenuItem value={2}>2 Baths</MenuItem>
              <MenuItem value={3}>3 Baths</MenuItem>
              <MenuItem value={4}>4 Baths</MenuItem>
              <MenuItem value={5}>5 Baths</MenuItem>
              <MenuItem value={6}>6 Baths</MenuItem>
              <MenuItem value={6}>7+ Baths</MenuItem>
            </Select>
          </Stack>
        </Stack>

        {isLoading || isRefetching ? (
          <Box width={"100vw"} height={"100vh"}>
            <CircularProgress
              sx={{
                color: "primary.main",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </Box>
        ) : (
          <ListingsTable
            listings={data?.listings}
            total={data?.total}
            userId={userId}
            rows={rows}
            setRows={setRows}
            page={page}
            setPage={setPage}
          />
        )}
      </Box>
    </>
  );
};

export default Home;
