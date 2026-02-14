const express = require('express');
const router = express.Router();
const { Transaction } = require('../models');

// GET all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            order: [['date', 'DESC']]
        });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST new transaction
router.post('/', async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.status(201).json(transaction);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
