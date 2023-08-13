import React from "react";
import { Grid, TextField } from "@mui/material";
import "../styles/TextInput.css";
interface TextInputProps {
  name: string;
  label: string;
  setFieldState: (value: string) => void;
  type?: string;
  required?: boolean;
  defaultValue?: string;
}

function TextInput({
  name,
  label,
  type,
  required,
  setFieldState,
  defaultValue,
}: TextInputProps) {
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
        type={typeof type == "undefined" ? "text" : type}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFieldState(e.target.value);
        }}
        defaultValue={defaultValue}
      />
    </Grid>
  );
}

export default TextInput;
