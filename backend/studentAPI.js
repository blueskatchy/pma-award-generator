const express = require("express");
const router = express.Router();
const db = require("./db");

const queryAsync = (sql, params) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

router.get("/:afpsn/courses", async (req, res) => {
  const { afpsn } = req.params;

  const coursesQuery = `
    SELECT cdesc AS name, cunits AS units, crsegrade AS grade
    FROM sample
    WHERE afpsn = ?
  `;

  try {
    const courses = await queryAsync(coursesQuery, [afpsn]);
    res.json({ courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;