import React from "react";
import { Grid, TextField } from "@mui/material";
import "../styles/TextInput.css";
interface TextInputProps {
  name: string;
  label: string;
  setFieldState: (value: number) => void;
  required?: boolean;
}

function NumberInput({ name, label, required, setFieldState }: TextInputProps) {
  return (
    <Grid
      className="text-input"
      sx={{ marginBottom: "15px", width: "100%" }}
      item
      xs={12}
    >
      <TextField
        variant="outlined"
        required={required}
        fullWidth
        label={label}
        name={name}
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFieldState(+e.target.value);
        }}
      />
    </Grid>
  );
}

export default NumberInput;
