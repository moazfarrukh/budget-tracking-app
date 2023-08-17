import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  authenticatedContextType,
  Logout,
  authenticatedContext,
} from "../index";

function Navbar() {
  const navigate = useNavigate();

  const { authenticated } = useContext(
    authenticatedContext
  ) as authenticatedContextType;

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
            Analytics
          </Button>
        </Box>
        {authenticated ? (
          <Logout />
        ) : (
          <Button
            onClick={() => {
              navigate("/login");
            }}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
