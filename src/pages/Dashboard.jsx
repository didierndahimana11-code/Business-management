import React from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';
import { ArrowUpRight, ArrowDownRight, Package, AlertCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const performanceData = [
    { name: 'Jan', revenue: 4000, profit: 2400 },
    { name: 'Feb', revenue: 3000, profit: 1398 },
    { name: 'Mar', revenue: 2000, profit: 9800 },
    { name: 'Apr', revenue: 2780, profit: 3908 },
    { name: 'May', revenue: 1890, profit: 4800 },
    { name: 'Jun', revenue: 2390, profit: 3800 },
    { name: 'Jul', revenue: 3490, profit: 4300 },
];

export default function Dashboard() {
    return (
        <div className="container">
            {/* Top Cards */}
            <div className="dashboard-grid">
                <Card>
                    <div className="summary-card-label">Total Revenue</div>
                    <div className="summary-card-value">$54,230.00</div>
                    <div className="trend-up">
                        <ArrowUpRight size={16} />
                        <span>12.5% from last month</span>
                    </div>
                </Card>
                <Card>
                    <div className="summary-card-label">Total Profit</div>
                    <div className="summary-card-value">$21,450.00</div>
                    <div className="trend-up">
                        <ArrowUpRight size={16} />
                        <span>8.2% from last month</span>
                    </div>
                </Card>
                <Card>
                    <div className="summary-card-label">Total Expenses</div>
                    <div className="summary-card-value">$32,780.00</div>
                    <div className="trend-down">
                        <ArrowDownRight size={16} />
                        <span>2.1% from last month</span>
                    </div>
                </Card>
                <Card>
                    <div className="summary-card-label">Look Stock Items</div>
                    <div className="summary-card-value">12</div>
                    <div className="trend-down" style={{ color: 'var(--color-warning)' }}>
                        <AlertCircle size={16} />
                        <span>Requires attention</span>
                    </div>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="dashboard-grid dashboard-grid-2">
                {/* Chart */}
                <Card title="Revenue & Profit Overview" action={<Button variant="outline" className="btn-icon">Export</Button>}>
                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)' }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorRevenue)" />
                                <Area type="monotone" dataKey="profit" stroke="var(--color-secondary)" fillOpacity={1} fill="url(#colorProfit)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Quick Actions / Inventory Snapshot */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
                    <Card title="Quick Actions">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)' }}>
                            <Button variant="primary" style={{ justifyContent: 'center' }}>New Sale</Button>
                            <Button variant="secondary" style={{ justifyContent: 'center' }}>Add Product</Button>
                            <Button variant="outline" style={{ justifyContent: 'center' }}>Add Expense</Button>
                            <Button variant="outline" style={{ justifyContent: 'center' }}>Generate Report</Button>
                        </div>
                    </Card>

                    <Card title="Low Stock Alert">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                            {[
                                { name: 'Wireless Headphones', stock: 2 },
                                { name: 'Smart Watch Gen 4', stock: 5 },
                                { name: 'USB-C Cable', stock: 8 },
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.75rem', borderBottom: i < 2 ? '1px solid var(--color-border)' : 'none' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ padding: '0.5rem', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)' }}>
                                            <Package size={16} />
                                        </div>
                                        <span style={{ fontWeight: 500 }}>{item.name}</span>
                                    </div>
                                    <span className="badge badge-error">{item.stock} left</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
