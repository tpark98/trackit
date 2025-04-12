const { Pool } = require('pg');
require('dotenv').config();
console.log('Connecting to DB:', process.env.DB_HOST);
const pool = new Pool({
   host: process.env.DB_HOST,
   port: 5432,
   user: process.env.DB_USER,
   password: process.env.DB_PASS,
   database: process.env.DB_NAME,
   ssl: {
     rejectUnauthorized: false,
   },
});

// Test the connection
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

pool.connect()
  .then(client => {
    console.log('Successfully connected to database');
    client.release();
  })
  .catch(err => {
    console.error('Error connecting to the database:', {
      message: err.message,
      stack: err.stack,
      code: err.code
    });
  });

module.exports = pool;
