import React, { useState } from 'react';
import { Search, ShoppingCart, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Modal from '../components/Modal';

// Mock Products
const products = [
    { id: 1, name: 'Wireless Headphones', price: 59.99, color: '#f87171' },
    { id: 2, name: 'Ergonomic Chair', price: 129.99, color: '#60a5fa' },
    { id: 3, name: 'Mechanical Keyboard', price: 89.99, color: '#34d399' },
    { id: 4, name: 'USB-C Cable', price: 9.99, color: '#a78bfa' },
    { id: 5, name: 'Smart Watch', price: 199.99, color: '#fbbf24' },
    { id: 6, name: 'Laptop Stand', price: 29.99, color: '#9ca3af' },
];

export default function Sales() {
    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    const updateQuantity = (id, delta) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = total * 0.1; // 10% tax
    const grandTotal = total + tax;

    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleCheckout = () => {
        setIsCheckoutOpen(true);
    };

    const confirmCheckout = () => {
        // Logic to save sale would go here
        setIsCheckoutOpen(false);
        setCart([]);
        alert('Sale completed successfully!');
    };

    return (
        <div className="container" style={{ height: 'calc(100vh - 100px)' }}> {/* Adjust height for full screen POS */}
            <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: 'var(--spacing-6)' }}>Point of Sale</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-6)', height: '100%' }}>
                {/* Left: Product Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                    <Input
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ marginBottom: 0 }}
                    />

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--spacing-4)', overflowY: 'auto' }}>
                        {filteredProducts.map(product => (
                            <Card key={product.id} className="product-card" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%' }}>
                                <div
                                    onClick={() => addToCart(product)}
                                    style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
                                >
                                    <div style={{ height: '100px', backgroundColor: product.color, borderRadius: 'var(--radius-md)', opacity: 0.8 }}></div>
                                    <div style={{ fontWeight: 600 }}>{product.name}</div>
                                    <div style={{ color: 'var(--color-primary)', fontWeight: 700 }}>${product.price.toFixed(2)}</div>
                                </div>
                                <Button variant="outline" size="sm" onClick={() => addToCart(product)} style={{ marginTop: '0.5rem', width: '100%' }}>
                                    Add to Cart
                                </Button>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Right: Cart */}
                <Card title="Current Sale" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                        {cart.length === 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text-muted)' }}>
                                <ShoppingCart size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                                <p>Cart is empty</p>
                            </div>
                        ) : (
                            cart.map(item => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>
                                    <div>
                                        <div style={{ fontWeight: 500 }}>{item.name}</div>
                                        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>${item.price.toFixed(2)} x {item.quantity}</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Button variant="ghost" className="btn-icon" onClick={() => updateQuantity(item.id, -1)} disabled={item.quantity <= 1}>
                                            <Minus size={14} />
                                        </Button>
                                        <span style={{ fontWeight: 600, width: '20px', textAlign: 'center' }}>{item.quantity}</span>
                                        <Button variant="ghost" className="btn-icon" onClick={() => updateQuantity(item.id, 1)}>
                                            <Plus size={14} />
                                        </Button>
                                        <Button variant="ghost" className="btn-icon" style={{ color: 'var(--color-error)' }} onClick={() => removeFromCart(item.id)}>
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: 'var(--spacing-4)', borderTop: '1px solid var(--color-border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <span style={{ color: 'var(--color-text-muted)' }}>Tax (10%)</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: 700 }}>
                            <span>Total</span>
                            <span>${grandTotal.toFixed(2)}</span>
                        </div>
                        <Button variant="primary" style={{ width: '100%', justifyContent: 'center' }} disabled={cart.length === 0} onClick={handleCheckout}>
                            Checkout
                        </Button>
                    </div>
                </Card>
            </div>

            <Modal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} title="Complete Sale">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: 'var(--color-bg)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Total Amount</div>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)' }}>${grandTotal.toFixed(2)}</div>
                    </div>

                    <Input label="Customer Name (Optional)" placeholder="Walk-in Customer" />

                    <div>
                        <label className="input-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Payment Method</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            <Button variant="outline" style={{ justifyContent: 'center' }}>Cash</Button>
                            <Button variant="primary" style={{ justifyContent: 'center' }}>Card</Button>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <Button variant="outline" onClick={() => setIsCheckoutOpen(false)}>Cancel</Button>
                    <Button variant="primary" icon={CreditCard} onClick={confirmCheckout}>Pay & Print Receipt</Button>
                </div>
            </Modal>
        </div>
    );
}
