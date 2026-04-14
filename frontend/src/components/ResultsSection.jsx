import { useEffect, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const ROWS_PER_PAGE = 20;

// formats "2026-03-06T15:00:00+00:00" into "Mar 6, 2026"
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
function formatDate(dateString) {
  if (!dateString) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

function ResultsSection() {
  const [allRaces, setAllRaces] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  // async function pattern reference project (background.jsx)
  const fetchRaceResults = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/ferrari-race-results?year=2026`);
      const data = await response.json();
      setAllRaces(data);
    } catch (err) {
      console.error("error fetching race results:", err);
    } finally {
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    fetchRaceResults();
  }, []);

  // reset to page 1 whenever search changes
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const filteredRaces = allRaces.filter((race) => {
    const q = searchTerm.toLowerCase();
    return (
      race.circuit?.toLowerCase().includes(q) ||
      String(race.year).includes(q)
    );
  });

  const totalPages = Math.ceil(filteredRaces.length / ROWS_PER_PAGE);
  const pageRows = filteredRaces.slice(
    currentPage * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE + ROWS_PER_PAGE
  );

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, mb: 1 }}>
          Race Results
        </Typography>
        <Box sx={{ width: 60, height: 3, background: "linear-gradient(90deg, #D4AF37, transparent)", mb: 3 }} />
        <Typography sx={{ color: "text.secondary", mb: 4 }}>
          Ferrari's 2026 season results — most recent first.
        </Typography>

        <TextField
          fullWidth
          placeholder="Search by circuit…"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mb: 2,
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: 0,
              "& fieldset": { borderColor: "rgba(212,175,55,0.35)" },
              "&:hover fieldset": { borderColor: "#D4AF37" },
              "&.Mui-focused fieldset": { borderColor: "#D4AF37" },
            },
          }}
        />

        <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", mb: 1.5 }}>
          {filteredRaces.length} races — page {currentPage + 1} of {Math.max(totalPages, 1)}
        </Typography>

        <Box sx={{ border: "1px solid rgba(212,175,55,0.35)", backgroundColor: "rgba(0,0,0,0.25)" }}>

          {/* header */}
          <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1.3fr 1.3fr 1.3fr 1fr", px: 3, py: 1.5, backgroundColor: "rgba(212,175,55,0.15)", borderBottom: "1px solid rgba(212,175,55,0.35)" }}>
            {["Circuit", "Date", "Leclerc", "Hamilton", "Total Pts"].map((col) => (
              <Typography key={col} sx={{ fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: 3, color: "#D4AF37" }}>
                {col}
              </Typography>
            ))}
          </Box>

          {!dataLoaded && (
            <Typography sx={{ px: 3, py: 4, color: "rgba(255,255,255,0.3)" }}>
              Loading 2026 results...
            </Typography>
          )}

          {dataLoaded && pageRows.length === 0 && (
            <Typography sx={{ px: 3, py: 4, color: "rgba(255,255,255,0.3)" }}>
              No results found.
            </Typography>
          )}

          {dataLoaded && pageRows.map((race, i) => (
            <Box
              key={i}
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1.3fr 1.3fr 1.3fr 1fr",
                px: 3,
                py: 1.5,
                borderBottom: i < pageRows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                "&:hover": { backgroundColor: "rgba(212,175,55,0.06)" },
                transition: "background 0.15s ease",
              }}
            >
              <Typography sx={{ fontSize: "0.9rem", fontWeight: 500 }}>{race.circuit}</Typography>
              <Typography sx={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>{formatDate(race.date)}</Typography>

              {/* Leclerc result */}
              <Typography sx={{ fontSize: "0.9rem" }}>
                <span style={{ color: race.driver1_dnf ? "rgba(255,255,255,0.35)" : race.driver1_position === 1 ? "#D4AF37" : "white", fontWeight: race.driver1_position === 1 ? 700 : 400 }}>
                  {race.driver1_dnf ? "DNF" : `P${race.driver1_position}`}
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
                  {!race.driver1_dnf && ` (${race.driver1_points}pts)`}
                </span>
              </Typography>

              {/* Hamilton result */}
              <Typography sx={{ fontSize: "0.9rem" }}>
                <span style={{ color: race.driver2_dnf ? "rgba(255,255,255,0.35)" : race.driver2_position === 1 ? "#D4AF37" : "white", fontWeight: race.driver2_position === 1 ? 700 : 400 }}>
                  {race.driver2_dnf ? "DNF" : `P${race.driver2_position}`}
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
                  {!race.driver2_dnf && ` (${race.driver2_points}pts)`}
                </span>
              </Typography>

              <Typography sx={{ fontSize: "0.9rem", color: "#D4AF37", fontWeight: 700 }}>
                {race.total_points}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* pagination */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            variant="outlined"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((p) => p - 1)}
            sx={{ color: "white", borderColor: "rgba(212,175,55,0.35)", borderRadius: 0, "&:hover": { borderColor: "#D4AF37", backgroundColor: "rgba(212,175,55,0.1)" }, "&.Mui-disabled": { color: "rgba(255,255,255,0.2)", borderColor: "rgba(255,255,255,0.1)" } }}
          >
            ← Previous
          </Button>
          <Button
            variant="outlined"
            disabled={currentPage >= totalPages - 1}
            onClick={() => setCurrentPage((p) => p + 1)}
            sx={{ color: "white", borderColor: "rgba(212,175,55,0.35)", borderRadius: 0, "&:hover": { borderColor: "#D4AF37", backgroundColor: "rgba(212,175,55,0.1)" }, "&.Mui-disabled": { color: "rgba(255,255,255,0.2)", borderColor: "rgba(255,255,255,0.1)" } }}
          >
            Next →
          </Button>
        </Box>

      </Container>
    </Box>
  );
}

export default ResultsSection;