const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false
});

const Product = require('./Product')(sequelize);
const Transaction = require('./Transaction')(sequelize);
const { Sale, SaleItem } = require('./Sale')(sequelize);

// Relationships
Sale.hasMany(SaleItem);
SaleItem.belongsTo(Sale);

Product.hasMany(SaleItem);
SaleItem.belongsTo(Product);

module.exports = {
    sequelize,
    Product,
    Transaction,
    Sale,
    SaleItem
};
