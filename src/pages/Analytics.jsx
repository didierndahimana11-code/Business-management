import React from 'react';
import {
    BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import Card from '../components/Card';
import Button from '../components/Button';
import { Download, Calendar } from 'lucide-react';

const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 2000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 1890 },
    { name: 'Sat', sales: 2390 },
    { name: 'Sun', sales: 3490 },
];

const categoryData = [
    { name: 'Electronics', value: 400 },
    { name: 'Furniture', value: 300 },
    { name: 'Accessories', value: 300 },
    { name: 'Apparel', value: 200 },
];

const COLORS = ['#6366f1', '#ec4899', '#8b5cf6', '#10b981'];

export default function Analytics() {
    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-6)' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Analytics & Reports</h1>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button variant="outline" icon={Calendar}>Last 7 Days</Button>
                    <Button variant="outline" icon={Download}>Export PDF</Button>
                </div>
            </div>

            <div className="dashboard-grid dashboard-grid-2">
                <Card title="Sales Trend">
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--color-text-muted)' }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                    contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                                />
                                <Bar dataKey="sales" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card title="Sales by Category">
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>

            <Card title="Top Selling Products">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    {[1, 2, 3].map((i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 700, color: '#e2e8f0' }}>0{i}</div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Product Name {i}</div>
                                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>1,234 units sold</div>
                            </div>
                            <div style={{ marginLeft: 'auto', fontWeight: 700, color: 'var(--color-success)' }}>+12%</div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
