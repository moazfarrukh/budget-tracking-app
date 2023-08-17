import React from "react";
import { Grid, TextField } from "@mui/material";
import "../styles/TextInput.css";
interface TextInputProps {
  name: string;
  label: string;
  setFieldState: (value: string) => void;
  field: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  error?: boolean;
  errorText?: string;
  submitted?: boolean;
}

function TextInput({
  name,
  label,
  type,
  required,
  setFieldState,
  defaultValue,
  error,
  errorText,
  field,
  submitted,
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
        error={typeof error == "undefined" ? false : field === "" && submitted}
        helperText={field === "" && submitted ? errorText : ""}
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
