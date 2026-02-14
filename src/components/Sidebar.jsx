import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Banknote, Package, ShoppingCart, BarChart2, Settings, Briefcase } from 'lucide-react';

export default function Sidebar({ isOpen, onClose }) {
    const navItems = [
        { name: 'Dashboard', path: '/', icon: LayoutDashboard },
        { name: 'Finance', path: '/finance', icon: Banknote },
        { name: 'Inventory', path: '/inventory', icon: Package },
        { name: 'Sales', path: '/sales', icon: ShoppingCart },
        { name: 'Analytics', path: '/analytics', icon: BarChart2 },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    return (
        <>
            <div
                className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            ></div>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-logo">
                    <Briefcase size={24} />
                    <span>BizManager</span>
                </div>
                <nav className="nav-menu">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                            onClick={() => {
                                if (window.innerWidth <= 768) {
                                    onClose();
                                }
                            }}
                        >
                            <item.icon size={20} />
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </>
    );
}
