import { Box, Button } from "@mui/material";
import { LocalizationProvider, DateField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";

function FilterByDate() {
  return (
    <Box display="flex" gap="10px">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField label="Filter by Date" defaultValue={dayjs("2023-08-11")} />
      </LocalizationProvider>

      <Button
        type="submit"
        sx={{
          backgroundColor: "orange",
          borderColor: "green",
          textTransform: "none",

          color: "black",
          ":hover": {
            bgcolor: "darkorange",
          },
        }}
      >
        Filter Records
      </Button>
    </Box>
  );
}

export default FilterByDate;
