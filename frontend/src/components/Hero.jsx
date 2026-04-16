import { Box, Button, Container, Typography } from "@mui/material";
import ferrariLogo from "../assets/ferrari-logo.png";

function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Box sx={{ py: 14 }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: "820px", position: "relative" }}>

          <Box
            sx={{
              position: "absolute",
              left: "-28px",
              top: "8px",
              width: "3px",
              height: "260px",
              background: "linear-gradient(180deg, #D4AF37, transparent)",
            }}
          />

          {/*label */}
          <Typography
            variant="overline"
            sx={{
              color: "#D4AF37",
              letterSpacing: 6,
              fontSize: "0.7rem",
              fontWeight: 700,
              display: "block",
              mb: 2,
            }}
          >
            Racing through data
          </Typography>

          {/* logo */}
          <Box
            component="img"
            src={ferrariLogo}
            alt="Ferrari logo"
            sx={{ width: 56, height: "auto", display: "block", mb: 3 }}
          />

          {/* main title */}
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
              width: 60,
              height: 3,
              background: "linear-gradient(90deg, #D4AF37, transparent)",
              mb: 3,
            }}
          />

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: "580px",
              mb: 5,
              fontSize: "1rem",
              lineHeight: 1.8,
            }}
          >
            Explore Ferrari through race results, team history, charts, and
            performance trends in one place.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              onClick={() => scrollToSection("results")}
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 0,
                px: 4,
                py: 1.2,
                fontSize: "0.75rem",
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              View Results
            </Button>

            <Button
              onClick={() => scrollToSection("stats")}
              variant="outlined"
              sx={{
                borderRadius: 0,
                px: 4,
                py: 1.2,
                fontSize: "0.75rem",
                letterSpacing: 2,
                textTransform: "uppercase",
                color: "#F5F5F5",
                borderColor: "rgba(212,175,55,0.5)",
                "&:hover": {
                  borderColor: "#D4AF37",
                  backgroundColor: "rgba(212,175,55,0.08)",
                },
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
