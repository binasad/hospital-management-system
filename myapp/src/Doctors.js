import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from './components/DoctorCard';
import './Doctors.css';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] = useState({
        name: '',
        specialty: ''
    });
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/doctors');
            // Ensure we have valid data
            const validDoctors = Array.isArray(response.data) 
                ? response.data.filter(doctor => doctor && doctor.name && doctor.specialty)
                : [];
            setDoctors(validDoctors);
            setError('');
        } catch (error) {
            console.error('Error fetching doctors:', error);
            setError('Failed to fetch doctors');
            setDoctors([]);
        } finally {
            setLoading(false);
        }
    };

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        setError('');

        // Validate form
        if (!newDoctor.name || !newDoctor.specialty) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/doctors/add', newDoctor);
            if (response.data && response.data.name && response.data.specialty) {
                setDoctors(prevDoctors => [...prevDoctors, response.data]);
                setNewDoctor({
                    name: '',
                    specialty: ''
                });
                setError('');
            } else {
                throw new Error('Invalid doctor data received');
            }
        } catch (error) {
            console.error('Error adding doctor:', error);
            setError('Failed to add doctor. Please try again.');
        }
    };

    const handleUpdateDoctor = async (id, e) => {
        e.preventDefault();
        setError('');

        if (!selectedDoctor || !selectedDoctor.name || !selectedDoctor.specialty) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/doctors/update/${id}`, selectedDoctor);
            if (response.data) {
                setDoctors(prevDoctors =>
                    prevDoctors.map(doctor =>
                        doctor._id === id ? { ...selectedDoctor, _id: id } : doctor
                    )
                );
                setSelectedDoctor(null);
                setIsEditMode(false);
                setError('');
            }
        } catch (error) {
            console.error('Error updating doctor:', error);
            setError('Failed to update doctor. Please try again.');
        }
    };

    const handleDeleteDoctor = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/doctors/delete/${id}`);
            setDoctors(prevDoctors => prevDoctors.filter(doctor => doctor._id !== id));
            setError('');
        } catch (error) {
            console.error('Error deleting doctor:', error);
            setError('Failed to delete doctor. Please try again.');
        }
    };

    const handleEditDoctor = (doctor) => {
        if (doctor && doctor.name && doctor.specialty) {
            setSelectedDoctor(doctor);
            setIsEditMode(true);
        }
    };

    return (
        <div className='main-doc-container'>
            <div className='form-sections'>
                <h4>
                    {isEditMode ? 'Edit Doctor' : 'Add New Doctor'}
                </h4>
                {error && <div className="error-message">{error}</div>}
                <form
                    onSubmit={
                        isEditMode
                            ? (e) => handleUpdateDoctor(selectedDoctor?._id, e)
                            : handleAddDoctor
                    }>
                    <div className="form-group">
                        <label>Name: </label>
                        <input
                            type="text"
                            required
                            value={
                                isEditMode
                                    ? selectedDoctor?.name || ''
                                    : newDoctor.name
                            }
                            onChange={
                                (e) =>
                                    isEditMode
                                        ? setSelectedDoctor(prev => ({
                                            ...prev,
                                            name: e.target.value
                                        }))
                                        : setNewDoctor(prev => ({
                                            ...prev,
                                            name: e.target.value
                                        }))
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>Specialty: </label>
                        <input
                            type="text"
                            required
                            value={
                                isEditMode
                                    ? selectedDoctor?.specialty || ''
                                    : newDoctor.specialty
                            }
                            onChange={
                                (e) =>
                                    isEditMode
                                        ? setSelectedDoctor(prev => ({
                                            ...prev,
                                            specialty: e.target.value
                                        }))
                                        : setNewDoctor(prev => ({
                                            ...prev,
                                            specialty: e.target.value
                                        }))
                            }
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        {isEditMode ? 'Update Doctor' : 'Add Doctor'}
                    </button>
                </form>
            </div>
            <div className='doctors-section'>
                <h3>Doctors ({doctors.length})</h3>
                {loading ? (
                    <div>Loading...</div>
                ) : doctors.length === 0 ? (
                    <div>No doctors found</div>
                ) : (
                    <div className="doctor-list">
                        {doctors.map(doctor => (
                            doctor && doctor.name && doctor.specialty && (
                                <DoctorCard
                                    key={doctor._id}
                                    doctor={doctor}
                                    onEdit={handleEditDoctor}
                                    onDelete={handleDeleteDoctor}
                                />
                            )
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Doctors; 