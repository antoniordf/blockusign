import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

interface CustomTextFieldProps {
  label: string;
  variant?: "outlined" | "filled" | "standard";
  labelColor?: string; // Add a new prop for label color
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  variant = "outlined",
  labelColor = "white",
}) => {
  return (
    <TextField
      id={label.toLowerCase().replace(/\s/g, "-")}
      label={label}
      variant={variant}
      InputLabelProps={{ style: { color: labelColor } }} // Set label color
    />
  );
};

export default function MyForm() {
  return (
    <Box
      component="form"
      sx={{
        border: "1px white solid",
        borderRadius: "10px",
        color: "white",
        display: "flex",
        margin: "0 auto",
        alignItems: "center",
        "& > :not(style)": { m: 0, width: "60ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <CustomTextField
        label="Type here"
        variant="outlined"
        labelColor="white"
      />
    </Box>
  );
}
