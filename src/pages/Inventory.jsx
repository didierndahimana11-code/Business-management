import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Filter, AlertTriangle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Table from '../components/Table';
import Input from '../components/Input';
import Modal from '../components/Modal';
import { api } from '../utils/api';

export default function Inventory() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await api.get('/products');
            setProducts(data);
        } catch (err) {
            console.error('Failed to fetch products:', err);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAdd = () => {
        setCurrentProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                setProducts(products.filter(p => p.id !== id));
            } catch (err) {
                alert('Failed to delete product');
            }
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const productData = {
            name: formData.get('name'),
            category: formData.get('category'),
            price: parseFloat(formData.get('price')),
            stock: parseInt(formData.get('stock')),
            supplier: formData.get('supplier'),
        };

        try {
            if (currentProduct) {
                const updated = await api.put(`/products/${currentProduct.id}`, productData);
                setProducts(products.map(p => p.id === currentProduct.id ? updated : p));
            } else {
                const created = await api.post('/products', productData);
                setProducts([...products, created]);
            }
            setIsModalOpen(false);
        } catch (err) {
            alert('Failed to save product');
        }
    };

    const renderProductRow = (item) => (
        <tr key={item.id}>
            <td>
                <div style={{ fontWeight: 500 }}>{item.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{item.category}</div>
            </td>
            <td>${item.price.toFixed(2)}</td>
            <td>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className={`badge ${item.stock < 10 ? 'badge-error' : 'badge-success'}`}>
                        {item.stock}
                    </span>
                    {item.stock < 5 && <AlertTriangle size={14} color="var(--color-warning)" />}
                </div>
            </td>
            <td>{item.supplier}</td>
            <td>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button variant="ghost" className="btn-icon" onClick={() => handleEdit(item)}>
                        <Edit2 size={16} />
                    </Button>
                    <Button variant="ghost" className="btn-icon" style={{ color: 'var(--color-error)' }} onClick={() => handleDelete(item.id)}>
                        <Trash2 size={16} />
                    </Button>
                </div>
            </td>
        </tr>
    );

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-6)' }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Warehouse & Inventory</h1>
                <Button variant="primary" icon={Plus} onClick={handleAdd}>Add Product</Button>
            </div>

            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ width: '100%', maxWidth: '300px' }}>
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <input
                                className="input-field"
                                placeholder="Search products..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Button variant="outline" icon={Filter}>Filter</Button>
                        <Button variant="outline">Export</Button>
                    </div>
                </div>

                <Table
                    headers={['Product', 'Price', 'Stock', 'Supplier', 'Actions']}
                    data={filteredProducts}
                    renderRow={renderProductRow}
                />
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentProduct ? 'Edit Product' : 'Add New Product'}
            >
                <form id="product-form" onSubmit={handleSave}>
                    <Input label="Product Name" name="name" defaultValue={currentProduct?.name} required />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <Input label="Category" name="category" defaultValue={currentProduct?.category} required />
                        <Input label="Supplier" name="supplier" defaultValue={currentProduct?.supplier} required />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <Input label="Price" name="price" type="number" step="0.01" defaultValue={currentProduct?.price} required />
                        <Input label="Stock Quantity" name="stock" type="number" defaultValue={currentProduct?.stock} required />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                        <Button type="submit" variant="primary">Save Product</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
