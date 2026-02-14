import React from 'react';

export default function Button({ children, variant = 'primary', className = '', icon: Icon, ...props }) {
    return (
        <button className={`btn btn-${variant} ${className}`} {...props}>
            {Icon && <Icon size={18} />}
            {children}
        </button>
    );
}
