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

// Format student for frontend
const formatStudent = (student) => {
  if (!student || student.cgpa == null) return null;
  return {
    name: `${student.lname}, ${student.fname}${
      student.mname ? " " + student.mname[0] + "." : ""
    }`.trim(),
    cgpa: parseFloat(student.cgpa.toFixed(3))
  };
};

router.get("/plaque", async (req, res) => {
  try {
    // List of queries for each department/award
    const queries = {
      infoTechPlq: `
        SELECT afpsn,lname,fname,mname,
        SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE dept_code='DCIS'
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `,
      managePlq: `
        SELECT afpsn,lname,fname,mname,
        SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE dept_code='DMGT'
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `,
      mathPlq: `
        SELECT afpsn,lname,fname,mname,
        SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE dept_code='DMAT'
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `,
      natSciPlq: `
        SELECT afpsn,lname,fname,mname,
        SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE dept_code='DNS'
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `,
      humPlq: `
        SELECT afpsn,lname,fname,mname,
        SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE dept_code='DHUM'
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `,
      socSciPlq: `
        SELECT afpsn,lname,fname,mname,
        SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE dept_code='DNSS'
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `,
      natSecPlq: `
        SELECT afpsn,lname,fname,mname,
        SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE dept_code='DNSS'
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `,
      armyPlq: `
        SELECT afpsn,lname,fname,mname,
        SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE dept_code='DGW'
        AND ccode LIKE 'R%'
        AND servid='R'
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `,
      navyPlq: `
        SELECT afpsn,lname,fname,mname,
        SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE dept_code='DNW'
        AND ccode LIKE 'V%'
        AND servid='V'
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `,
      airforcePlq: `
        SELECT afpsn,lname,fname,mname,
        SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE dept_code='DAW'
        AND ccode LIKE 'F%'
        AND servid='F'
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `,
      leadershipPlq: `
        SELECT afpsn,lname,fname,mname,
        SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE cdesc LIKE '%Leadership%'
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `,
      tacticalPlq: `
        SELECT afpsn,lname,fname,mname,
        SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE dept_code='DTO'
        GROUP BY afpsn
        ORDER BY cgpa DESC
        LIMIT 15
      `,
      sportsPlq: `
        SELECT afpsn,lname,fname,mname,
        SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
        FROM sample
        WHERE dept_code='DPE'
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