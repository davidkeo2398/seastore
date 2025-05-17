const express = require('express');
const cors = require('cors');
const db = require('./src/config/dbcontext'); // Import the database connection
require('dotenv').config();

const app = express();
const port = process.env.port;

// Enable CORS
app.use(cors());

// Test route to check database connection
app.get('/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS result', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database query failed' });
        } else {
            res.json({ success: true, result: results[0].result });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});