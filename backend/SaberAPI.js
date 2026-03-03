const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/saber-awards", async (req, res) => {

  const overallQuery = `
    SELECT afpsn, lname, fname, mname,
      SUM(crsegrade * cunits) / NULLIF(SUM(cunits), 0) AS cgpa
    FROM sample
    GROUP BY afpsn
    ORDER BY cgpa DESC
    LIMIT 3
  `;

  const branchQuery = (branch) => `
    SELECT afpsn, lname, fname, mname,
      SUM(crsegrade * cunits) / NULLIF(SUM(cunits), 0) AS cgpa
    FROM sample
    WHERE TRIM(department) = '${branch}'
    GROUP BY afpsn
    ORDER BY cgpa DESC
    LIMIT 1
  `;

  const format = (student, rank = null) => student ? {
    rank,
    name: `${student.lname}, ${student.fname} ${student.mname ? student.mname.charAt(0) + "." : ""}`.trim(),
    grade: parseFloat(student.cgpa.toFixed(3))
  } : null;

  try {

    const overall = await new Promise((resolve, reject) =>
      db.query(overallQuery, (err, result) =>
        err ? reject(err) : resolve(result)
      )
    );

    const army = await new Promise((resolve, reject) =>
      db.query(branchQuery("Army"), (err, result) =>
        err ? reject(err) : resolve(result[0])
      )
    );

    const navy = await new Promise((resolve, reject) =>
      db.query(branchQuery("Navy"), (err, result) =>
        err ? reject(err) : resolve(result[0])
      )
    );

    const airforce = await new Promise((resolve, reject) =>
      db.query(branchQuery("Air Force"), (err, result) =>
        err ? reject(err) : resolve(result[0])
      )
    );

    res.json({
      presidential: overall[0] ? format(overall[0], 1) : null,
      vicePresidential: overall[1] ? format(overall[1], 2) : null,
      secretaryNationalDefense: overall[2] ? format(overall[2], 3) : null,
      philippineArmySaber: format(army, 1),
      philippineNavySaber: format(navy, 1),
      philippineAirForceSaber: format(airforce, 1)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }

});

module.exports = router;