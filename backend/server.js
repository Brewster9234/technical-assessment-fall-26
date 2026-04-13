const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/api/ferrari-results", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.openf1.org/v1/sessions?year=2024&session_name=Race"
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.log("Error fetching API data:", error);
    res.status(500).json({ error: "Failed to fetch Ferrari data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});