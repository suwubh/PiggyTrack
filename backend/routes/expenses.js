// routes/expenses.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Expense = require('../models/Expense'); // Your Expense model

// Get all expenses for logged-in user
router.get('/', authMiddleware, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.userId }); // only user's expenses
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add new expense for logged-in user
router.post('/', authMiddleware, async (req, res) => {
    try {
        const newExpense = new Expense({ ...req.body, user: req.userId });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
