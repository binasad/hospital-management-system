import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Doctors.css';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        specialization: '',
        experience: '',
        contact: '',
        email: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDoctors();
    }, []);

    const loadDoctors = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get('http://localhost:5000/doctors');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error loading doctors:', error);
            setError('Failed to load doctors. Please make sure the server is running.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            const response = await axios.post('http://localhost:5000/doctors', formData);
            setFormData({
                name: '',
                specialization: '',
                experience: '',
                contact: '',
                email: ''
            });
            loadDoctors();
        } catch (error) {
            console.error('Error adding doctor:', error);
            setError('Failed to add doctor. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading doctors...</div>;
    }

    return (
        <div className="doctors-container">
            <h2>Add New Doctor</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label>Specialization:</label>
                    <input
                        type="text"
                        value={formData.specialization}
                        onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label>Experience:</label>
                    <input
                        type="number"
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label>Contact:</label>
                    <input
                        type="text"
                        value={formData.contact}
                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                    />
                </div>
                <button type="submit">Add Doctor</button>
            </form>

            <h2>Doctors List</h2>
            <div className="doctors-list">
                {doctors.map(doctor => (
                    <div key={doctor._id} className="doctor-card">
                        <h3>{doctor.name}</h3>
                        <p>Specialization: {doctor.specialization}</p>
                        <p>Experience: {doctor.experience} years</p>
                        <p>Contact: {doctor.contact}</p>
                        <p>Email: {doctor.email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Doctors;