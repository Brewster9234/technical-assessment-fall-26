import { AppBar, Toolbar, Typography, Button } from "@mui/material";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Ferrari
        </Typography>

        <Button color="inherit">Home</Button>
        <Button color="inherit">Results</Button>
        <Button color="inherit">Stats</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;