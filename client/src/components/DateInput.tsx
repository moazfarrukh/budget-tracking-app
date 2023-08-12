import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

interface DateInputProps {
  label: string;
}

function DateInput({ label }: DateInputProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField
        fullWidth
        label={label}
        sx={{ marginBottom: "15px" }}
        defaultValue={dayjs("2023-08-11")}
      />
    </LocalizationProvider>
  );
}

export default DateInput;
