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
  useTheme,
} from "@mui/material";
import { NearMe, Search, SearchRounded } from "@mui/icons-material";
import { useEffect, useState } from "react";
import useFindListings from "@/hooks/useFindListings";
import ListingsTable from "@/components/ListingsTable";

enum View {
  HOME = "home",
  RESULTS = "results",
}

const Home = () => {
  const [view, setView] = useState<View>(View.HOME);
  const { data, isLoading, error } = useFindListings({});

  const theme = useTheme();

  //was going to use uuid in local storage, but ran into some Next issues
  let userId = "qwe123";

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
          justifyContent={"space-evenly"}
          alignItems={"center"}
          height={"100px"}
          top={0}
          px={8}
          bgcolor={"primary.main"}
        >
          <Typography variant="h3" color={"black"}>
            Red(it)fin
          </Typography>
          <Stack gap={2} direction={"row"} minWidth={"600px"}>
            <Input
              placeholder="City, State, or Zip"
              sx={{
                color: "white",
                width: "500px",
                height: "50px",
                fontSize: "20px",
                borderRadius: "10px",
                borderColor: "white",
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{
                width: "120px",
                height: "50px",
              }}
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
            >
              <NearMe /> Find Me
            </Button>
          </Stack>
        </Stack>

        <Stack
          px={8}
          py={2}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack direction={"row"} alignItems={"center"} gap={2}>
            <Typography variant="h6" fontWeight={600} color={"black"}>
              Sort:
            </Typography>

            <Select
              variant="standard"
              size="small"
              defaultValue="All"
              name=""
              sx={{
                width: "160px",
              }}
            />
          </Stack>
          <Stack flexDirection={"row"} gap={2}>
            <Select
              variant="outlined"
              size="small"
              placeholder="Price"
              defaultValue="All"
            />
            <Select
              variant="outlined"
              size="small"
              placeholder="Home Type"
              defaultValue="All"
            />
            <Select
              variant="outlined"
              size="small"
              placeholder="Beds"
              defaultValue="All"
            />
            <Select
              variant="outlined"
              size="small"
              placeholder="Baths"
              defaultValue="All"
            />
          </Stack>
        </Stack>

        {isLoading ? (
          <Box width={"100vw"} height={"100vh"}>
            <CircularProgress
              sx={{
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
          />
        )}
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
