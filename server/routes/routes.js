const express = require('express');
const app = express();
const path = require('path');
const Controller = require('../controllers/users.js');
const { validate } = require('../middleware/validate.js');
const { upload } = require('../middleware/upload.js');
const { createUSR} = require('../middleware/crerateUSRid.js');

app.get('/api/users', Controller.loadpage);
app.post('/api/users', createUSR,upload, validate, Controller.validateFiles,Controller.saveData);



module.exports = app;