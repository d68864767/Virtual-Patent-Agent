```javascript
// Importing necessary libraries
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');

// Database connection
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

// Express app setup
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Virtual Patent Agent');
});

// User routes
app.get('/users', (req, res) => {
    client.query('SELECT * FROM Users;', (err, result) => {
        if (err) throw err;
        res.send(result.rows);
    });
});

app.post('/users', (req, res) => {
    const { UserName, UserEmail, UserPassword, UserType } = req.body;
    client.query('INSERT INTO Users (UserName, UserEmail, UserPassword, UserType) VALUES ($1, $2, $3, $4);', [UserName, UserEmail, UserPassword, UserType], (err, result) => {
        if (err) throw err;
        res.send('User added successfully');
    });
});

// Patent routes
app.get('/patents', (req, res) => {
    client.query('SELECT * FROM Patents;', (err, result) => {
        if (err) throw err;
        res.send(result.rows);
    });
});

app.post('/patents', (req, res) => {
    const { UserID, PatentTitle, PatentDescription, PatentStatus, PatentJurisdiction } = req.body;
    client.query('INSERT INTO Patents (UserID, PatentTitle, PatentDescription, PatentStatus, PatentJurisdiction) VALUES ($1, $2, $3, $4, $5);', [UserID, PatentTitle, PatentDescription, PatentStatus, PatentJurisdiction], (err, result) => {
        if (err) throw err;
        res.send('Patent added successfully');
    });
});

// Server setup
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```
