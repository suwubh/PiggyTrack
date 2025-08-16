// File: backend/routes/expenses.js (FIXED)

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');

router.get('/', authMiddleware, getExpense);

router.post('/', authMiddleware, addExpense);

router.delete('/:id', authMiddleware, deleteExpense); // This line was missing!

module.exports = router;
