import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

dotenv.config();

// Environment variables
const PORT = process.env.PORT || 3000;
const DOCAMATIC_API_KEY = process.env.DOCAMATIC_API_KEY || "";

// Cache duration
const CACHE_DURATION = 60 * 5 * 1000; // For example, 5 minutes

// Initialize Express
const app = express();
app.use(bodyParser.json());

// Define a base GET home endpoint
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Blockuchain" });
  console.log("Welcome to Blockuchain");
});

const cache = {};

// Define a POST endpoint to generate PDFs
app.post("/generate-pdf", async (req, res) => {
  const cacheKey = sortedStringify(req.body);

  if (cache[cacheKey]) {
    if (Date.now() - cache[cacheKey].timestamp < CACHE_DURATION) {
      res.json(cache[cacheKey]);
      return;
    }
  }

  try {
    const { title, signature1, signature2, etherscan, txHash } = req.body;

    const templateJSON = {
      template: "qr_label",
      width: 8,
      height: 8,
      unit: "in",
      test: true,
      data: {
        title: `${title}`,
        subtitle: `Signature 1: ${signature1} / \nSignature 2: ${signature2}`,
        qr: `${etherscan}`,
        label: `Transaction: ${txHash}`,
      },
    };

    // Call Docamatic API
    const docResponse = await fetch("https://docamatic.com/api/v1/template", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${DOCAMATIC_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(templateJSON),
    });

    const jsonResponse = await docResponse.json();
    if (docResponse.ok) {
      cache[cacheKey] = {
        timestamp: Date.now(),
        data: "https://docamatic.s3.eu-west-1.amazonaws.com/prod/72884da3-501f-4a93-ba24-b71af2586b3c/b70f1202-0617-45be-b748-ac1d60b604f9.pdf", // jsonResponse,
      };
      res.json(cache[cacheKey]);
    } else {
      res.status(docResponse.status).json(jsonResponse);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// A function to sort the keys of the JSON object and stringify it
function sortedStringify(obj) {
  const sortedKeys = Object.keys(obj).sort();
  const sortedObj = {};
  for (const key of sortedKeys) {
    sortedObj[key] = obj[key];
  }
  return JSON.stringify(sortedObj);
}
