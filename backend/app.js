// File: backend/app.js (Revised)

const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Import routes explicitly
const authRoutes = require('./routes/auth');
const incomeRoutes = require('./routes/income');
const expenseRoutes = require('./routes/expenses');
const dashboardRoutes = require('./routes/dashboard');
const transactionsRoutes = require('./routes/transactions'); // See note below

// Middlewares
app.use(express.json());
// Production CORS: Be more restrictive. Replace '*' with your frontend's deployed URL.
app.use(cors({
    origin: process.env.CLIENT_URL || '*', // Set CLIENT_URL env var in production (e.g., https://your-frontend.onrender.com)
    credentials: true // If you use cookies or Authorization headers with credentials
}));

// Mount routes explicitly under /api/v1
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/income', incomeRoutes);
app.use('/api/v1/expenses', expenseRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1', transactionsRoutes); // Note: This mounts routes like /api/v1/add-income

// Error handling middleware (should be last app.use)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ message: err.message || 'Internal Server Error' });
});

const server = () => {
    db(); // Connect to the database
    app.listen(PORT, () => {
        console.log('Listening on port:', PORT);
    });
};

server();
