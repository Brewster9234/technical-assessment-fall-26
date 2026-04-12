import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import AnimatedBackground from "./components/AnimatedBackground";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <AnimatedBackground />
      <Box sx={{position: "relative", zIndex: 1}}>
        <Navbar />
        <Hero />
        <Stats />
        <Box sx={{height: "120vh"}}/>
      </Box>
    </>
  );
}

export default App;