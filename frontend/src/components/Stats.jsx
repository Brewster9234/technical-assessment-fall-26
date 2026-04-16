import { Box, Container, Grid, Typography } from "@mui/material";

function Stats() {
  const stats = [
    { label: "Founded", value: "1929" },
    { label: "F1 Debut", value: "1950" },
    { label: "Constructors' Titles", value: "16" },
    { label: "Drivers' Titles", value: "15" },
  ];

  return (
    <Box sx={{ py: 12 }}>
      <Container maxWidth="lg">

        <Box sx={{ mb: 6 }}>
          <Typography
            variant="overline"
            sx={{
              color: "#D4AF37",
              letterSpacing: 6,
              fontSize: "0.7rem",
              fontWeight: 700,
              display: "block",
              mb: 1,
            }}
          >
            The Team
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 2,
              lineHeight: 1,
              mb: 2,
            }}
          >
            Team Overview
          </Typography>

          {/*accent line */}
          <Box
            sx={{
              width: 60,
              height: 3,
              background: "linear-gradient(90deg, #D4AF37, transparent)",
              mb: 3,
            }}
          />

          <Typography sx={{ color: "text.secondary", maxWidth: 600 }}>
            Scuderia Ferrari is the most successful constructor in Formula 1 history.
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              <Box
                sx={{
                  p: 3,
                  border: "1px solid rgba(212,175,55,0.35)",
                  backgroundColor: "rgba(0,0,0,0.25)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.2s ease, background 0.2s ease",
                  "&:hover": {
                    borderColor: "#D4AF37",
                    backgroundColor: "rgba(212,175,55,0.06)",
                  },
                }}
              >
                {/* red top strip */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "2px",
                    backgroundColor: "#C8102E",
                  }}
                />

                <Typography
                  sx={{
                    color: "#D4AF37",
                    fontSize: "0.72rem",
                    textTransform: "uppercase",
                    letterSpacing: 3,
                    mb: 1.5,
                  }}
                >
                  {stat.label}
                </Typography>

                <Typography
                  variant="h3"
                  sx={{
                    color: "text.primary",
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Stats;