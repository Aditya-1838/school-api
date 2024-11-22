const mysql = require('mysql');
const dotenv = require('dotenv');

require('dotenv').config();  // Load the .env file


// Create the MySQL connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

module.exports = connection;
