// PACKAGES
const http = require('http');
const express = require('express');

// GET PORT OF THE SERVER
const { getPort } = require('./src/config/config');
process.env.PORT = getPort();

// CUSTOMS
const { Coords } = require('./src/models/Coord');
const coordsMath = require('./src/utils/coords-math');

// SERVER CREATION AND CONTROLLERS
const app = express();
app.use(require('./src/controllers/coords-controller'));
app.listen(process.env.PORT, () => {
    console.log(`Server running in port ${process.env.PORT}`);
});