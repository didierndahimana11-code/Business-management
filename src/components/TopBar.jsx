import React from 'react';
import { Bell, User, Sun, Moon, Menu } from 'lucide-react';
import Button from './Button';

export default function TopBar({ title, onThemeToggle, isDarkMode, onMenuClick }) {
    return (
        <div className="topbar">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Button variant="ghost" className="mobile-menu-btn" onClick={onMenuClick}>
                    <Menu size={20} />
                </Button>
                <h2 className="topbar-title">{title}</h2>
            </div>
            <div className="topbar-actions">
                <Button variant="ghost" onClick={onThemeToggle} className="btn-icon">
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </Button>
                <Button variant="ghost" className="btn-icon">
                    <Bell size={20} />
                </Button>
                <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-border)' }}></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <User size={18} />
                    </div>
                    <span className="user-name" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Admin</span>
                </div>
            </div>
        </div>
    );
}
