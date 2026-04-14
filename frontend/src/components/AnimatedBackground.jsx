import { Box } from "@mui/material";
import { motion } from "framer-motion";

// I referenced this Framer Motion tutorial for the animation patterns:
// https://www.framer.com/motion/animation/

function AnimatedBackground() {
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background:
          "linear-gradient(135deg, #5b0010 0%, #7a0018 35%, #4a000d 65%, #190004 100%)",
      }}
    >
      {/* main left dark panel */}
      <Box
        component={motion.div}
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "10%",
          left: "-8%",
          width: "720px",
          height: "150px",
          transform: "rotate(-18deg)",
          background: "rgba(0, 0, 0, 0.20)",
        }}
      />

      {/* secondary middle panel */}
      <Box
        component={motion.div}
        animate={{ x: [0, -24, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "48%",
          left: "25%",
          width: "620px",
          height: "110px",
          transform: "rotate(-18deg)",
          background: "rgba(0, 0, 0, 0.14)",
        }}
      />

      {/* subtle accent panel */}
      <Box
        component={motion.div}
        animate={{ x: [0, 20, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        sx={{
          position: "absolute",
          top: "68%",
          left: "62%",
          width: "420px",
          height: "90px",
          transform: "rotate(-18deg)",
          background: "rgba(0, 0, 0, 0.10)",
        }}
      />

      {/* thin white accent */}
      <Box
        component={motion.div}
        animate={{ x: [0, -16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "28%",
          left: "18%",
          width: "420px",
          height: "28px",
          transform: "rotate(-18deg)",
          background: "rgba(255, 255, 255, 0.06)",
        }}
      />

      {/* gold accent streak — top right */}
      <Box
        component={motion.div}
        animate={{ x: [0, -20, 0], opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "15%",
          right: "-4%",
          width: "500px",
          height: "3px",
          transform: "rotate(-18deg)",
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)",
        }}
      />

      {/* gold accent streak — bottom left */}
      <Box
        component={motion.div}
        animate={{ x: [0, 18, 0], opacity: [0.12, 0.22, 0.12] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        sx={{
          position: "absolute",
          bottom: "22%",
          left: "5%",
          width: "380px",
          height: "2px",
          transform: "rotate(-18deg)",
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
        }}
      />

      {/* edge vignette */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 48%, rgba(0,0,0,0.22) 100%)",
        }}
      />
    </Box>
  );
}

export default AnimatedBackground;
