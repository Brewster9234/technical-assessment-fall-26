import { Box, Button, Container, TextField, Typography } from "@mui/material";

function ResultsSection() {
  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Race Results
        </Typography>

        <Box
          sx={{
            width: "160px",
            height: "3px",
            backgroundColor: "#D4AF37",
            mb: 4,
          }}
        />

        <Typography
          sx={{
            color: "text.secondary",
            maxWidth: "700px",
            mb: 3,
          }}
        >
          Search and browse Ferrari race data. --will later be connected
          to live API data.
        </Typography>

        <TextField
          fullWidth
          placeholder="Search by race, driver, or season..."
          variant="outlined"
          sx={{
            mb: 3,
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(0,0,0,0.18)",
            },
          }}
        />

        <Box
          sx={{
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(0,0,0,0.18)",
            overflow: "hidden",
          }}
        >
          {/* table header */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              px: 3,
              py: 2,
              backgroundColor: "rgba(0,0,0,0.24)",
              borderBottom: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>Race</Typography>
            <Typography sx={{ fontWeight: 700 }}>Season</Typography>
            <Typography sx={{ fontWeight: 700 }}>Driver</Typography>
            <Typography sx={{ fontWeight: 700 }}>Position</Typography>
          </Box>

          {/* sample rows */}
          {[1, 2, 3, 4, 5].map((row) => (
            <Box
              key={row}
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr",
                px: 3,
                py: 2,
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Typography>Italian Grand Prix</Typography>
              <Typography>2024</Typography>
              <Typography>Leclerc</Typography>
              <Typography>P{row}</Typography>
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 3,
          }}
        >
          <Button variant="outlined" sx={{ color: "white", borderColor: "#D4AF37" }}>
            Previous
          </Button>

          <Button variant="outlined" sx={{ color: "white", borderColor: "#D4AF37" }}>
            Next
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ResultsSection;