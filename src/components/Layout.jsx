import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function Layout() {
    const location = useLocation();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Determine title based on path
    const getTitle = () => {
        switch (location.pathname) {
            case '/': return 'Dashboard';
            case '/finance': return 'Financial Management';
            case '/inventory': return 'Warehouse & Inventory';
            case '/sales': return 'Sales';
            case '/analytics': return 'Analytics';
            case '/settings': return 'Settings';
            default: return 'Business Manager';
        }
    };

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        // Apply theme
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    return (
        <div className="app-layout">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="main-content">
                <TopBar
                    title={getTitle()}
                    onThemeToggle={toggleTheme}
                    isDarkMode={isDarkMode}
                    onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
                />
                <main className="content-area">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
