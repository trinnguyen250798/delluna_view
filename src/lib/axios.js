// lib/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BARE_URL_API,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: Thêm interceptor nếu cần token
axiosInstance.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
