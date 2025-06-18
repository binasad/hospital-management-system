import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Patients.css';
import PatientCard from './PatientCard';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '' });
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const response = await axios.get('http://localhost:5000/patients');
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
            setError('Failed to fetch patients');
        }
    };

    const handleAddPatient = async (e) => {
        e.preventDefault();
        setError('');

        // Validate form
        if (!newPatient.name || !newPatient.age || !newPatient.gender) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/patients/add', newPatient);
            setPatients([...patients, response.data]);
            setNewPatient({ name: '', age: '', gender: '' });
        } catch (error) {
            console.error('Error adding patient:', error);
            setError('Failed to add patient. Please try again.');
        }
    };

    const handleUpdatePatient = async (id, e) => {
        e.preventDefault();
        setError('');

        // Validate form
        if (!selectedPatient.name || !selectedPatient.age || !selectedPatient.gender) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/patients/update/${id}`, selectedPatient);
            const updatePat = {
                ...selectedPatient,
                _id: id
            };
            setPatients(
                patients.map(patient =>
                    patient._id === id ? updatePat : patient
                )
            );
            setSelectedPatient(null);
            setIsEditMode(false);
        } catch (error) {
            console.error('Error updating patient:', error);
            setError('Failed to update patient. Please try again.');
        }
    };

    const handleDeletePatient = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/patients/delete/${id}`);
            setPatients(
                patients.filter(patient => patient._id !== id)
            );
        } catch (error) {
            console.error('Error deleting patient:', error);
            setError('Failed to delete patient. Please try again.');
        }
    };

    const handleEditPatient = (patient) => {
        setSelectedPatient(patient);
        setIsEditMode(true);
    };

    return (
        <div className='patient-main'>
            <div className='form-sections'>
                <h4>
                    {isEditMode ? 'Edit Patient' : 'Add New Patient'}
                </h4>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={
                    isEditMode
                        ? (e) => handleUpdatePatient(selectedPatient._id, e)
                        : handleAddPatient
                }>
                    <div className="form-group">
                        <label>Name: </label>
                        <input
                            type="text"
                            required
                            value={
                                isEditMode
                                    ? selectedPatient.name
                                    : newPatient.name
                            }
                            onChange={
                                (e) =>
                                    isEditMode
                                        ? setSelectedPatient({
                                            ...selectedPatient,
                                            name: e.target.value
                                        })
                                        : setNewPatient({
                                            ...newPatient,
                                            name: e.target.value
                                        })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>Age: </label>
                        <input
                            type="number"
                            required
                            value={
                                isEditMode
                                    ? selectedPatient.age
                                    : newPatient.age
                            }
                            onChange={
                                (e) =>
                                    isEditMode
                                        ? setSelectedPatient({
                                            ...selectedPatient,
                                            age: e.target.value
                                        })
                                        : setNewPatient({
                                            ...newPatient,
                                            age: e.target.value
                                        })
                            }
                        />
                    </div>
                    <div className="form-group">
                        <label>Gender: </label>
                        <select
                            required
                            value={
                                isEditMode
                                    ? selectedPatient.gender
                                    : newPatient.gender
                            }
                            onChange={
                                (e) =>
                                    isEditMode
                                        ? setSelectedPatient({
                                            ...selectedPatient,
                                            gender: e.target.value
                                        })
                                        : setNewPatient({
                                            ...newPatient,
                                            gender: e.target.value
                                        })
                            }
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button type="submit" className="submit-button">
                        {isEditMode ? 'Update Patient' : 'Add Patient'}
                    </button>
                </form>
            </div>

            <div className='patients-section'>
                <h3>Patients ({patients.length})</h3>
                <div className="patient-list">
                    {patients.map(patient => (
                        <PatientCard
                            key={patient._id}
                            patient={patient}
                            onEdit={handleEditPatient}
                            onDelete={handleDeletePatient}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Patients;