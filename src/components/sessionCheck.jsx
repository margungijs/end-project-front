import axios from 'axios';

const api = axios.create({
    baseURL: '/api/authenticated',
    withCredentials: true,
});

api.interceptors.response.use(
    res => res,
    err => {
        if (err.response && err.response.status === 401) {
            console.log('Session expired. Redirecting to login.');
            localStorage.removeItem('user');
            window.location.href = '/login'; // Or use router if using React Router
        }
        return Promise.reject(err);
    }
);

export const checkSession = async () => {
    try {
        const res = await api.get('/user');
        console.log('Session OK:', res.data.user);
        return res.data.user;
    } catch (error) {
        console.error('Session check failed:', error);
        // Already handled by interceptor
    }
};
