const express = require("express");
const mysql = require("mysql2");
const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pma_sample"
});

router.get("/latin-honors", (req, res) => {
  const query = `
    SELECT 
      afpsn,
      lname,
      fname,
      SUM(crsegrade * cunits) / NULLIF(SUM(cunits),0) AS cgpa,
      MIN(crsegrade) AS min_grade
    FROM sample
    GROUP BY afpsn
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const summa = [];
    const magna = [];
    const cum = [];

    results.forEach(student => {
      const cgpa = parseFloat(student.cgpa);
      const minGrade = student.min_grade;
      if (!cgpa) return;

      const studentData = {
        afpsn: student.afpsn,
        name: `${student.lname}, ${student.fname}`,
        cgpa: parseFloat(cgpa.toFixed(3))
      };

      if (cgpa >= 9.300 && minGrade >= 8.500) summa.push(studentData);
      else if (cgpa >= 8.900 && minGrade >= 8.250) magna.push(studentData);
      else if (cgpa >= 8.500 && minGrade >= 8.000) cum.push(studentData);
    });

    res.json({
      summaCumLaude: summa,
      magnaCumLaude: magna,
      cumLaude: cum
    });
  });
});

module.exports = router; // ✅ must export router