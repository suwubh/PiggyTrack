// File: backend/db/db.js (Revised)

const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Db Connected');
    } catch (error) {
        console.error('DB Connection Error:', error.message);
        // In a real production app, you might want to exit or implement retry logic
        // process.exit(1); // Exit if DB connection fails (consider if this is desired behavior)
    }
};

module.exports = { db };
