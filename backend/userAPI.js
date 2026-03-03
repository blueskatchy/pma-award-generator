const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const db = require("./db"); // This should work if db.js is in the same directory

// Test route to verify the router is working
router.get('/users-test', (req, res) => {
    res.json({ message: 'Users API is working!' });
});

// @route   POST /api/users
// @desc    Add a new user
router.post('/users', async (req, res) => {
    try {
        const { name, username, password } = req.body;
        
        console.log("Received request to create user:", { name, username });
        
        // Check if username already exists
        db.query(
            'SELECT id FROM login WHERE username = ?',
            [username],
            async (err, results) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ message: 'Database error' });
                }

                if (results.length > 0) {
                    return res.status(400).json({ message: 'Username already taken' });
                }

                try {
                    // Hash password
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);
                    
                    // Create email from username
                    const email = `${username}@pma.edu.ph`;

                    // Insert new user
                    db.query(
                        'INSERT INTO login (username, email, password) VALUES (?, ?, ?)',
                        [username, email, hashedPassword],
                        (err, result) => {
                            if (err) {
                                console.error('Error inserting user:', err);
                                return res.status(500).json({ message: 'Error creating user' });
                            }

                            res.status(201).json({
                                message: 'User created successfully',
                                user: {
                                    id: result.insertId,
                                    username,
                                    email
                                }
                            });
                        }
                    );
                } catch (hashError) {
                    console.error('Error hashing password:', hashError);
                    res.status(500).json({ message: 'Error processing password' });
                }
            }
        );
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/users
// @desc    Get all users
router.get('/users', (req, res) => {
    console.log("GET /api/users called");
    
    db.query(
        'SELECT id, username, email, created_at FROM login ORDER BY created_at DESC',
        (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Database error' });
            }
            
            console.log(`Found ${results.length} users`);
            res.json(results);
        }
    );
});

module.exports = router;