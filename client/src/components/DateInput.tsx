import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

interface DateInputProps {
  label: string;
  setDate: (date: Date) => void;
  defaultValue?: Dayjs | null;
}

function DateInput({ label, setDate, defaultValue }: DateInputProps) {
  const handleDateChange = (TValue: Dayjs | null) => {
    if (TValue !== null) {
      setDate(TValue.toDate());
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        sx={{ marginBottom: "15px", width: "100%" }}
        defaultValue={
          typeof defaultValue === "undefined" ? dayjs() : defaultValue
        }
        onChange={handleDateChange}
      />
    </LocalizationProvider>
  );
}

export default DateInput;
