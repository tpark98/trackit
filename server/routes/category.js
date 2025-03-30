const express = require('express');
const router = express.Router();
const db = require("../db");

// GET all products
router.get('/', async(req, res) => {
    const result = await db.query("SELECT * FROM category");
    res.json(result.rows);
})

module.exports = router;

