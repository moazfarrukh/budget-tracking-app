import { IconButton, MenuItem, Menu } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useContext, useState } from "react";

import { authenticatedContextType, authenticatedContext } from "../index";

function Logout() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { setAuthenticated } = useContext(
    authenticatedContext
  ) as authenticatedContextType;
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.removeItem("token");
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton size="large" onClick={handleMenu} color="inherit">
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

export default Logout;
