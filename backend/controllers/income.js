const Income = require("../models/Income");

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const amt = Number(amount);
        if (isNaN(amt) || amt <= 0) {
            return res.status(400).json({ message: 'Amount must be a positive number!' });
        }

        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const income = new Income({
            title,
            amount: amt,
            category,
            description,
            date,
            user: req.userId
        });

        await income.save();
        res.status(201).json({ message: 'Income Added', income });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await Income.find({ user: req.userId }).sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        await Income.findByIdAndDelete(id);
        res.status(200).json({ message: 'Income Deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
