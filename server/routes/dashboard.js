const express = require('express');
const router = express.Router();
const { Product, Transaction, Sale, sequelize } = require('../models');
const { Op } = require('sequelize');

router.get('/metrics', async (req, res) => {
    try {
        // 1. Calculate Total Revenue and Expenses (Current Month)
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const revenue = await Transaction.sum('amount', {
            where: {
                category: 'Income',
                date: { [Op.gte]: startOfMonth }
            }
        }) || 0;

        const expenses = await Transaction.sum('amount', {
            where: {
                category: 'Expense',
                date: { [Op.gte]: startOfMonth }
            }
        }) || 0;

        const profit = revenue - Math.abs(expenses); // Expenses might be stored as negative numbers or handled here

        // 2. Count Low Stock Items
        const lowStockCount = await Product.count({ where: { stock: { [Op.lt]: 5 } } });

        res.json({
            revenue,
            expenses,
            profit,
            lowStockCount
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
