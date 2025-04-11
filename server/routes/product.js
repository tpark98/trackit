const express = require('express');
const router = express.Router();
const db = require("../db/db.js");

// GET all products
router.get('/', async(req, res) => {
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

// POST to insert product
router.post('', async(req, res) => {
    const getProducts = await db.query("SELECT * FROM product");
    const { product_name, cost, expire, purchase_date, purchased, leftover, category_id } = req.body;
    console.log(product_name);

    // bad practice but works for now
    let newId = 0
    for (let i = 1; i < getProducts.rows.length; i++) {
        if (getProducts.rows[i].id !== newId) {
            break
        }
        newId += 1
    }

    const result = await db.query(
        `INSERT INTO product (
            id, product_name, cost, expire, purchase_date, purchased, leftover, category_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
        [newId, product_name, cost, expire, purchase_date, purchased, leftover, category_id]
    );

    res.json(result.rows[0]);
})


module.exports = router;

