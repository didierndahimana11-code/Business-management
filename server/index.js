const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database & Models
const { sequelize, Product, Transaction, Sale, SaleItem } = require('./models');

// Sync Database
sequelize.sync({ force: false }) // Set force: true to reset DB during dev
    .then(() => {
        console.log('Database connected and synced');
        // Seed data if empty (Optional, implemented separately)
    })
    .catch(err => console.log('Error syncing database: ' + err));

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/sales', require('./routes/sales'));
app.use('/api/dashboard', require('./routes/dashboard'));

// Routes (Placeholder)
app.get('/', (req, res) => res.send('API Running'));

// Start Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

module.exports = { app, sequelize };
