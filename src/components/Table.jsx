import React from 'react';

export default function Table({ headers, data, renderRow }) {
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => renderRow(item, index))}
                </tbody>
            </table>
        </div>
    );
}
