import { Box, Button, Container, Typography } from "@mui/material";
import ferrariLogo from "../assets/ferrari-logo.png";

function Hero() {
  // same scroll pattern as the navbar
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ py: 14 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            maxWidth: "820px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: "-28px",
              top: "8px",
              width: "4px",
              height: "260px",
              backgroundColor: "#D4AF37",
            }}
          />

          <Box sx={{ mb: 3 }}>
            <Box
              component="img"
              src={ferrariLogo}
              alt="Ferrari logo"
              sx={{
                width: 62,
                height: "auto",
                display: "block",
                mb: 2,
              }}
            />

            <Typography
              variant="overline"
              sx={{
                color: "#D4AF37",
                letterSpacing: 2,
                display: "block",
                mb: 1,
              }}
            >
              Race in Data
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              color: "text.primary",
              mb: 2,
              textTransform: "uppercase",
              lineHeight: 1,
              maxWidth: "700px",
            }}
          >
            Scuderia Ferrari
          </Typography>

          <Box
            sx={{
              width: "170px",
              height: "4px",
              backgroundColor: "#D4AF37",
              mb: 3,
            }}
          />

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: "620px",
              mb: 4,
              fontSize: "1.1rem",
              lineHeight: 1.8,
            }}
          >
            Explore Ferrari through race results, team history, charts, and
            performance trends in one interactive place.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => scrollToSection("results")}
            >
              View Results
            </Button>

            <Button
              variant="outlined"
              onClick={() => scrollToSection("stats")}
              sx={{
                color: "#F5F5F5",
                borderColor: "#D4AF37",
              }}
            >
              Team Stats
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;
