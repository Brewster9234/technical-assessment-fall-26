import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import ResultsSection from "./components/ResultsSection";
import AnimatedBackground from "./components/AnimatedBackground";
import ChartSection from './components/ChartSection'
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <AnimatedBackground />
      <Box sx={{position: "relative", zIndex: 1}}>
        <Navbar />
        <div id="hero">
          <Hero />
        </div>
        <Stats />
        <div id="results">
          <ResultsSection />
        </div>
        <div id="stats">
          <ChartSection />
        </div>
      </Box>
    </>
  );
}

export default App;