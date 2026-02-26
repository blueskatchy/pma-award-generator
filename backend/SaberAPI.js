// SaberAPI.js
const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/saber-awards", (req, res) => {
  const query = `
  SELECT afpsn, lname, fname, mname,
    SUM(crsegrade * cunits) / NULLIF(SUM(cunits), 0) AS cgpa
  FROM sample
  GROUP BY afpsn
  ORDER BY cgpa DESC
  LIMIT 3
`;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const format = (student, rank) => ({
      rank,
      name: `${student.lname}, ${student.fname} ${student.mname ? student.mname.charAt(0) + "." : ""}`.trim(),
      grade: parseFloat(student.cgpa.toFixed(3))
    });

    res.json({
      presidential: results[0] ? format(results[0], 1) : null,
      vicePresidential: results[1] ? format(results[1], 2) : null,
      secretaryNationalDefense: results[2] ? format(results[2], 3) : null,
    });
  });
});

module.exports = router;