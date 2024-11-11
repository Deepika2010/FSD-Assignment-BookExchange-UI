// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Adjust to your backend URL

// Axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Authentication Endpoints
export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (userData) => api.post('/auth/register', userData);
export const resetPassword = (email, newPassword) => api.post('/auth/reset-password', { email, newPassword });

export default api;
