import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

interface DateInputProps {
  label: string;
  setDate: (date: Dayjs | null) => void;
  defaultValue?: Dayjs | null;
}

function DateInput({ label, setDate, defaultValue }: DateInputProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField
        fullWidth
        label={label}
        sx={{ marginBottom: "15px" }}
        defaultValue={
          typeof defaultValue === "undefined" ? dayjs() : defaultValue
        }
        onChange={setDate}
      />
    </LocalizationProvider>
  );
}

export default DateInput;
