const express = require("express");
const router = express.Router();
const db = require("./db");

// Format student nicely
const formatStudent = (student, rank = 1) => {
  if (!student || student.cgpa == null) return null;
  return {
    rank,
    name: `${student.lname}, ${student.fname}${student.mname ? " " + student.mname[0] + "." : ""}`.trim(),
    cgpa: parseFloat(student.cgpa.toFixed(3))
  };
};

router.get("/awards", (req, res) => {
  const strongestCadetQuery = `
    SELECT afpsn, lname, fname, mname,
           SUM(crsegrade * cunits) / NULLIF(SUM(cunits),0) AS cgpa
    FROM sample
    WHERE dept_code = 'DPE'
    GROUP BY afpsn
    ORDER BY cgpa DESC
    LIMIT 1
  `;

  db.query(strongestCadetQuery, (err, result) => {
    if (err) {
      console.error("Awards API DB Error:", err);
      return res.status(500).json({ error: err.message });
    }

    const student = formatStudent(result[0]);
    res.json({ strongestCadet: student });
  });
});

module.exports = router;