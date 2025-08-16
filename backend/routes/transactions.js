// File: backend/routes/transactions.js (If you keep it, add authMiddleware)

const router = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

router.post('/add-income', authMiddleware, addIncome) // Add authMiddleware
    .get('/get-incomes', authMiddleware, getIncomes)       // Add authMiddleware
    .delete('/delete-income/:id', authMiddleware, deleteIncome) // Add authMiddleware
    .post('/add-expense', authMiddleware, addExpense)     // Add authMiddleware
    .get('/get-expenses', authMiddleware, getExpense)       // Add authMiddleware
    .delete('/delete-expense/:id', authMiddleware, deleteExpense); // Add authMiddleware

module.exports = router;
