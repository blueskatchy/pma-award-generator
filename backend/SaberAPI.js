const express = require("express");
const router = express.Router();
const db = require("./db");

// Safe formatter for students
const formatStudent = (student, rank = null) => {
  if (!student || student.cgpa == null) return null; // handles undefined/null cgpa
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
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 3
    `;

    // Branch top student
    const branchQuery = branch => `
      SELECT afpsn, lname, fname, mname,
             SUM(crsegrade * cunits) / NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE TRIM(department) = '${branch}'
      GROUP BY afpsn
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    // Athletic Saber: PE courses, minimum grade 8.5
    const athleticQuery = `
      SELECT afpsn, lname, fname, mname,
             SUM(crsegrade * cunits) / NULLIF(SUM(cunits),0) AS cgpa
      FROM sample
      WHERE ctype = 'PE'
      GROUP BY afpsn
      HAVING MIN(crsegrade) >= 8.5
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    // Aguinaldo Saber: top student in Aptitude, Conduct (DTO), Leadership
    const aguinaldoQuery = `
      SELECT afpsn, lname, fname, mname,
             COALESCE(SUM(crsegrade)/COUNT(*),0) AS cgpa
      FROM sample
      WHERE ((dept_code = 'DTO' AND (cdesc LIKE '%Aptitude%' OR cdesc LIKE '%Conduct%'))
             OR (cdesc LIKE '%Leadership%'))
      GROUP BY afpsn
      HAVING COUNT(*) >= 3
      ORDER BY cgpa DESC
      LIMIT 1
    `;

    // Execute all queries
    const overall = await new Promise((resolve, reject) =>
      db.query(overallQuery, (err, result) => err ? reject(err) : resolve(result))
    );

    const army = await new Promise((resolve, reject) =>
      db.query(branchQuery("Army"), (err, result) => err ? reject(err) : resolve(result[0]))
    );

    const navy = await new Promise((resolve, reject) =>
      db.query(branchQuery("Navy"), (err, result) => err ? reject(err) : resolve(result[0]))
    );

    const airforce = await new Promise((resolve, reject) =>
      db.query(branchQuery("Air Force"), (err, result) => err ? reject(err) : resolve(result[0]))
    );

    const athletic = await new Promise((resolve, reject) =>
      db.query(athleticQuery, (err, result) => err ? reject(err) : resolve(result[0]))
    );

    const aguinaldo = await new Promise((resolve, reject) =>
      db.query(aguinaldoQuery, (err, result) => err ? reject(err) : resolve(result[0]))
    );

    // Return JSON
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