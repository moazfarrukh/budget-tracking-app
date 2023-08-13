import { Box, Button } from "@mui/material";
import { LocalizationProvider, DateField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { filterButtonStyle } from "../styles/filterbydate";
import { useContext } from "react";
import filterContext from "../contexts/filterContext";
import { filterContextType } from "../types/Budget";

function FilterByDate() {
  const { filterDate, filterToggle, setFilterToggle, setFilterDate } =
    useContext(filterContext) as filterContextType;
  const handleDateChange = (TValue: Dayjs | null) => {
    if (TValue !== null) {
      setFilterDate(TValue.toDate());
    }
  };
  return (
    <Box display="flex" gap="10px">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateField
          label="Filter by Date"
          defaultValue={dayjs(new Date())}
          onChange={handleDateChange}
        />
      </LocalizationProvider>

      <Button
        type="submit"
        sx={filterButtonStyle}
        onClick={() => {
          setFilterToggle(!filterToggle);
        }}
      >
        {filterToggle ? "All Records" : "Filter Records"}
      </Button>
    </Box>
  );
}

export default FilterByDate;
