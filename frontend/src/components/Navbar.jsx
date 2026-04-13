import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

// each nav item maps to the id of a section on the page
const navLinks = [
  { label: "Home", target: "hero" },
  { label: "Results", target: "results" },
  { label: "Stats", target: "stats" },
];

function Navbar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "rgba(40, 0, 8, 0.45)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
        <Typography
          variant="h6"
          sx={{ color: "text.primary", fontWeight: 700, letterSpacing: 0.5 }}
        >
          Ferrari
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          {navLinks.map((link) => (
            <Button
              key={link.label}
              onClick={() => scrollToSection(link.target)}
              sx={{
                color: "text.primary",
                borderRadius: 0,
                px: 1,
                minWidth: "auto",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  bottom: 4,
                  width: "100%",
                  height: "2px",
                  backgroundColor: "#D4AF37",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.2s ease",
                },
                "&:hover::after": {
                  transform: "scaleX(1)",
                },
              }}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;