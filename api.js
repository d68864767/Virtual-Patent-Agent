```javascript
// Importing necessary libraries
const axios = require('axios');
const express = require('express');
const router = express.Router();

// Importing the database client from server.js
const { client } = require('./server');

// Route to get all patents
router.get('/patents', async (req, res) => {
    try {
        const patents = await client.query('SELECT * FROM Patents;');
        res.json(patents.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Route to get a patent by id
router.get('/patents/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const patent = await client.query('SELECT * FROM Patents WHERE PatentID = $1;', [id]);
        res.json(patent.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Route to create a new patent
router.post('/patents', async (req, res) => {
    try {
        const { UserID, PatentTitle, PatentDescription, PatentStatus, PatentJurisdiction } = req.body;
        const newPatent = await client.query('INSERT INTO Patents (UserID, PatentTitle, PatentDescription, PatentStatus, PatentJurisdiction) VALUES ($1, $2, $3, $4, $5) RETURNING *;', [UserID, PatentTitle, PatentDescription, PatentStatus, PatentJurisdiction]);
        res.json(newPatent.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Route to update a patent
router.put('/patents/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { PatentTitle, PatentDescription, PatentStatus, PatentJurisdiction } = req.body;
        const updatePatent = await client.query('UPDATE Patents SET PatentTitle = $1, PatentDescription = $2, PatentStatus = $3, PatentJurisdiction = $4 WHERE PatentID = $5 RETURNING *;', [PatentTitle, PatentDescription, PatentStatus, PatentJurisdiction, id]);
        res.json(updatePatent.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

// Route to delete a patent
router.delete('/patents/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletePatent = await client.query('DELETE FROM Patents WHERE PatentID = $1;', [id]);
        res.json('Patent was deleted!');
    } catch (err) {
        console.error(err.message);
    }
});

// Route to get patent office API
router.get('/patentoffice/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const office = await client.query('SELECT OfficeAPI FROM PatentOffices WHERE OfficeID = $1;', [id]);
        const response = await axios.get(office.rows[0].OfficeAPI);
        res.json(response.data);
    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;
```
