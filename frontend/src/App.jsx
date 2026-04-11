import { Box, Container, Typography } from "@mui/material";

function App() {
  return (
    <Box sx={{ minHeight: "100vh", py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ color: "primary.main", mb: 2 }}>
          Scuderia Ferrari
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Ferrari dashboard coming soon.
        </Typography>
      </Container>
    </Box>
  );
}

export default App;