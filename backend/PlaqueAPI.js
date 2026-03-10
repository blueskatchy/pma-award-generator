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
    name: `${student.lname}, ${student.fname}${
      student.mname ? " " + student.mname[0] + "." : ""
    }`.trim(),
    cgpa: parseFloat(student.cgpa.toFixed(3)),
  };
};

router.get("/plaque", async (req, res) => {
  try {

    const infoTechPlqQuery = `
      SELECT afpsn,lname,fname,mname,
      SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code='DCIS'
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    const managePlqQuery = `
      SELECT afpsn,lname,fname,mname,
      SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code='DMGT'
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    const mathPlqQuery = `
      SELECT afpsn,lname,fname,mname,
      SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code='DMAT'
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    const natSciPlqQuery = `
      SELECT afpsn,lname,fname,mname,
      SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code='DNS'
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    const humPlqQuery = `
      SELECT afpsn,lname,fname,mname,
      SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code='DHUM'
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    const socSciPlqQuery = `
      SELECT afpsn,lname,fname,mname,
      SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code='DNSS'
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    const natSecPlqQuery = `
      SELECT afpsn,lname,fname,mname,
      SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code='DNSS'
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    const armyPlqQuery = `
      SELECT afpsn, lname, fname, mname,
      SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code = 'DGW'
      AND ccode LIKE 'R%'
      AND servid = 'R'
      GROUP BY afpsn, lname, fname, mname
      ORDER BY cgpa DESC
      LIMIT 1
  `;

    const navyPlqQuery = `
      SELECT afpsn, lname, fname, mname,
      SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code = 'DNW'
      AND ccode LIKE 'V%'
      AND servid = 'V'
      GROUP BY afpsn, lname, fname, mname
      ORDER BY cgpa DESC
      LIMIT 1
  `;

    const airforcePlqQuery = `
      SELECT afpsn, lname, fname, mname,
      SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code = 'DAW'
      AND ccode LIKE 'F%'
      AND servid = 'F'
      GROUP BY afpsn, lname, fname, mname
      ORDER BY cgpa DESC
      LIMIT 1
  `;

    const leadershipPlqQuery = `
      SELECT afpsn, lname, fname, mname,
      SUM(crsegrade * cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE cdesc LIKE '%Leadership%'
      GROUP BY afpsn, lname, fname, mname
      ORDER BY cgpa DESC
      LIMIT 1
  `;

    const tacticalPlqQuery = `
      SELECT afpsn,lname,fname,mname,
      SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code='DTO'
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    const sportsPlqQuery = `
      SELECT afpsn,lname,fname,mname,
      SUM(crsegrade*cunits)/NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE dept_code='DPE'
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    const [
      infoTech, manage, math, 
      natSci, hum, socSci, natSec, 
      army, navy, airforce, leadership, 
      tactical,sports
    ] = await Promise.all([
      queryAsync(infoTechPlqQuery),
      queryAsync(managePlqQuery),
      queryAsync(mathPlqQuery),
      queryAsync(natSciPlqQuery),
      queryAsync(humPlqQuery),
      queryAsync(socSciPlqQuery),
      queryAsync(natSecPlqQuery),
      queryAsync(armyPlqQuery),
      queryAsync(navyPlqQuery),
      queryAsync(airforcePlqQuery),
      queryAsync(leadershipPlqQuery),
      queryAsync(tacticalPlqQuery),
      queryAsync(sportsPlqQuery)
    ]);

    res.json({
      infoTechPlq: formatStudent(infoTech[0]),
      managePlq: formatStudent(manage[0]),
      mathPlq: formatStudent(math[0]),
      natSciPlq: formatStudent(natSci[0]),
      humPlq: formatStudent(hum[0]),
      socSciPlq: formatStudent(socSci[0]),
      natSecPlq: formatStudent(natSec[0]),
      armyPlq: formatStudent(army[0]),
      navyPlq: formatStudent(navy[0]),
      airforcePlq: formatStudent(airforce[0]),
      leadershipPlq: formatStudent(leadership[0]),
      tacticalPlq: formatStudent(tactical[0]),
      sportsPlq: formatStudent(sports[0])
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;