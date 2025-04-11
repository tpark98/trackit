const express = require('express');
const router = express.Router();
const db = require("../db/db.js");
console.log("LOADED users.js");
// Verify user
console.log('typeof DB_PASSWORD:', typeof process.env.DB_PASSWORD);
const result = require('dotenv').config();
console.log('dotenv result:', result);

router.get('/login', (req, res) => {
  res.send("You're hitting the GET /users/login route");
});

router.post('/signup', async (req, res) => {
  console.log("signup works")
  const { id, password, first_name, last_name, role } = req.body;
    console.log(password)
  try {
    if (!id || !password || !first_name || !last_name || !role) {
      console.log(id)
      console.log(password)

      console.log(role)
      return res.status(400).json({ message: 'missing field' });
    }
    const {rows: existingUsers} = await db.query('SELECT id FROM users WHERE id = $1', [id]);
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    const {rows: result} = await db.query(
      'INSERT INTO users (id, password, first_name, last_name, roles, access) VALUES ($1, $2, $3, $4, $5, $6)',
      [id, password, first_name, last_name, role, null]
    );

    res.status(201).json({ message: 'Success', id: result.insertId });
  } catch (err) {
    console.error("Signup error:", err.message);
    console.error(err.stack); // shows where the error happened
    res.status(500).json({ message: 'Error', error: err.message });
  }
});

router.post('/login', async(req, res) => {
    console.log("HIT /users/login");
    const { username, password } = req.body;
    console.log(username)
    console.log(password)
    if (!username || !password) {
        return res.status(400).json({ message: 'Missing id or password' });
    }
    console.log("hello")
    try {
        // 1. Find user by ID
        const result = await db.query('SELECT * FROM users WHERE id = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentia' });
        }

        const user = result.rows[0];

        // 2. Compare passwords (plain text version)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 3. Login success
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                // roles: user.roles,
                // access: user.access,
            },
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server errors' });
    }
})

router.get('/test', (req, res) => {
  res.json({ message: "User routes working!" });
});

module.exports = router;
