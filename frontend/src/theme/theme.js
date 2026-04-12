import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#C8102E",
    },
    secondary: {
      main: "#111111",
    },
    background: {
      default: "#1a0004",
      paper: "rgba(20, 0, 4, 0.78)",
    },
    text: {
      primary: "#F5F5F5",
      secondary: "#D0D0D0",
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Arial", sans-serif`,
    h2: {
      fontWeight: 800,
      letterSpacing: 1,
      fontSize: "4rem",
      lineHeight: 1.05,
    },
  },
  shape: {
    borderRadius: 18,
  },
});

export default theme;