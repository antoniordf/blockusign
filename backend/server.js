import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

dotenv.config();

// Environment variables
const PORT = process.env.PORT || 3000;
const DOCAMATIC_API_KEY = process.env.DOCAMATIC_API_KEY || "";

// Initialize Express
const app = express();
app.use(bodyParser.json());

// Define a base GET home endpoint
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Blockuchain" });
  console.log("Welcome to Blockuchain");
});

// Define a POST endpoint to generate PDFs
app.post("/generate-pdf", async (req, res) => {
  try {
    const { source, format, media } = req.body;

    // Call Docamatic API
    const docResponse = await fetch("https://docamatic.com/api/v1/pdf", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${DOCAMATIC_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ source, format, media }),
    });

    const jsonResponse = await docResponse.json();
    if (docResponse.ok) {
      res.json(jsonResponse);
    } else {
      res.status(docResponse.status).json(jsonResponse);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
