import React from "react";
import "./Output.css";
import { Box } from "@mui/material";

interface Props {
  pdfUrl: string;
}

const Output: React.FC<Props> = ({ pdfUrl }) => {
  return (
    <div className="output">
      {pdfUrl && (
        <Box mt={4} maxWidth={"100%"}>
          <div style={{ width: "100%", margin: "0 auto" }}>
            <embed
              src={pdfUrl}
              type="application/pdf"
              width="100%"
              height="700px" // Adjust the height to fit the entire PDF content
            />
          </div>
        </Box>
      )}
    </div>
  );
};

export default Output;
