// File: backend/app.js

const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors()); // For development, this is fine. For production, consider restricting the origin.

// Dynamically read and mount routes from the 'routes' directory
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log('Listening on port:', PORT);
    });
};

server();
