// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",             // your MySQL username
  password: "",             // your MySQL password
  database: "test" // replace with your DB name
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
  db.query("SELECT 1 + 1 AS test", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// Start server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
