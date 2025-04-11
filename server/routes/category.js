const express = require('express');
const router = express.Router();
const db = require("../db/db.js");

// GET all categories
router.get('/', async(req, res) => {
    const result = await db.query("SELECT * FROM category");
    res.json(result.rows);
})

// PUT one category
router.put('/:id', async(req, res) => {
    const { category_name } = req.body;
    const result = await db.query(
        `UPDATE category 
       SET category_name = $1
       WHERE id = $2 
       RETURNING *`,
        [category_name, req.params.id]
    );
    res.json(result.rows[0]);
})

// POST to insert category
router.post('', async(req, res) => {
    const getCategories = await db.query("SELECT * FROM category");

    // bad practice but works for now
    let newId = 0
    for (let i = 1; i < getCategories.rows.length; i++) {
        if (getCategories.rows[i].id !== newId) {
            break
        }
        newId += 1
    }

    const { category_name } = req.body;
    const result = await db.query(
        `INSERT INTO category (
            id, category_name
        ) VALUES ($1, $2)
             RETURNING *`,
        [newId, category_name]
    );
    res.json(result.rows[0]);
})

module.exports = router;

