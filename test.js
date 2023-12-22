```javascript
// Importing necessary libraries
const axios = require('axios');
const assert = require('assert');

// Test for getting all patents
axios.get('/patents')
    .then(response => {
        assert(response.status === 200, 'Expected response status to be 200');
        assert(Array.isArray(response.data), 'Expected data to be an array');
    })
    .catch(err => {
        console.error(err.message);
    });

// Test for getting a patent by id
axios.get('/patents/1')
    .then(response => {
        assert(response.status === 200, 'Expected response status to be 200');
        assert(typeof response.data === 'object', 'Expected data to be an object');
        assert(response.data.PatentID === 1, 'Expected PatentID to be 1');
    })
    .catch(err => {
        console.error(err.message);
    });

// Test for creating a new patent
const newPatent = {
    UserID: 1,
    PatentTitle: 'Test Patent',
    PatentDescription: 'This is a test patent',
    PatentStatus: 'Pending',
    PatentJurisdiction: 'US'
};

axios.post('/patents', newPatent)
    .then(response => {
        assert(response.status === 200, 'Expected response status to be 200');
        assert(typeof response.data === 'object', 'Expected data to be an object');
        assert(response.data.PatentTitle === 'Test Patent', 'Expected PatentTitle to be "Test Patent"');
    })
    .catch(err => {
        console.error(err.message);
    });

// Test for updating a patent
const updatedPatent = {
    PatentTitle: 'Updated Test Patent',
    PatentDescription: 'This is an updated test patent',
    PatentStatus: 'Approved',
    PatentJurisdiction: 'US'
};

axios.put('/patents/1', updatedPatent)
    .then(response => {
        assert(response.status === 200, 'Expected response status to be 200');
        assert(typeof response.data === 'object', 'Expected data to be an object');
        assert(response.data.PatentTitle === 'Updated Test Patent', 'Expected PatentTitle to be "Updated Test Patent"');
    })
    .catch(err => {
        console.error(err.message);
    });
```
