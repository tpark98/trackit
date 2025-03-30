const { Pool } = require('pg');

const pool = new Pool({
    user: 'taehopark',
    host: 'localhost',
    database: 'trackit',
    // password: 'your_db_password',
    port: 5432,
});

module.exports = pool;
