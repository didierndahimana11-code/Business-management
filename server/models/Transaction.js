const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Transaction = sequelize.define('Transaction', {
        date: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.ENUM('Income', 'Expense'),
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'Completed'
        }
    });

    return Transaction;
};
