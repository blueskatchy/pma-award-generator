const express = require("express");
const router = express.Router();
const db = require("./db");

// Helper to wrap db.query in a Promise
const queryAsync = (sql) => {
  return new Promise((resolve, reject) => {
    db.query(sql, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Format student nicely
const formatStudent = (student, rank = 1) => {
  if (!student || student.cgpa == null) return null;
  return {
    rank,
    name: `${student.lname}, ${student.fname}${student.mname ? " " + student.mname[0] + "." : ""}`.trim(),
    cgpa: parseFloat(student.cgpa.toFixed(3))
  };
};

router.get("/awards", async (req, res) => {
  try {
    const strongestCadetQuery = `
      SELECT afpsn, lname, fname, mname,
             SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code='DPE'
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    const agfoQuery = `
      SELECT afpsn, lname, fname, mname,
             SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE cdesc LIKE '%Leadership%'
        AND (ccode LIKE 'V%' OR ccode LIKE 'R%' OR ccode LIKE 'ML%' OR ccode LIKE 'F%')
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    const genAntQuery = `
      SELECT afpsn, lname, fname, mname,
             SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE LOWER(cdesc) LIKE '%science%'
        AND (ccode LIKE 'V%' OR ccode LIKE 'R%' OR ccode LIKE 'ML%' OR ccode LIKE 'F%')
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    const journalismQuery = `
      SELECT afpsn, lname, fname, mname,
             SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code = 'DHUM'
        AND (
             LOWER(cdesc) LIKE '%advance communication%'
          OR LOWER(cdesc) LIKE '%rhetoric in the military milieu%'
          OR LOWER(cdesc) LIKE '%discourse analysis%'
          OR LOWER(cdesc) LIKE '%essential academic writing skills%'
          OR LOWER(cdesc) LIKE '%fundamentals of communication%'
          OR LOWER(cdesc) LIKE '%rhetoric%'
          OR LOWER(cdesc) LIKE '%essentials academic writing%'
        )
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    const spanishQuery = `
      SELECT afpsn, lname, fname, mname,
             SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code = 'DHUM'
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    const academicQuery = `
      SELECT afpsn, lname, fname, mname,
             SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE ctype = 'AC'
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    // Execute all queries concurrently
    const [
      strongestResult,
      agfoResult,
      genAntResult,
      journalismResult,
      spanishResult,
      academicResult
    ] = await Promise.all([
      queryAsync(strongestCadetQuery),
      queryAsync(agfoQuery),
      queryAsync(genAntQuery),
      queryAsync(journalismQuery),
      queryAsync(spanishQuery),
      queryAsync(academicQuery)
    ]);

    res.json({
      strongestCadet: formatStudent(strongestResult[0]),
      agfoAward: formatStudent(agfoResult[0]),
      genAntLuna: formatStudent(genAntResult[0]),
      journalismAward: formatStudent(journalismResult[0]),
      spanishAward: formatStudent(spanishResult[0]),
      academicAward: formatStudent(academicResult[0])
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;