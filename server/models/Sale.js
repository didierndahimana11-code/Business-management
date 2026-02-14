const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Sale = sequelize.define('Sale', {
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        totalAmount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        paymentMethod: {
            type: DataTypes.STRING
        }
    });

    const SaleItem = sequelize.define('SaleItem', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        priceAtSale: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });

    return { Sale, SaleItem };
};
