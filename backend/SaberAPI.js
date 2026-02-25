const express = require("express");
const router = express.Router();
const db = require("./db");


router.get("/saber-awards", (req, res) => {
  const query = `
    SELECT afpsn, lname, fname,
      SUM(crsegrade * cunits) / NULLIF(SUM(cunits),0) AS cgpa
    FROM sample
    GROUP BY afpsn, lname, fname
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const students = [];

    results.forEach(student => {
      const cgpa = parseFloat(student.cgpa);
      if (!cgpa || isNaN(cgpa)) return;

      students.push({
        afpsn: student.afpsn,
        name: `${student.lname}, ${student.fname}`,
        cgpa: parseFloat(cgpa.toFixed(3))
      });
    });

    students.sort((a, b) => b.cgpa - a.cgpa);

    res.json({
      president: students[0] || null,
      vicePresident: students[1] || null,
      secretaryDefense: students[2] || null
    });
  });
});

module.exports = router;