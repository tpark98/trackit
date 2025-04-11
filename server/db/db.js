const { Pool } = require('pg');
require('dotenv').config();
console.log('Connecting to DB:', process.env.DB_HOST);
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: 5432,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  user: process.env.TEST_USER,
  // password: process.env.DB_PASS,
  database: 'trackit',
});

module.exports = pool;
