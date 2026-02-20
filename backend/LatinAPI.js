// LatinAPI.js
const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/latin-honors", (req, res) => {
  const query = `
    SELECT afpsn, lname, fname,
      SUM(crsegrade * cunits) / NULLIF(SUM(cunits),0) AS cgpa,
      MIN(crsegrade) AS min_grade
    FROM sample
    GROUP BY afpsn, lname, fname
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const summa = [];
    const magna = [];
    const cum = [];

    results.forEach(student => {
      const cgpa = parseFloat(student.cgpa);
      const minGrade = parseFloat(student.min_grade);
      if (!cgpa || isNaN(cgpa)) return;

      const studentData = {
        afpsn: student.afpsn,
        name: `${student.lname}, ${student.fname}`,
        cgpa: parseFloat(cgpa.toFixed(3))
      };

      if (cgpa >= 9.3 && minGrade >= 8.5) summa.push(studentData);
      else if (cgpa >= 8.9 && minGrade >= 8.25) magna.push(studentData);
      else if (cgpa >= 8.5 && minGrade >= 8.0) cum.push(studentData);
    });

    res.json({
      summaCumLaude: summa,
      magnaCumLaude: magna,
      cumLaude: cum
    });
  });
});

module.exports = router;