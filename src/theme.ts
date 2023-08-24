import { ThemeOptions, createTheme } from "@mui/material/styles";

export const theme: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#eeeeee",
    },
  },
};

export default createTheme(theme);
