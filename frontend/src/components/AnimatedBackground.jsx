import { Box } from "@mui/material";
import { motion } from "framer-motion";

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
      {/* bigah left dark panel */}
      <Box
        component={motion.div}
        animate={{ x: [0, 40, 0], rotate: [-18, -15, -18] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "10%",
          left: "-8%",
          width: "720px",
          height: "150px",
          background: "rgba(0, 0, 0, 0.20)",
        }}
      />

      {/* secondary midah panel */}
      <Box
        component={motion.div}
        animate={{ x: [0, -34, 0], rotate: [-18, -22, -18] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "48%",
          left: "25%",
          width: "620px",
          height: "110px",
          background: "rgba(0, 0, 0, 0.14)",
        }}
      />

      {/* accent */}
      <Box
        component={motion.div}
        animate={{ x: [0, 28, 0], y: [0, -15, 0] }}
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
      <Box
        component={motion.div}
        animate={{ x: [0, -24, 0], opacity: [0.06, 0.12, 0.06] }}
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
      <Box
        component={motion.div}
        animate={{ x: [0, -30, 0], opacity: [0.18, 0.4, 0.18] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "15%",
          right: "-4%",
          width: "500px",
          height: "3px",
          transform: "rotate(-18deg)",
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)",
        }}
      />
      <Box
        component={motion.div}
        animate={{ x: [0, 26, 0], opacity: [0.12, 0.3, 0.12] }}
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
      <Box
        component={motion.div}
        animate={{ x: [0, -20, 0], opacity: [0.08, 0.2, 0.08] }}
        transition={{
          duration: 17,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        sx={{
          position: "absolute",
          top: "55%",
          right: "10%",
          width: "300px",
          height: "2px",
          transform: "rotate(-18deg)",
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.35), transparent)",
        }}
      />

      {/*particles */}
      {[
        { top: "20%", left: "10%", delay: 0 },
        { top: "60%", left: "80%", delay: 1.5 },
        { top: "40%", left: "50%", delay: 3 },
        { top: "75%", left: "30%", delay: 2 },
        { top: "15%", left: "70%", delay: 4 },
        { top: "85%", left: "60%", delay: 0.5 },
      ].map((p, i) => (
        <Box
          key={i}
          component={motion.div}
          animate={{
            y: [0, -18, 0],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
          sx={{
            position: "absolute",
            top: p.top,
            left: p.left,
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            backgroundColor: "#D4AF37",
          }}
        />
      ))}

      {/*glow in center */}
      <Box
        component={motion.div}
        animate={{ opacity: [0.04, 0.1, 0.04], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        sx={{
          position: "absolute",
          top: "30%",
          left: "40%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* edge vignette */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 48%, rgba(0,0,0,0.28) 100%)",
        }}
      />
    </Box>
  );
}

export default AnimatedBackground;