const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');

router.get('/', authMiddleware, getIncomes);

router.post('/', authMiddleware, addIncome);

router.delete('/:id', authMiddleware, deleteIncome);

module.exports = router;
