import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import './Auth.css';

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'patient'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // If user is already logged in, redirect to main page
        const user = authService.getCurrentUser();
        if (user) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await authService.register(userData);
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Register</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={userData.username}
                            onChange={(e) => setUserData({
                                ...userData,
                                username: e.target.value
                            })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({
                                ...userData,
                                email: e.target.value
                            })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={userData.password}
                            onChange={(e) => setUserData({
                                ...userData,
                                password: e.target.value
                            })}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Role:</label>
                        <select
                            value={userData.role}
                            onChange={(e) => setUserData({
                                ...userData,
                                role: e.target.value
                            })}
                        >
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                        </select>
                    </div>
                    <button type="submit">Register</button>
                </form>
                <p className="auth-link">
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>
    );
};

export default Register; 