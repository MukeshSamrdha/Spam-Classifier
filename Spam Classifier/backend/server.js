const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
console.log("HI")
// test route (optional but useful)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// main route
app.post("/api/predict", async (req, res) => {
  try {
    const { text } = req.body;

    // basic validation
    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // call Python API
    const response = await axios.post("http://localhost:5000/predict", {
      text: text,
    });

    // send back result
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);

    res.status(500).json({
      error: "Failed to connect to ML model",
    });
  }
});

// start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
