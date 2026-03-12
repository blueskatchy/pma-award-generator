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
const formatStudent = (student) => {
  if (!student || student.cgpa == null) return null;
  return {
    name: `${student.lname}, ${student.fname}${student.mname ? " " + student.mname[0] + "." : ""}`.trim(),
    cgpa: parseFloat(student.cgpa.toFixed(3))
  };
};

router.get("/awards", async (req, res) => {
  try {
    const queries = {
      strongestCadet: `
        SELECT afpsn, lname, fname, mname,
               SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE dept_code='DPE'
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `,
      agfoAward: `
        SELECT afpsn, lname, fname, mname,
               SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE cdesc LIKE '%Leadership%'
          AND (ccode LIKE 'V%' OR ccode LIKE 'R%' OR ccode LIKE 'ML%' OR ccode LIKE 'F%')
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `,
      genAntLuna: `
        SELECT afpsn, lname, fname, mname,
               SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE LOWER(cdesc) LIKE '%science%'
          AND (ccode LIKE 'V%' OR ccode LIKE 'R%' OR ccode LIKE 'ML%' OR ccode LIKE 'F%')
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `,
      journalismAward: `
        SELECT afpsn, lname, fname, mname,
               SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE dept_code='DHUM'
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
        LIMIT 15
      `,
      spanishAward: `
        SELECT afpsn, lname, fname, mname,
               SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE dept_code='DHUM'
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `,
      academicAward: `
        SELECT afpsn, lname, fname, mname,
               SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE ctype='AC'
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `
    };

    const results = await Promise.all(Object.values(queries).map(q => queryAsync(q)));

    const response = {};
    Object.keys(queries).forEach((key, i) => {
      response[key] = results[i].map(formatStudent).filter(Boolean);
    });

    res.json(response);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;