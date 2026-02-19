// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Import CSV routes
const importCSV = require("./importcsvAPI");

app.use(cors());
app.use(express.json());

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
    console.log("📊 Database: pma_sample");
  }
});

// Make db available to routes
app.locals.db = db;

// API route
app.use("/api", importCSV);

// Test endpoint
app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});