const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.postgresql_user,
    host: 'localhost',
    database: 'trackit',
    // password: 'your_db_password',
    port: 5432,
});

module.exports = pool;
