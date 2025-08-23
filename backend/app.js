const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth');
const incomeRoutes = require('./routes/income');
const expenseRoutes = require('./routes/expenses');
const dashboardRoutes = require('./routes/dashboard');
const transactionsRoutes = require('./routes/transactions'); 

app.use(express.json());

app.use(cors({
    origin: process.env.CLIENT_URL || '*', 
    credentials: true 
}));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/income', incomeRoutes);
app.use('/api/v1/expenses', expenseRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1', transactionsRoutes); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({ message: err.message || 'Internal Server Error' });
});

const server = () => {
    db(); 
    app.listen(PORT, () => {
        console.log('Listening on port:', PORT);
    });
};

server();
