const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const router = express.Router();
const db = require("./db");

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 200 * 1024 * 1024 }
});

const BATCH_SIZE = 500;

router.post("/import-csv", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  let batch = [];
  let inserted = 0;
  let errors = 0;

  const stream = fs
    .createReadStream(req.file.path)
    .pipe(csv({ mapHeaders: ({ header }) => header.trim().toLowerCase() }));

  function insertBatch(batchData, callback) {
    if (batchData.length === 0) return callback();

    const sql = `
      INSERT INTO sample
      (afpsn,lname,fname,mname,initls,coy,servid,oyrgr,class,term,acadyr,cunits,crsegrade,cname,ccode,ctype,cdesc)
      VALUES ?
      ON DUPLICATE KEY UPDATE
        lname=VALUES(lname),
        fname=VALUES(fname),
        mname=VALUES(mname),
        initls=VALUES(initls),
        coy=VALUES(coy),
        servid=VALUES(servid),
        oyrgr=VALUES(oyrgr),
        class=VALUES(class),
        term=VALUES(term),
        acadyr=VALUES(acadyr),
        cunits=VALUES(cunits),
        crsegrade=VALUES(crsegrade),
        cname=VALUES(cname),
        ccode=VALUES(ccode),
        ctype=VALUES(ctype),
        cdesc=VALUES(cdesc)
    `;

    db.query(sql, [batchData], (err, result) => {
      if (err) {
        console.error("BATCH INSERT ERROR:", err.sqlMessage);
        errors += batchData.length;
      } else {
        inserted += result.affectedRows;
      }
      callback();
    });
  }

  stream.on("data", (row) => {
    const values = [
      row.afpsn,
      row.lname,
      row.fname,
      row.mname,
      row.initls,
      row.coy,
      row.servid,
      row.oyrgr,
      row.class,
      row.term,
      row.acadyr,
      row.cunits,
      row.crsegrade,
      row.cname,
      row.ccode,
      row.ctype,
      row.cdesc
    ];

    if (!row.afpsn) return;

    batch.push(values);

    if (batch.length >= BATCH_SIZE) {
      stream.pause();
      insertBatch(batch, () => {
        batch = [];
        stream.resume();
      });
    }
  });

  stream.on("end", () => {
    insertBatch(batch, () => {
      fs.unlinkSync(req.file.path);
      res.json({
        message: "CSV import completed",
        inserted,
        errors
      });
    });
  });

  stream.on("error", (err) => {
    console.error("CSV error:", err);
    fs.unlinkSync(req.file.path);
    res.status(500).json({ message: "CSV processing failed" });
  });
});

module.exports = router;