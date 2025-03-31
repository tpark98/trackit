const express = require('express');
const router = express.Router();
const db = require("../db");

// Verify user
router.post('/login', async(req, res) => {
    const { id, password } = req.body;

    if (!id || !password) {
        return res.status(400).json({ message: 'Missing id or password' });
    }

    try {
        // 1. Find user by ID
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
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
        res.status(500).json({ message: 'Server error' });
    }
})

module.exports = router;
