//App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Appointments from './components/Appointments';
import Doctors from './components/Doctors';
import Patients from './components/Patients';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {
    const isLinkActive = (path) => window.location.pathname === path;

    return (
        <Router>
            <div className="container">
                <h1 style={{ color: "green" }}>
                    GFG- Hospital Management App
                </h1>
                <nav>
                    <ul>
                        <li className={isLinkActive('/appointments') ? 'active' : ''}>
                            <Link to="/appointments">Appointments</Link>
                        </li>
                        <li className={isLinkActive('/doctors') ? 'active' : ''}>
                            <Link to="/doctors">Doctors</Link>
                        </li>
                        <li className={isLinkActive('/patients') ? 'active' : ''}>
                            <Link to="/patients">Patients</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    {/* Public routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Protected routes */}
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Appointments />
                        </ProtectedRoute>
                    } />
                    <Route path="/appointments" element={
                        <ProtectedRoute>
                            <Appointments />
                        </ProtectedRoute>
                    } />
                    <Route path="/doctors" element={
                        <ProtectedRoute>
                            <Doctors />
                        </ProtectedRoute>
                    } />
                    <Route path="/patients" element={
                        <ProtectedRoute>
                            <Patients />
                        </ProtectedRoute>
                    } />
                </Routes>
            </div>
        </Router>
    );
}

export default App;