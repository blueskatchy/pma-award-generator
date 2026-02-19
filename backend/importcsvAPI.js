// importcsvAPI.js
const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const mysql = require("mysql2");

const router = express.Router();

// MySQL connection (using the same connection or create a new one)
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
  let successCount = 0;
  let errorCount = 0;
  let updateCount = 0;
  let insertCount = 0;

  console.log("📁 Processing CSV file:", req.file.originalname);

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      console.log(`📊 Found ${results.length} rows in CSV`);

      // Process each row
      const processRow = (index) => {
        if (index >= results.length) {
          // All done
          fs.unlinkSync(req.file.path);
          
          return res.json({
            message: "CSV import completed!",
            totalRows: results.length,
            inserted: insertCount,
            updated: updateCount,
            errors: errorCount
          });
        }

        const row = results[index];
        
        // Map CSV columns to database columns
        // Adjust these column names based on your CSV headers
        const data = {
          afpsn: row.afpsn || row.i_afpsn || null,
          lname: row.lname || row.lastname || null,
          fname: row.fname || row.firstname || null,
          mname: row.mname || row.middlename || null,
          initls: row.initls || row.initials || null,
          coy: row.coy || null,
          servid: row.servid || row.service_id || null,
          oyrgr: row.oyrgr || row.year_graduated || null,
          class: row.class || null,
          term: row.term || null,
          acadyr: row.acadyr || row.academic_year || null,
          cunits: row.cunits || row.units || null,
          crsegrade: row.crsegrade || row.grade || null,
          cname: row.cname || row.course_name || null,
          ccode: row.ccode || row.course_code || null,
          ctype: row.ctype || row.course_type || null,
          cdesc: row.cdesc || row.description || null
        };

        // Check if record exists (using afpsn as unique identifier)
        db.query("SELECT * FROM sample WHERE afpsn = ?", [data.afpsn], (err, existing) => {
          if (err) {
            console.error("❌ Query error:", err);
            errorCount++;
            return processRow(index + 1);
          }

          if (existing && existing.length > 0) {
            // Update existing record
            db.query("UPDATE sample SET ? WHERE afpsn = ?", [data, data.afpsn], (err) => {
              if (err) {
                console.error("❌ Update error for afpsn:", data.afpsn, err);
                errorCount++;
              } else {
                updateCount++;
                console.log(`✅ Updated: ${data.afpsn}`);
              }
              processRow(index + 1);
            });
          } else {
            // Insert new record
            db.query("INSERT INTO sample SET ?", data, (err) => {
              if (err) {
                console.error("❌ Insert error:", err);
                errorCount++;
              } else {
                insertCount++;
                console.log(`✅ Inserted: ${data.afpsn || 'new record'}`);
              }
              processRow(index + 1);
            });
          }
        });
      };

      // Start processing from first row
      processRow(0);
    })
    .on("error", (error) => {
      console.error("CSV parsing error:", error);
      fs.unlinkSync(req.file.path);
      res.status(500).json({ 
        message: "Error processing CSV", 
        error: error.message 
      });
    });
});

// Optional: Get all records
router.get("/sample", (req, res) => {
  db.query("SELECT * FROM sample", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Optional: Get record by afpsn
router.get("/sample/:afpsn", (req, res) => {
  db.query("SELECT * FROM sample WHERE afpsn = ?", [req.params.afpsn], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0] || { message: "Not found" });
  });
});

module.exports = router;