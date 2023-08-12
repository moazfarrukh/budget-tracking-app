import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

interface DateInputProps {
  label: string;
  setDate: (date: Dayjs | null) => void;
}

function DateInput({ label, setDate }: DateInputProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField
        fullWidth
        label={label}
        sx={{ marginBottom: "15px" }}
        defaultValue={dayjs("2023-08-11")}
        onChange={setDate}
      />
    </LocalizationProvider>
  );
}

export default DateInput;
