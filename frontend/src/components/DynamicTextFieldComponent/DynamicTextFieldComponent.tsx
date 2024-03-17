import React, { useState } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import styles from "../../app/page.module.css";

interface Props {
  textFields: TextFieldData[];
  setTextFields: React.Dispatch<React.SetStateAction<TextFieldData[]>>;
  handleTextFieldChange: (index: number, value: string) => void;
  pkFields: TextFieldData[];
  setpkFields: React.Dispatch<React.SetStateAction<TextFieldData[]>>;
  handlepkFieldChange: (index: number, value: string) => void;
}

interface TextFieldData {
  value: string;
}

const DynamicTextFieldComponent: React.FC<Props> = ({
  textFields,
  setTextFields,
  handleTextFieldChange,
  pkFields,
  setpkFields,
  handlepkFieldChange,
}) => {
  const addTextField = () => {
    setTextFields([...textFields, { value: "" }]);
    setpkFields([...pkFields, { value: "" }]);
  };

  return (
    <div>
      <Box mt={2}>
        {textFields.map((textField, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            mt={1}
            style={{ gap: "10px" }}
          >
            <TextField
              label={`Address ${index + 1}`}
              color="secondary"
              value={textField.value}
              onChange={(e) => handleTextFieldChange(index, e.target.value)}
              fullWidth
              InputProps={{ style: { backgroundColor: "white" } }}
              variant="outlined"
              margin="normal"
            />
            <TextField
              label={`Signature ${index + 1}`}
              value={pkFields[index].value}
              onChange={(e) => handlepkFieldChange(index, e.target.value)}
              fullWidth
              InputProps={{ style: { backgroundColor: "white" } }}
              variant="outlined"
              color="secondary"
              margin="normal"
            />
          </Box>
        ))}
      </Box>
      <Button
        variant="contained"
        onClick={addTextField}
        className={styles.actionButton}
        style={{
          marginBottom: "10px",
          marginTop: "10px",
          textTransform: "capitalize",
        }}
      >
        Add Signer
      </Button>
    </div>
  );
};

export default DynamicTextFieldComponent;
