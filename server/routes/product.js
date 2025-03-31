const express = require('express');
const router = express.Router();
const db = require("../db");

// GET all products
router.get('/', async(req, res) => {
    console.log(req.query);

    const result = await db.query('SELECT * FROM product');
    res.json(result.rows);
})

// GET one product
router.get('/:id', async(req, res) => {
    const result = await db.query('SELECT * FROM product WHERE id = $1', [req.params.id]);
    res.json(result.rows[0]);
})

// PUT one product
router.put('/:id', async(req, res) => {
    const { product_name, leftover, expire } = req.body;
    const result = await db.query(
        `UPDATE product 
       SET product_name = $1, leftover = $2, expire = $3 
       WHERE id = $4 
       RETURNING *`,
        [product_name, leftover, expire, req.params.id]
    );
    res.json(result.rows[0]);
})


module.exports = router;

