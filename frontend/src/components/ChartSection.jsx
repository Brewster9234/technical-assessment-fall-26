import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// I referenced Recharts docs for the BarChart + ResponsiveContainer
// setup: https://recharts.org/en-US/api/BarChart
// and this beginner walkthrough: https://www.freecodecamp.org/news/how-to-build-a-react-data-visualization-chart/

function ChartSection() {
  const [pointsData, setPointsData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [error, setError] = useState("");

  // same named async function pattern used in the reference project (background.jsx)
  const fetchPointsData = async () => {
    try {
      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
      const response = await fetch(`${backendUrl}/api/ferrari-points?year=2025`)

      if (!response.ok) {
        setError("error fetching points data");
        return;
      }

      const data = await response.json();
      setPointsData(data);
    } catch (err) {
      console.error("error fetching points data:", err);
      setError("error fetching points data");
    } finally {
      setDataLoaded(true);
    }
  };

  useEffect(() => {
    fetchPointsData();
  }, []);

  // custom tooltip that shows on hover
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: "rgba(0,0,0,0.85)",
            border: "1px solid rgba(212,175,55,0.4)",
            px: 2,
            py: 1.5,
          }}
        >
          <Typography
            sx={{ color: "#D4AF37", fontSize: "0.75rem", letterSpacing: 2, textTransform: "uppercase" }}
          >
            {label}
          </Typography>
          <Typography sx={{ color: "white", fontSize: "0.9rem", fontWeight: 700, mt: 0.5 }}>
            {payload[0].value} pts
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ py: 12 }}>
      <Container maxWidth="lg">

        {/* Section header */}
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
            Season Analysis
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
            Points Per Race
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
             Points Ferrari scored in each race of the 2025 season.
          </Typography>
        </Box>

        {/* Chart area */}
        <Box
          sx={{
            border: "1px solid rgba(212,175,55,0.35)",
            backgroundColor: "rgba(0,0,0,0.25)",
            p: { xs: 2, md: 4 },
          }}
        >
          {/* Loading state */}
          {!dataLoaded && (
            <Box sx={{ py: 8, textAlign: "center" }}>
              <Typography sx={{ color: "rgba(255,255,255,0.3)" }}>
                Loading points data...
              </Typography>
            </Box>
          )}

          {/* Error state */}
          {dataLoaded && error && (
            <Box sx={{ py: 8, textAlign: "center" }}>
              <Typography sx={{ color: "rgba(255,255,255,0.3)" }}>
                {error}
              </Typography>
            </Box>
          )}

          {/* The actual chart */}
          {dataLoaded && !error && pointsData.length > 0 && (
            // ResponsiveContainer makes the chart resize with the screen —
            // I found this is the standard way to make Recharts charts responsive
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={pointsData}
                margin={{ top: 10, right: 10, left: 0, bottom: 60 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                  vertical={false}
                />

                {/* X axis — circuit names, rotated so they don't overlap */}
                <XAxis
                  dataKey="location"
                  tick={{
                    fill: "rgba(255,255,255,0.4)",
                    fontSize: 11,
                  }}
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                  axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                  tickLine={false}
                />

                {/* Y axis — points */}
                <YAxis
                  tick={{
                    fill: "rgba(255,255,255,0.4)",
                    fontSize: 11,
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(212,175,55,0.05)" }}
                />

                <Bar dataKey="points" radius={[2, 2, 0, 0]}>
                  {pointsData.map((entry, index) => (
                    // alternating between full gold and dimmer gold
                    // gives the bars some visual rhythm
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index % 2 === 0
                          ? "#D4AF37"
                          : "rgba(212,175,55,0.55)"
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </Box>

      </Container>
    </Box>
  );
}

export default ChartSection;
