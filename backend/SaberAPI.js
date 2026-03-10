const express = require("express");
const router = express.Router();
const db = require("./db");

// Safe formatter for students
const formatStudent = (student, rank = null) => {
  if (!student || student.cgpa == null) return null;
  return {
    rank,
    name: `${student.lname}, ${student.fname}${student.mname ? " " + student.mname.charAt(0) + "." : ""}`.trim(),
    grade: parseFloat(student.cgpa.toFixed(3))
  };
};

router.get("/saber-awards", async (req, res) => {
  try {

    // Top 3 overall CGPA
    const overallQuery = `
      SELECT afpsn, lname, fname, mname,
      SUM(crsegrade * cunits) / NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      GROUP BY afpsn, lname, fname, mname
      ORDER BY cgpa DESC
      LIMIT 3
    `;

    // Philippine Army Saber
    const armyQuery = `
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

    // Philippine Navy Saber
    const navyQuery = `
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

    // Philippine Air Force Saber
    const airforceQuery = `
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

    // Athletic Saber
    const athleticQuery = `
      SELECT afpsn, lname, fname, mname,
      SUM(crsegrade * cunits) / NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE ctype = 'PE'
      GROUP BY afpsn, lname, fname, mname
      HAVING MIN(crsegrade) >= 8.5
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    // Aguinaldo Saber
    const aguinaldoQuery = `
      SELECT afpsn, lname, fname, mname,
      COALESCE(SUM(crsegrade)/COUNT(*),0) AS cgpa
      FROM sample
      WHERE ((dept_code = 'DTO' AND (cdesc LIKE '%Aptitude%' OR cdesc LIKE '%Conduct%'))
      OR (cdesc LIKE '%Leadership%'))
      GROUP BY afpsn, lname, fname, mname
      HAVING COUNT(*) >= 3
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    // Execute queries
    const overall = await new Promise((resolve, reject) =>
      db.query(overallQuery, (err, result) => err ? reject(err) : resolve(result))
    );

    const army = await new Promise((resolve, reject) =>
      db.query(armyQuery, (err, result) => err ? reject(err) : resolve(result[0]))
    );

    const navy = await new Promise((resolve, reject) =>
      db.query(navyQuery, (err, result) => err ? reject(err) : resolve(result[0]))
    );

    const airforce = await new Promise((resolve, reject) =>
      db.query(airforceQuery, (err, result) => err ? reject(err) : resolve(result[0]))
    );

    const athletic = await new Promise((resolve, reject) =>
      db.query(athleticQuery, (err, result) => err ? reject(err) : resolve(result[0]))
    );

    const aguinaldo = await new Promise((resolve, reject) =>
      db.query(aguinaldoQuery, (err, result) => err ? reject(err) : resolve(result[0]))
    );

    res.json({
      presidential: formatStudent(overall[0], 1),
      vicePresidential: formatStudent(overall[1], 2),
      secretaryNationalDefense: formatStudent(overall[2], 3),
      philippineArmySaber: formatStudent(army, 1),
      philippineNavySaber: formatStudent(navy, 1),
      philippineAirForceSaber: formatStudent(airforce, 1),
      athleticSaber: athletic ? formatStudent(athletic, 1) : null,
      aguinaldoSaber: aguinaldo ? formatStudent(aguinaldo, 1) : null
    });

  } catch (err) {
    console.error("Saber Awards API Error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;