const express = require("express");
const router = express.Router();
const db = require("./db");

const queryAsync = (sql) =>
  new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

const formatStudent = (student, rank = 1) => {
  if (!student || student.cgpa == null) return null;
  return {
    rank,
    name: `${student.lname}, ${student.fname}${student.mname ? " " + student.mname[0] + "." : ""}`.trim(),
    cgpa: parseFloat(student.cgpa.toFixed(3)),
  };
};

router.get("/plaque", async (req, res) => {
  try {
    const infoTechPlqQuery = `
      SELECT afpsn, lname, fname, mname,
             SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code='DCIS'
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    const managePlqQuery = `
      SELECT afpsn, lname, fname, mname,
             SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code='DMGT'
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    const [infoTechPlqResult, managePlqResult] = await Promise.all([
      queryAsync(infoTechPlqQuery),
      queryAsync(managePlqQuery)
    ]);

    res.json({
      infoTechPlq: formatStudent(infoTechPlqResult[0]),
      managePlq: formatStudent(managePlqResult[0])
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;