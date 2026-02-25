// importcsvAPI.js
const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const router = express.Router();
const db = require("./db");

// Ensure uploads folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const upload = multer({ dest: "uploads/" });

router.post("/import-csv", upload.single("file"), (req, res) => {
  console.log("Uploaded file:", req.file);

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const results = [];
  let insertCount = 0;
  let updateCount = 0;
  let errorCount = 0;

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", row => {
      console.log("ROW:", row);
      results.push(row);
    })
    .on("end", () => {
      const processRow = (index) => {
        if (index >= results.length) {
          if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
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
          afpsn: row.afpsn,
          lname: row.lname,
          fname: row.fname,
          mname: row.mname,
          initls: row.initls,
          coy: row.coy,
          servid: row.servid,
          oyrgr: row.oyrgr,
          class: row.class,
          term: row.term,
          acadyr: row.acadyr,
          cunits: row.cunits,
          crsegrade: row.crsegrade,
          cname: row.cname,
          ccode: row.ccode,
          ctype: row.ctype,
          cdesc: row.cdesc
        };

        if (!data.afpsn) {
          console.error("Missing afpsn:", row);
          errorCount++;
          return processRow(index + 1);
        }

        db.query("SELECT afpsn FROM sample WHERE afpsn = ?", [data.afpsn], (err, existing) => {
          if (err) {
            console.error("SELECT error:", err.sqlMessage);
            errorCount++;
            return processRow(index + 1);
          }

          if (existing.length > 0) {
            db.query("UPDATE sample SET ? WHERE afpsn = ?", [data, data.afpsn], (err) => {
              if (err) {
                console.error("UPDATE error:", err.sqlMessage);
                errorCount++;
              } else {
                updateCount++;
              }
              processRow(index + 1);
            });
          } else {
            db.query("INSERT INTO sample SET ?", data, (err) => {
              if (err) {
                console.error("INSERT error:", err.sqlMessage);
                errorCount++;
              } else {
                insertCount++;
              }
              processRow(index + 1);
            });
          }
        });
      };

      processRow(0);
    })
    .on("error", err => {
      console.error("CSV parsing error:", err);
      if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      res.status(500).json({ message: "CSV processing failed" });
    });
});

module.exports = router;