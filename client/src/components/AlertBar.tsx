import React, { Dispatch, SetStateAction } from "react";
import { Snackbar, Alert, AlertColor, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface AlertBarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  text: string;
  severity?: AlertColor;
  vertical?: "top" | "bottom";
  horizontal?: "center" | "left" | "right";
}
function AlertBar({
  open,
  setOpen,
  text,
  severity,
  vertical,
  horizontal,
}: AlertBarProps) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
  };

  // default values
  if (!vertical) {
    vertical = "bottom";
  }
  if (!horizontal) {
    horizontal = "right";
  }

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: vertical, horizontal: horizontal }}
        onClose={handleClose}
      >
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity={severity}
        >
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default AlertBar;
