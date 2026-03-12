const express = require("express");
const router = express.Router();
const db = require("./db");


router.get("/company/:coy", (req, res) => {
  const coy = req.params.coy;

  const query = `
    SELECT
      afpsn,
      TRIM(CONCAT(lname, ', ', fname, ' ', COALESCE(mname,''))) AS name,
      SUM(crsegrade * cunits) / NULLIF(SUM(cunits),0) AS cgpa
    FROM sample
    WHERE coy = ?
    GROUP BY afpsn, lname, fname, mname
    ORDER BY cgpa DESC
  `;

  db.query(query, [coy], (err, results) => {
    if (err) {
      console.error("Company fetch error:", err);
      return res.status(500).json({ error: "Database error" });
    }

    const formatted = results.map((cadet, index) => ({
      rank: index + 1,
      afpsn: cadet.afpsn,
      name: cadet.name,
      cgpa: parseFloat(cadet.cgpa).toFixed(3), 
    }));

    res.json(formatted);
  });
});

module.exports = router;