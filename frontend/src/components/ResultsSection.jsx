import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// how many rows to show per page
const ROWS_PER_PAGE = 20;

function ResultsSection() {
  const [allRaces, setAllRaces] = useState([]);

  // I added a loading state here — I saw this pattern in the reference
  // project where they used locationLoaded to wait for async data
  // before rendering the main UI
  const [dataLoaded, setDataLoaded] = useState(false);

  // if the fetch fails, show an error message instead of a blank table
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  // I pulled this pattern from the reference project — they defined
  // their fetch as a separate named async function (getSimilarPlace)
  // rather than chaining .then() directly inside useEffect
  const fetchRaceData = async () => {
    try {
      // I'm using import.meta.env for the backend URL — same approach
      // as the reference project used for VITE_BACKEND_URL
      const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/ferrari-results`);

      if (!response.ok) {
        console.log("error fetching race data");
        setError("error fetching race data");
        return;
      }

      const data = await response.json();
      setAllRaces(data.reverse());
    } catch (err) {
      console.error("error fetching race data:", err);
      setError("error fetching race data");
    } finally {
      // whether or not the fetch worked, we're done loading
      setDataLoaded(true);
    }
  };

  // call the fetch function once when the component mounts
  useEffect(() => {
    fetchRaceData();
  }, []);

  // reset to page 1 whenever the user types a new search
  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  // filter results based on what the user typed
  const filteredRaces = allRaces.filter((race) => {
    const query = searchTerm.toLowerCase();
    return (
      race.location.toLowerCase().includes(query) ||
      race.country_name.toLowerCase().includes(query) ||
      race.session_name.toLowerCase().includes(query) ||
      String(race.year).includes(query)
    );
  });

  const totalPages = Math.ceil(filteredRaces.length / ROWS_PER_PAGE);

  const rowsOnThisPage = filteredRaces.slice(
    currentPage * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE + ROWS_PER_PAGE
  );

  return (
    <Box sx={{ py: 12 }}>
      <Container maxWidth="lg">

        {/* Section label + title */}
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
            Data Archive
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
            Race Results
          </Typography>

          {/* gold accent line */}
          <Box
            sx={{
              width: 60,
              height: 3,
              background: "linear-gradient(90deg, #D4AF37, transparent)",
              mb: 3,
            }}
          />

          <Typography sx={{ color: "text.secondary", maxWidth: 600 }}>
            Browse Ferrari's race history. Search by circuit, country, session type, or year.
          </Typography>
        </Box>

        {/* Search bar */}
        <TextField
          fullWidth
          placeholder="Search location, country, session, or year…"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#D4AF37", fontSize: 20 }} />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "rgba(0,0,0,0.3)",
              borderRadius: 0,
              "& fieldset": { borderColor: "rgba(212,175,55,0.35)" },
              "&:hover fieldset": { borderColor: "#D4AF37" },
              "&.Mui-focused fieldset": { borderColor: "#D4AF37" },
            },
            input: { color: "white" },
          }}
        />

        {/* result count + page indicator */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
          <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
            {filteredRaces.length} result{filteredRaces.length !== 1 ? "s" : ""}
            {searchTerm && ` for "${searchTerm}"`}
          </Typography>

          {totalPages > 0 && (
            <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
              Page {currentPage + 1} of {totalPages}
            </Typography>
          )}
        </Box>

        {/* Table */}
        <Box
          sx={{
            border: "1px solid rgba(212,175,55,0.35)",
            backgroundColor: "rgba(0,0,0,0.25)",
            overflow: "hidden",
          }}
        >
          {/* Header row */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 1.2fr 1.5fr 1fr",
              px: 3,
              py: 1.75,
              backgroundColor: "rgba(212,175,55,0.15)",
              borderBottom: "1px solid rgba(212,175,55,0.35)",
            }}
          >
            {["Location", "Year", "Country", "Session"].map((col) => (
              <Typography
                key={col}
                sx={{
                  fontWeight: 700,
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: 3,
                  color: "#D4AF37",
                }}
              >
                {col}
              </Typography>
            ))}
          </Box>

          {/* Loading state — same idea as locationLoaded in the reference project */}
          {!dataLoaded && (
            <Box sx={{ px: 3, py: 5, textAlign: "center" }}>
              <Typography sx={{ color: "rgba(255,255,255,0.3)" }}>
                Loading race data...
              </Typography>
            </Box>
          )}

          {/* Error state — reference project set error messages as state too */}
          {dataLoaded && error && (
            <Box sx={{ px: 3, py: 5, textAlign: "center" }}>
              <Typography sx={{ color: "rgba(255,255,255,0.3)" }}>
                {error}
              </Typography>
            </Box>
          )}

          {/* Data rows */}
          {dataLoaded && !error && rowsOnThisPage.length > 0 &&
            rowsOnThisPage.map((race, index) => (
              <Box
                key={race.session_key}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1.2fr 1.5fr 1fr",
                  px: 3,
                  py: 1.75,
                  borderBottom:
                    index < rowsOnThisPage.length - 1
                      ? "1px solid rgba(255,255,255,0.05)"
                      : "none",
                  "&:hover": { backgroundColor: "rgba(212,175,55,0.06)" },
                  transition: "background 0.15s ease",
                }}
              >
                <Typography sx={{ fontSize: "0.9rem", fontWeight: 500 }}>
                  {race.location}
                </Typography>

                <Typography sx={{ fontSize: "0.9rem", color: "#D4AF37", fontWeight: 700 }}>
                  {race.year}
                </Typography>

                <Typography sx={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.7)" }}>
                  {race.country_name}
                </Typography>

                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.45)",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {race.session_name}
                </Typography>
              </Box>
            ))
          }

          {/* Empty search state */}
          {dataLoaded && !error && rowsOnThisPage.length === 0 && (
            <Box sx={{ px: 3, py: 5, textAlign: "center" }}>
              <Typography sx={{ color: "rgba(255,255,255,0.3)" }}>
                No results match your search.
              </Typography>
            </Box>
          )}
        </Box>

        {/* Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Button
            variant="outlined"
            disabled={currentPage === 0}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            sx={{
              color: "white",
              borderColor: "rgba(212,175,55,0.35)",
              borderRadius: 0,
              px: 3,
              fontSize: "0.75rem",
              letterSpacing: 2,
              textTransform: "uppercase",
              "&:hover": {
                borderColor: "#D4AF37",
                backgroundColor: "rgba(212,175,55,0.15)",
              },
              "&.Mui-disabled": {
                color: "rgba(255,255,255,0.2)",
                borderColor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            ← Previous
          </Button>

          {/* dot indicators — one per page */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <Box
                key={i}
                onClick={() => setCurrentPage(i)}
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  cursor: "pointer",
                  backgroundColor:
                    i === currentPage ? "#D4AF37" : "rgba(255,255,255,0.2)",
                  transition: "background 0.2s ease",
                  "&:hover": {
                    backgroundColor:
                      i === currentPage ? "#D4AF37" : "rgba(255,255,255,0.4)",
                  },
                }}
              />
            ))}
          </Box>

          <Button
            variant="outlined"
            disabled={currentPage === totalPages - 1}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            sx={{
              color: "white",
              borderColor: "rgba(212,175,55,0.35)",
              borderRadius: 0,
              px: 3,
              fontSize: "0.75rem",
              letterSpacing: 2,
              textTransform: "uppercase",
              "&:hover": {
                borderColor: "#D4AF37",
                backgroundColor: "rgba(212,175,55,0.15)",
              },
              "&.Mui-disabled": {
                color: "rgba(255,255,255,0.2)",
                borderColor: "rgba(255,255,255,0.08)",
              },
            }}
          >
            Next →
          </Button>
        </Box>

      </Container>
    </Box>
  );
}

export default ResultsSection;
