  const express = require("express");
  const router = express.Router();
  const bcrypt = require("bcryptjs");
  const db = require("./db");

  /* ---------------- TEST ROUTE ---------------- */
  router.get("/test", (req, res) => {
    res.json({ message: "Users API is working!" });
  });

  /* ---------------- LOGIN ---------------- */
  /* POST /api/users/login */
  router.post("/login", (req, res) => {
    const { username, password } = req.body;

    console.log("Login attempt:", username);

    db.query(
      "SELECT id, username, email, password FROM login WHERE username = ?",
      [username],
      async (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error" });
        }

        if (results.length === 0) {
          return res.status(401).json({ message: "Invalid username or password" });
        }

        const user = results[0];

        try {
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return res
              .status(401)
              .json({ message: "Invalid username or password" });
          }

          res.json({
            message: "Login successful",
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
            },
          });
        } catch (error) {
          console.error("Password compare error:", error);
          res.status(500).json({ message: "Server error" });
        }
      }
    );
  });

  /* ---------------- CREATE USER ---------------- */
  /* POST /api/users */
  router.post("/", async (req, res) => {
    try {
      const { username, password } = req.body;

      console.log("Creating user:", username);

      db.query(
        "SELECT id FROM login WHERE username = ?",
        [username],
        async (err, results) => {
          if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ message: "Database error" });
          }

          if (results.length > 0) {
            return res.status(400).json({ message: "Username already taken" });
          }

          try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const email = `${username}@pma.edu.ph`;

            db.query(
              "INSERT INTO login (username, email, password) VALUES (?, ?, ?)",
              [username, email, hashedPassword],
              (err, result) => {
                if (err) {
                  console.error("Insert error:", err);
                  return res.status(500).json({ message: "Error creating user" });
                }

                res.status(201).json({
                  message: "User created successfully",
                  user: {
                    id: result.insertId,
                    username,
                    email,
                  },
                });
              }
            );
          } catch (hashError) {
            console.error("Hash error:", hashError);
            res.status(500).json({ message: "Error processing password" });
          }
        }
      );
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  /* ---------------- GET USERS ---------------- */
  /* GET /api/users */
  router.get("/", (req, res) => {
    console.log("GET /api/users");

    db.query(
      "SELECT id, username, email, created_at FROM login ORDER BY created_at DESC",
      (err, results) => {
        if (err) {
          console.error("Database error:", err);
          return res.status(500).json({ message: "Database error" });
        }

        res.json(results);
      }
    );
  });

  module.exports = router;