import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

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

  // rows per page — user can change this with the dropdown
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const fetchResults = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/ferrari-constructor-results`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setAllResults(data);
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (err) {
      console.error("error fetching results:", err);
    } finally {
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  // reset to page 1 when search or rows per page changes
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, rowsPerPage]);

  const filteredResults = allResults.filter((r) => {
    const q = searchTerm.toLowerCase();
    return (
      r.driver?.toLowerCase().includes(q) ||
      r.race?.toLowerCase().includes(q) ||
      r.circuit?.toLowerCase().includes(q) ||
      String(r.season).includes(q)
    );
  });

  const totalPages = Math.ceil(filteredResults.length / rowsPerPage);
  const pageRows = filteredResults.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  // shared button style to avoid repeating it
  const navButtonSx = {
    color: "white",
    borderColor: "rgba(212,175,55,0.35)",
    borderRadius: 0,
    px: 2,
    fontSize: "0.72rem",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    minWidth: "auto",
    "&:hover": { borderColor: "#D4AF37", backgroundColor: "rgba(212,175,55,0.1)" },
    "&.Mui-disabled": { color: "rgba(255,255,255,0.2)", borderColor: "rgba(255,255,255,0.1)" },
  }

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

        {/* search bar + rows per page dropdown side by side */}
        <Box sx={{ display: "flex", gap: 2, mb: 2, alignItems: "center" }}>
          <TextField
            fullWidth
            placeholder="Search by driver, race, circuit, or year…"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
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

          {/* rows per page dropdown */}
          <Select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(e.target.value)}
            variant="outlined"
            sx={{
              color: "white",
              borderRadius: 0,
              minWidth: 90,
              backgroundColor: "rgba(0,0,0,0.3)",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(212,175,55,0.35)" },
              "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#D4AF37" },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#D4AF37" },
              "& .MuiSvgIcon-root": { color: "#D4AF37" },
            }}
          >
            <MenuItem value={10}>10 rows</MenuItem>
            <MenuItem value={20}>20 rows</MenuItem>
            <MenuItem value={50}>50 rows</MenuItem>
          </Select>
        </Box>

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
              <Typography sx={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)" }}>
                P{result.grid}
              </Typography>
              <Typography sx={{ fontSize: "0.85rem", fontWeight: result.position === "1" ? 700 : 400, color: result.position === "1" ? "#D4AF37" : result.status !== "Finished" && !result.status?.startsWith("+") ? "rgba(255,255,255,0.35)" : "white" }}>
                {result.status === "Finished" || result.status?.startsWith("+") ? `P${result.position}` : result.status}
              </Typography>
              <Typography sx={{ fontSize: "0.85rem", color: result.points > 0 ? "white" : "rgba(255,255,255,0.35)" }}>
                {result.points > 0 ? result.points : "—"}
              </Typography>
              <Typography sx={{ fontSize: "0.85rem", color: "#D4AF37", fontWeight: 700 }}>
                {result.season}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* pagination — jump to start, previous, next, jump to end */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 3 }}>

          {/* left side — jump to beginning + previous */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(0)}
              sx={navButtonSx}
            >
              ⟨⟨
            </Button>
            <Button
              variant="outlined"
              disabled={currentPage === 0}
              onClick={() => setCurrentPage((p) => p - 1)}
              sx={navButtonSx}
            >
              ← Prev
            </Button>
          </Box>

          <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
            {currentPage + 1} / {Math.max(totalPages, 1)}
          </Typography>

          {/* right side — next + jump to end */}
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="outlined"
              disabled={currentPage >= totalPages - 1}
              onClick={() => setCurrentPage((p) => p + 1)}
              sx={navButtonSx}
            >
              Next →
            </Button>
            <Button
              variant="outlined"
              disabled={currentPage >= totalPages - 1}
              onClick={() => setCurrentPage(totalPages - 1)}
              sx={navButtonSx}
            >
              ⟩⟩
            </Button>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}

export default ResultsSection;
