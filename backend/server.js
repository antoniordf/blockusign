import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import User from "./models/User.js";
import Signature from "./models/Signature.js";
import Contract from "./models/Contract.js";

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

// Endpoint to add a new user to the postgres database
app.post("/add-user", async (req, res) => {
  try {
    const newUser = await User.create(req.body.walletAddress);
    res.json({ message: "User added", user: newUser });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// Endpoint to add a new contract
app.post("/add-contract", async (req, res) => {
  const { userId, contractText } = req.body;

  try {
    if (!userId || !contractText) {
      return res.status(400).json({ error: "Missing userId or contractText" });
    }

    const newContract = await Contract.create(userId, contractText);
    res.json({ message: "Contract added", contract: newContract });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// Endpoint to record signatures
app.post("/record-signature", async (req, res) => {
  try {
    const { userId, contractId, signatureHash } = req.body;

    // check here if the user and contract actually exist for example, using User.findById(userId) and Contract.findById(contractId)
    if (!(userId && contractId)) {
      return res.status(400).json({ error: "User or contract does not exist" });
    }

    const newSignature = await Signature.create(
      userId,
      contractId,
      signatureHash
    );
    if (newSignature) {
      res.json({ message: "Signature recorded", signature: newSignature });
    } else {
      res.status(400).json({ error: "Signature could not be recorded" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// Endpoint to count signatures
app.get("/contract/:id/signatures", async (req, res) => {
  try {
    const contractId = parseInt(req.params.id);
    const signatoriesCount = await Contract.countSignatures(contractId);
    const signatoriesList = await Contract.listSignatories(contractId);

    res.json({
      contractId: contractId,
      numberOfSignatures: signatoriesCount,
      signatories: signatoriesList,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
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
        data: jsonResponse,
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
