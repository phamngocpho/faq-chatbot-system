require('dotenv').config({ path: __dirname + '/../.env' });

const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'faq_chatbot',
  port: process.env.DB_PORT || 3306,
  charset: 'utf8mb4',
  connectTimeout: 10000,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Set charset for all connections
pool.on('connection', (connection) => {
  connection.query('SET NAMES utf8mb4');
  connection.query('SET CHARACTER SET utf8mb4');
  connection.query('SET character_set_connection=utf8mb4');
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
