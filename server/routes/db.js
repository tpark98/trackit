const express = require('express');
const router = express.Router();
const { getAllUsers } = require('../controllers/dbController');

router.get('/users', getAllUsers);

module.exports = router;
