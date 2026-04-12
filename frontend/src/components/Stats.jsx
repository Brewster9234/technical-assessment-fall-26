import { Box, Container, Grid, Typography } from "@mui/material";

function Stats() {
  // store data here 
  const stats = [
    { label: "Founded", value: "1929" },
    { label: "F1 Debut", value: "1950" },
    { label: "Titles", value: "16" },
  ];

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">

        {/* section title */}
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Team Overview
        </Typography>

        {/* gold accent line under da title */}
        <Box
          sx={{
            width: "140px",
            height: "3px",
            backgroundColor: "#D4AF37",
            mb: 4,
          }}
        />

        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.label}>
              
              {/* stat boxes */}
              <Box
                sx={{
                  p: 3,
                  border: "1px solid rgba(255,255,255,0.10)",
                  background: "rgba(0,0,0,0.18)", 
                  backdropFilter: "blur(4px)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >

                {/*red strip at top*/}
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "3px",
                    backgroundColor: "#C8102E",
                  }}
                />

                {/* label */}
                <Typography
                  sx={{
                    color: "#D4AF37", // gold label
                    fontSize: "0.8rem",
                    textTransform: "uppercase",
                    letterSpacing: 1.2,
                    mb: 1,
                  }}
                >
                  {stat.label}
                </Typography>

                {/*mainvalue */}
                <Typography
                  variant="h5"
                  sx={{
                    color: "text.primary",
                    fontWeight: 700,
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