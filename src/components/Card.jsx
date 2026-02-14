import React from 'react';

export default function Card({ children, className = '', title, action }) {
    return (
        <div className={`card ${className}`}>
            {(title || action) && (
                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {title && <h3 className="card-title">{title}</h3>}
                    {action && <div>{action}</div>}
                </div>
            )}
            <div className="card-content">
                {children}
            </div>
        </div>
    );
}
