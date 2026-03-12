require('dotenv').config({ path: __dirname + '/../.env' });

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'faq_chatbot',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    console.error('Check your .env file and MySQL server');
  } else {
    console.log('Database connected successfully');
    connection.release();
  }
});

const promisePool = pool.promise();

module.exports = promisePool;
