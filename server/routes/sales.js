const express = require('express');
const router = express.Router();
const { Sale, SaleItem, Product, Transaction, sequelize } = require('../models');

// POST create sale
router.post('/', async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { items, paymentMethod, totalAmount } = req.body;

        // 1. Create Sale record
        const sale = await Sale.create({
            totalAmount,
            paymentMethod
        }, { transaction: t });

        // 2. Create Sale Items and Update Stock
        for (const item of items) {
            await SaleItem.create({
                SaleId: sale.id,
                ProductId: item.id,
                quantity: item.quantity,
                priceAtSale: item.price
            }, { transaction: t });

            // Update Product Stock
            const product = await Product.findByPk(item.id, { transaction: t });
            if (!product) throw new Error(`Product ${item.id} not found`);
            if (product.stock < item.quantity) throw new Error(`Insufficient stock for ${product.name}`);

            await product.update({ stock: product.stock - item.quantity }, { transaction: t });
        }

        // 3. Record as Income Transaction
        await Transaction.create({
            description: `Sale #${sale.id}`,
            category: 'Income',
            amount: totalAmount,
            status: 'Completed'
        }, { transaction: t });

        await t.commit();
        res.status(201).json({ message: 'Sale completed successfully', saleId: sale.id });

    } catch (err) {
        await t.rollback();
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
