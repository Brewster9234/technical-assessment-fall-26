import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#DC0000",
    },
    secondary: {
      main: "#FFCC00",
    },
    background: {
      default: "#050505",
      paper: "#121212",
    },
    text: {
      primary: "#F5F5F5",
      secondary: "#B0B0B0",
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Arial", sans-serif`,
  },
  shape: {
    borderRadius: 18,
  },
});

export default theme;