import { Box } from "@mui/material";
import { motion } from "framer-motion";

//https://www.framer.com/motion/animation/

const speedLines = [
  { top: "7%",  width: "40%", duration: 2.8, delay: 0.0, gold: false },
  { top: "13%", width: "25%", duration: 2.4, delay: 0.6, gold: false },
  { top: "20%", width: "50%", duration: 3.1, delay: 1.2, gold: true  },
  { top: "28%", width: "30%", duration: 2.6, delay: 0.3, gold: false },
  { top: "36%", width: "20%", duration: 2.2, delay: 1.5, gold: false },
  { top: "44%", width: "45%", duration: 3.0, delay: 0.8, gold: true  },
  { top: "53%", width: "28%", duration: 2.5, delay: 0.1, gold: false },
  { top: "61%", width: "38%", duration: 2.9, delay: 1.0, gold: false },
  { top: "69%", width: "22%", duration: 2.3, delay: 0.4, gold: true  },
  { top: "77%", width: "42%", duration: 3.2, delay: 1.3, gold: false },
  { top: "85%", width: "32%", duration: 2.7, delay: 0.7, gold: false },
  { top: "91%", width: "18%", duration: 2.1, delay: 1.8, gold: false },
]

function AnimatedBackground() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background: "linear-gradient(160deg, #3d000a 0%, #1a0004 45%, #0a0001 100%)",
      }}
    >
      {/* speed lines shooting left to right */}
      {speedLines.map((line, i) => (
        <Box
          key={i}
          component={motion.div}
          animate={{
            x: ["0%", "160%"],
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            delay: line.delay,
            ease: "linear",
            times: [0, 0.1, 0.9, 1],
          }}
          sx={{
            position: "absolute",
            top: line.top,
            left: "-45%",
            width: line.width,
            height: "1px",
            background: line.gold
              ? "linear-gradient(90deg, transparent, rgba(212,175,55,0.8), transparent)"
              : "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />
      ))}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* edge vignette */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </Box>
  );
}

export default AnimatedBackground;
