import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import User from "./models/User.js";
import Signature from "./models/Signature.js";
import Document from "./models/Document.js";
import proposeSafe from "../safe/test_safe.js";

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

// Endpoint to retrieve a specific user from the postgres database
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// Endpoint to retrieve a specific document from the postgres database
app.get("/document/:id", async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (document) {
      res.json({ document });
    } else {
      res.status(404).json({ error: "Document not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
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

// Endpoint to add a new document to the postgres database
app.post("/add-document", async (req, res) => {
  const { userId, documentText, signers } = req.body;

  try {
    if (
      !userId ||
      !documentText ||
      !Array.isArray(signers) ||
      signers.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "Missing or invalid userId, documentText, or signers" });
    }

    const newDocument = await Document.create(userId, documentText, signers);
    res.json({ message: "Document added", document: newDocument });
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
    const { userId, documentId, signatureHash } = req.body;

    // check here if the user and document actually exist for example, using User.findById(userId) and document.findById(documentId)
    if (!(userId && documentId)) {
      return res.status(400).json({ error: "User or document does not exist" });
    }

    const newSignature = await Signature.create(
      userId,
      documentId,
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

// Endpoint to retrieve signatures
app.get("/document/:id/signatures", async (req, res) => {
  try {
    const documentId = parseInt(req.params.id);
    const signatoriesCount = await Document.countSignatures(documentId);
    const signatoriesList = await Document.listSignatories(documentId);

    res.json({
      documentId: documentId,
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

// Safe test endpoint
app.post("/safe-test", async (req, res) => {
  try {
    const { addresses } = req.body;

    const result = proposeSafe(addresses);

    res.json({ result });
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
