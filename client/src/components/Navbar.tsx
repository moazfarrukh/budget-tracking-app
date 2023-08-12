import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from '@mui/icons-material/AccountCircle';

function Navbar() {
    return (
       
          <AppBar position="static" sx={{backgroundColor:"#4d4d4d"}}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                Budget Tracker
              </Typography>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit">
                    <AccountCircle />
                  </IconButton>
            </Toolbar>
          </AppBar>
      );
}

export default Navbar
