const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../db");

/*
POST /api/login
Authenticate user
*/
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  // Find user by username
  db.query(
    "SELECT id, username, password FROM login WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      // User not found
      if (results.length === 0) {
        return res.status(401).json({
          message: "Invalid username or password",
        });
      }

      const user = results[0];

      try {
        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).json({
            message: "Invalid username or password",
          });
        }

        // Successful login - return user info without password
        res.json({
          message: "Login successful",
          user: {
            id: user.id,
            username: user.username
          }
        });

      } catch (error) {
        console.error("Password comparison error:", error);
        res.status(500).json({
          message: "Server error",
        });
      }
    }
  );
});

module.exports = router;