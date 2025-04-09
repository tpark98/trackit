const pool = require('../db/db.js');
const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM category');
    res.json(result.rows);
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).send('Server error');
  }
};

module.exports = { getAllUsers };


