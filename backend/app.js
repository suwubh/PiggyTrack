const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();

const authRoutes = require('./routes/auth');

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);

const incomeRoutes = require('./routes/income');
// ... other routes
app.use('/api/income', incomeRoutes);


const PORT = process.env.PORT || 5000;

const server = () => {
  db();
  app.listen(PORT, () => {
    console.log('Listening on port:', PORT);
  });
};

server();
