const API_BASE = '/api';

export const api = {
    get: async (endpoint) => {
        const response = await fetch(`${API_BASE}${endpoint}`);
        if (!response.ok) throw new Error('API request failed');
        return response.json();
    },

    post: async (endpoint, data) => {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('API request failed');
        return response.json();
    },

    put: async (endpoint, data) => {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('API request failed');
        return response.json();
    },

    delete: async (endpoint) => {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('API request failed');
        return response.json();
    },
};
