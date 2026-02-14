import React from 'react';
import { Plus, Filter, Download } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Tabs from '../components/Tabs';
import Table from '../components/Table';
import Input from '../components/Input';

// Mock Data
const transactions = [
    { id: 1, date: '2023-10-25', description: 'Office Supplies', category: 'Expense', amount: -120.50, status: 'Completed' },
    { id: 2, date: '2023-10-24', description: 'Client Payment - ABC Corp', category: 'Income', amount: 1500.00, status: 'Completed' },
    { id: 3, date: '2023-10-24', description: 'Server Hosting', category: 'Expense', amount: -45.00, status: 'Pending' },
    { id: 4, date: '2023-10-23', description: 'Product Sale #1023', category: 'Income', amount: 320.00, status: 'Completed' },
    { id: 5, date: '2023-10-22', description: 'Inventory Restock', category: 'Expense', amount: -850.00, status: 'Completed' },
];

export default function Finance() {
    const renderTransactionRow = (item, index) => (
        <tr key={item.id}>
            <td>{item.date}</td>
            <td>{item.description}</td>
            <td>
                <span className={`badge ${item.category === 'Income' ? 'badge-success' : 'badge-error'}`}>
                    {item.category}
                </span>
            </td>
            <td style={{ fontWeight: 600, color: item.amount > 0 ? 'var(--color-success)' : 'var(--color-text)' }}>
                {item.amount > 0 ? '+' : ''}${Math.abs(item.amount).toFixed(2)}
            </td>
            <td>{item.status}</td>
        </tr>
    );

    const OverviewTab = () => (
        <div className="dashboard-grid">
            <Card title="Income Statement (Recent)">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                        <div className="summary-card-label">Revenue</div>
                        <div className="summary-card-value" style={{ fontSize: '1.5rem' }}>$12,450.00</div>
                    </div>
                    <div>
                        <div className="summary-card-label">Expenses</div>
                        <div className="summary-card-value" style={{ fontSize: '1.5rem', color: 'var(--color-text)' }}>$4,320.00</div>
                    </div>
                    <div>
                        <div className="summary-card-label">Net Profit</div>
                        <div className="summary-card-value" style={{ fontSize: '1.5rem', color: 'var(--color-success)' }}>$8,130.00</div>
                    </div>
                </div>
            </Card>
        </div>
    );

    const TransactionsTab = () => (
        <Card title="Transactions" action={
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button variant="outline" icon={Filter}>Filter</Button>
                <Button variant="outline" icon={Download}>Export</Button>
                <Button variant="primary" icon={Plus}>Add New</Button>
            </div>
        }>
            <Table
                headers={['Date', 'Description', 'Category', 'Amount', 'Status']}
                data={transactions}
                renderRow={renderTransactionRow}
            />
        </Card>
    );

    const ReportsTab = () => (
        <div className="dashboard-grid">
            <Card title="Financial Reports">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <Button variant="outline" style={{ justifyContent: 'space-between' }}>
                        <span>Profit & Loss</span>
                        <Download size={16} />
                    </Button>
                    <Button variant="outline" style={{ justifyContent: 'space-between' }}>
                        <span>Balance Sheet</span>
                        <Download size={16} />
                    </Button>
                    <Button variant="outline" style={{ justifyContent: 'space-between' }}>
                        <span>Cash Flow Statement</span>
                        <Download size={16} />
                    </Button>
                    <Button variant="outline" style={{ justifyContent: 'space-between' }}>
                        <span>Tax Report</span>
                        <Download size={16} />
                    </Button>
                </div>
            </Card>
        </div>
    );

    const tabs = [
        { id: 'overview', label: 'Overview', content: <OverviewTab /> },
        { id: 'transactions', label: 'Transactions', content: <TransactionsTab /> },
        { id: 'reports', label: 'Reports', content: <ReportsTab /> },
    ];

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-6)' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Financial Management</h1>
                <Button variant="primary" icon={Plus}>Record Transaction</Button>
            </div>
            <Tabs tabs={tabs} />
        </div>
    );
}
