const { sequelize, Product, Transaction, Sale, SaleItem } = require('./models');

const seed = async () => {
    await sequelize.sync({ force: true });

    const products = await Product.bulkCreate([
        { name: 'Wireless Headphones', category: 'Electronics', price: 59.99, stock: 12, supplier: 'TechWait' },
        { name: 'Ergonomic Chair', category: 'Furniture', price: 129.99, stock: 15, supplier: 'FurniCo' },
        { name: 'Mechanical Keyboard', category: 'Electronics', price: 89.99, stock: 8, supplier: 'KeyMaster' },
        { name: 'USB-C Cable', category: 'Accessories', price: 9.99, stock: 45, supplier: 'CableGuy' },
        { name: 'Smart Watch Gen 4', category: 'Electronics', price: 199.99, stock: 5, supplier: 'TechWait' },
        { name: 'Laptop Stand', category: 'Accessories', price: 29.99, stock: 20, supplier: 'StandUp' }
    ]);

    const transactions = await Transaction.bulkCreate([
        { description: 'Initial Capital', category: 'Income', amount: 50000.00, status: 'Completed', date: new Date('2023-10-01') },
        { description: 'Office Rent - Oct', category: 'Expense', amount: 2000.00, status: 'Completed', date: new Date('2023-10-05') },
        { description: 'Inventory Purchase', category: 'Expense', amount: 5000.00, status: 'Completed', date: new Date('2023-10-10') }
    ]);

    console.log('Database seeded!');
    process.exit();
};

seed();
