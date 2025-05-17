const mysql = require('mysql');

// Connect to MySQL database
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost', // Default host for XAMPP
    user: 'root', // Default user for XAMPP
    password: process.env.DB_PASSWORD || '', // Default password for XAMPP
    database: process.env.DB_NAME,// Replace with your database name
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the MySQL database.');
    }
});

module.exports = db;