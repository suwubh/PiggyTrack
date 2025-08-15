const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

// Get incomes
router.get('/', authMiddleware, getIncomes);

// Add new income
router.post('/', authMiddleware, addIncome);

// Delete income
router.delete('/:id', authMiddleware, deleteIncome);

module.exports = router;
