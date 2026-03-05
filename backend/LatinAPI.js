const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/latin-honors", (req, res) => {
  const query = `
    SELECT 
      afpsn,
      TRIM(CONCAT(lname, ', ', fname, ' ', COALESCE(mname, ''))) AS name,
      SUM(crsegrade * cunits) / NULLIF(SUM(cunits),0) AS cgpa,
      MIN(crsegrade) AS min_grade
    FROM sample
    GROUP BY afpsn, lname, fname, mname
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const summa = [];
    const magna = [];
    const cum = [];

    results.forEach(student => {
      const cgpa = parseFloat(student.cgpa);
      const minGrade = parseFloat(student.min_grade);
      if (isNaN(cgpa) || isNaN(minGrade)) return;

      // ✅ USE name FROM SQL
      const studentData = {
        afpsn: student.afpsn,
        name: student.name.toUpperCase(),
        cgpa: parseFloat(cgpa.toFixed(3))
      };

      if (cgpa >= 9.3 && minGrade >= 8.5) summa.push(studentData);
      else if (cgpa >= 8.9 && cgpa < 9.3 && minGrade >= 8.25) magna.push(studentData);
      else if (cgpa >= 8.5 && cgpa < 8.9 && minGrade >= 8.0) cum.push(studentData);
    });

    const sortByCGPA = arr => arr.sort((a, b) => b.cgpa - a.cgpa);

    res.json({
      summaCumLaude: sortByCGPA(summa),
      magnaCumLaude: sortByCGPA(magna),
      cumLaude: sortByCGPA(cum)
    });
  });
});

router.get("/graduation-years", (req, res) => {
  const query = `SELECT DISTINCT oyrgr FROM sample ORDER BY oyrgr DESC`;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const years = results.map(row => row.oyrgr);
    res.json(years);
  });
});

module.exports = router;