// importcsvAPI.js
const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const router = express.Router();
const db = require("./db");

// Ensure uploads folder exists
const upload = multer({ dest: "uploads/" });

router.post("/import-csv", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  const results = [];
  let insertCount = 0;
  let updateCount = 0;
  let errorCount = 0;

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", row => results.push(row))
    .on("end", () => {
      const processRow = (index) => {
        if (index >= results.length) {
          fs.unlinkSync(req.file.path);
          return res.json({
            message: "CSV import completed",
            totalRows: results.length,
            inserted: insertCount,
            updated: updateCount,
            errors: errorCount
          });
        }

        const row = results[index];
        const data = {
          afpsn: row.afpsn || row.i_afpsn,
          lname: row.lname || row.lastname,
          fname: row.fname || row.firstname,
          mname: row.mname || row.middlename,
          cunits: row.cunits || row.units,
          crsegrade: row.crsegrade || row.grade
        };

        if (!data.afpsn) {
          errorCount++;
          return processRow(index + 1);
        }

        db.query("SELECT afpsn FROM sample WHERE afpsn = ?", [data.afpsn], (err, existing) => {
          if (err) { errorCount++; return processRow(index + 1); }

          if (existing.length > 0) {
            db.query("UPDATE sample SET ? WHERE afpsn = ?", [data, data.afpsn], (err) => {
              if (err) errorCount++; else updateCount++;
              processRow(index + 1);
            });
          } else {
            db.query("INSERT INTO sample SET ?", data, (err) => {
              if (err) errorCount++; else insertCount++;
              processRow(index + 1);
            });
          }
        });
      };

      processRow(0);
    })
    .on("error", err => {
      console.error("CSV error:", err);
      fs.unlinkSync(req.file.path);
      res.status(500).json({ message: "CSV processing failed" });
    });
});

// Optional: Get all records
router.get("/sample", (req, res) => {
  db.query("SELECT * FROM sample", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

module.exports = router;