// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express(); // ✅ create app FIRST

const importCSV = require("./importcsvAPI"); // make sure filename matches exactly
const latinAPI = require("./LatinAPI");

app.use(cors());
app.use(express.json());

// API route
app.use("/api", importCSV);
app.use("/api", latinAPI);

// Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pma_sample"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL!");
  }
});

// Test endpoint
app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});

// Start server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
