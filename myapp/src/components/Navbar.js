import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-brand">
                <h1>Hospital Management</h1>
            </div>
            <div className="nav-links">
                <Link to="/appointments">Appointments</Link>
                <Link to="/doctors">Doctors</Link>
                <Link to="/patients">Patients</Link>
            </div>
            <div className="nav-user">
                {user && (
                    <>
                        <span>Welcome, {user.username}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 