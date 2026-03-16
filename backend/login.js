const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db");

/*
POST /api/login
Authenticate user
*/
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }


db.query(
  "SELECT username, created_at FROM login ORDER BY created_at DESC",
  (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json(results);
  })

    // User not found
    if (results.length === 0) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const user = results[0];

    try {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid username or password",
        });
      }

      // Successful login
      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      });

    } catch (error) {
      console.error("Password comparison error:", error);
      res.status(500).json({
        message: "Server error",
      });
    }
  });
});

module.exports = router;