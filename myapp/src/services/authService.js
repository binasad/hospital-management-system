import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

const register = async (userData) => {
    try {
        console.log('Attempting to register with:', userData);
        const response = await axios.post(`${API_URL}/register`, userData);
        console.log('Registration response:', response.data);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error.response?.data || { message: 'Registration failed' };
    }
};

const login = async (credentials) => {
    try {
        console.log('Attempting to login with:', credentials);
        const response = await axios.post(`${API_URL}/login`, credentials);
        console.log('Login response:', response.data);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error.response?.data || { message: 'Login failed' };
    }
};

const logout = () => {
    localStorage.removeItem('user');
};

const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser
};

export default authService; 