import Head from "next/head";
import {
  Box,
  Button,
  CircularProgress,
  Input,
  Select,
  Stack,
  Table,
  Typography,
} from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import { useState } from "react";
import useFindListings from "@/hooks/useFindListings";
import ListingsTable from "@/components/ListingsTable";

enum View {
  HOME = "home",
  RESULTS = "results",
}

const Home = () => {
  const [view, setView] = useState<View>(View.HOME);

  const { data, isLoading, error } = useFindListings({});

  //Create IDs in order to sync upvotes without an account system in place
  let userId = localStorage.getItem("userId");
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("userId", userId);
  }

  // function success(position: any) {
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;
  //   console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  // }

  // function error() {
  //   console.log("Unable to retrieve your location");
  // }

  return (
    <>
      <Head>
        <title>Red(it)fin</title>
        <meta name="description" content="Upvotes for luxury homes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box bgcolor={"white"} height={"100vh"} width={"100vw"}>
        <Stack>
          <Typography variant="h1" color={"black"}>
            Red(it)fin
          </Typography>
        </Stack>
        <Input
          placeholder="Search"
          startAdornment={<SearchRounded />}
          sx={{
            width: "50%",
            height: "50px",
            fontSize: "20px",
            borderRadius: "10px",
            border: "1px solid black",
          }}
        />
        <Stack flexDirection={"row"}>
          <Typography variant="body1" fontWeight={600} color={"black"}>
            Sort:
          </Typography>
          <Select variant="filled" defaultValue="All" name="" />
        </Stack>
        <Stack flexDirection={"row"}>
          <Select variant="outlined" placeholder="Price" defaultValue="All" />
          <Select
            variant="outlined"
            placeholder="Home type"
            defaultValue="All"
          />
          <Select variant="outlined" placeholder="Beds" defaultValue="All" />
          <Select variant="outlined" placeholder="Baths" defaultValue="All" />
        </Stack>

        <Stack direction={"row"}>
          <Button variant="contained">Search</Button>
          <Button variant="contained">Browse</Button>
          <Button variant="contained">Find Me</Button>
        </Stack>

        <Typography variant="h2" color={"black"}>
          {view === View.HOME ? "Browse:" : "Results:"}
        </Typography>

        {isLoading ? <CircularProgress /> : <ListingsTable listings={data} />}
        {/* Will use inside of search bar
      <Button
        onClick={() => navigator.geolocation.getCurrentPosition(success, error)}
      >
        Current Location
      </Button> */}
      </Box>
    </>
  );
};

export default Home;
