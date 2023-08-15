import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { Link as Navlink, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
function Navbar() {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ backgroundColor: "#4d4d4d" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Budget Tracker
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Button
            onClick={() => {
              navigate("/budget");
            }}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Budget
          </Button>
          <Button
            onClick={() => {
              navigate("/analytics");
            }}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Analytics{" "}
          </Button>
        </Box>

        <IconButton size="large" color="inherit">
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
