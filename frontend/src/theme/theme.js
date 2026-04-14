import { createTheme } from "@mui/material/styles";

// I picked Barlow Condensed for headings — it's a strong, sporty condensed font
// that fits a racing dashboard. Paired with DM Sans for body text.
// Both are free on Google Fonts and easy to find in tutorials.
// https://fonts.google.com/specimen/Barlow+Condensed
// https://fonts.google.com/specimen/DM+Sans

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#C8102E",
    },
    secondary: {
      main: "#D4AF37",
    },
    background: {
      default: "#1a0004",
      paper: "rgba(20, 0, 4, 0.78)",
    },
    text: {
      primary: "#F5F5F5",
      secondary: "#A0A0A0",
    },
  },
  typography: {
    // DM Sans for body text — clean and readable, easy to find on Google Fonts
    fontFamily: `"DM Sans", "Roboto", sans-serif`,
    h1: {
      fontFamily: `"Barlow Condensed", sans-serif`,
      fontWeight: 800,
      letterSpacing: 2,
    },
    h2: {
      fontFamily: `"Barlow Condensed", sans-serif`,
      fontWeight: 800,
      letterSpacing: 2,
      fontSize: "4rem",
      lineHeight: 1.05,
    },
    h3: {
      fontFamily: `"Barlow Condensed", sans-serif`,
      fontWeight: 800,
      letterSpacing: 2,
    },
    h4: {
      fontFamily: `"Barlow Condensed", sans-serif`,
      fontWeight: 700,
      letterSpacing: 1,
    },
    h5: {
      fontFamily: `"Barlow Condensed", sans-serif`,
      fontWeight: 700,
    },
    h6: {
      fontFamily: `"Barlow Condensed", sans-serif`,
      fontWeight: 700,
      letterSpacing: 1,
    },
  },
  // set to 0 so everything stays sharp and square — matches the gold border aesthetic
  shape: {
    borderRadius: 0,
  },
});

export default theme;