import { useEffect, useState } from "react";
import { Box, Button, Container, TextField, Typography } from "@mui/material";

const ROWS_PER_PAGE = 20;

// formats "2024-03-02" into "Mar 2, 2024"
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
function formatDate(dateString) {
  if (!dateString) return "—";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(dateString));
}

function ResultsSection() {
  const [allResults, setAllResults] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const fetchResults = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/ferrari-constructor-results`);
      const data = await response.json();
      setAllResults(data);
    } catch (err) {
      console.error("error fetching results:", err);
    } finally {
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // reset to page 1 w
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  // filter by
  const filteredResults = allResults.filter((r) => {
    const q = searchTerm.toLowerCase();
    return (
      r.driver?.toLowerCase().includes(q) ||
      r.race?.toLowerCase().includes(q) ||
      r.circuit?.toLowerCase().includes(q) ||
      String(r.season).includes(q)
    );
  });

  const totalPages = Math.ceil(filteredResults.length / ROWS_PER_PAGE);
  const pageRows = filteredResults.slice(
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
          Every Ferrari race result across all seasons — search by driver, circuit, or year.
        </Typography>

        <TextField
          fullWidth
          placeholder="Search by driver, race, circuit, or year…"
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
          {filteredResults.length} results — page {currentPage + 1} of {Math.max(totalPages, 1)}
        </Typography>

        <Box sx={{ border: "1px solid rgba(212,175,55,0.35)", backgroundColor: "rgba(0,0,0,0.25)" }}>

          {/* header */}
          <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 0.8fr", px: 3, py: 1.5, backgroundColor: "rgba(212,175,55,0.15)", borderBottom: "1px solid rgba(212,175,55,0.35)" }}>
            {["Race", "Driver", "Grid", "Finish", "Points", "Year"].map((col) => (
              <Typography key={col} sx={{ fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: 3, color: "#D4AF37" }}>
                {col}
              </Typography>
            ))}
          </Box>

          {!dataLoaded && (
            <Typography sx={{ px: 3, py: 4, color: "rgba(255,255,255,0.3)" }}>
              Loading results...
            </Typography>
          )}

          {dataLoaded && pageRows.length === 0 && (
            <Typography sx={{ px: 3, py: 4, color: "rgba(255,255,255,0.3)" }}>
              No results found.
            </Typography>
          )}

          {dataLoaded && pageRows.map((result, i) => (
            <Box
              key={i}
              sx={{
                display: "grid",
                gridTemplateColumns: "2fr 1.5fr 1fr 1fr 1fr 0.8fr",
                px: 3,
                py: 1.5,
                borderBottom: i < pageRows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                "&:hover": { backgroundColor: "rgba(212,175,55,0.06)" },
                transition: "background 0.15s ease",
              }}
            >
              <Typography sx={{ fontSize: "0.85rem", fontWeight: 500 }}>{result.race}</Typography>
              <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.8)" }}>{result.driver}</Typography>

              {/* grid pos*/}
              <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
                P{result.grid}
              </Typography>

              {/* finishing pos, gold if P1 */}
              <Typography sx={{ fontSize: "0.85rem", fontWeight: result.position === "1" ? 700 : 400, color: result.position === "1" ? "#D4AF37" : result.status !== "Finished" && !result.status?.startsWith("+") ? "rgba(255,255,255,0.35)" : "white" }}>
                {result.status === "Finished" || result.status?.startsWith("+") ? `P${result.position}` : result.status}
              </Typography>

              {/* points */}
              <Typography sx={{ fontSize: "0.85rem", color: result.points > 0 ? "white" : "rgba(255,255,255,0.35)" }}>
                {result.points > 0 ? result.points : "—"}
              </Typography>

              <Typography sx={{ fontSize: "0.85rem", color: "#D4AF37", fontWeight: 700 }}>
                {result.season}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* the pagination*/}
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
