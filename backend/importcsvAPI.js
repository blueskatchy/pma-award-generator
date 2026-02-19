const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const mysql = require("mysql2");

const router = express.Router();

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pma_sample"
});

const upload = multer({ dest: "uploads/" });

router.post("/import-csv", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const results = [];

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {

      const insertQuery = "INSERT INTO sample SET ?";

      results.forEach((row) => {
        db.query(insertQuery, row, (err) => {
          if (err) console.error("Insert error:", err);
        });
      });

      fs.unlinkSync(req.file.path);

      res.json({
        message: "CSV imported successfully!",
        rows: results.length
      });
    });
});

module.exports = router;
