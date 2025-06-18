//Appointments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentCard from './AppointmentCard';
import './Appointment.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        patientName: '',
        doctorName: '',
        date: ''
    });
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/appointments');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setError('Failed to fetch appointments');
        }
    };

    const handleAddAppointment = async (e) => {
        e.preventDefault();
        setError('');
        
        // Validate form
        if (!newAppointment.patientName || !newAppointment.doctorName || !newAppointment.date) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/appointments/add', newAppointment);
            setAppointments([...appointments, response.data]);
            setNewAppointment({
                patientName: '',
                doctorName: '',
                date: ''
            });
        } catch (error) {
            console.error('Error adding appointment:', error);
            setError('Failed to add appointment');
        }
    };

    const handleUpdateAppointment = async (id, e) => {
        e.preventDefault();
        setError('');

        // Validate form
        if (!selectedAppointment.patientName || !selectedAppointment.doctorName || !selectedAppointment.date) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/appointments/update/${id}`, selectedAppointment);
            const updateApp = {
                ...selectedAppointment,
                _id: id
            };
            setAppointments(
                appointments.map(appointment =>
                    appointment._id === id ? updateApp : appointment
                )
            );
            setSelectedAppointment(null);
            setIsEditMode(false);
        } catch (error) {
            console.error('Error updating appointment:', error);
            setError('Failed to update appointment');
        }
    };

    const handleDeleteAppointment = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/appointments/delete/${id}`);
            setAppointments(
                appointments.filter(appointment => appointment._id !== id)
            );
        } catch (error) {
            console.error('Error deleting appointment:', error);
            setError('Failed to delete appointment');
        }
    };

    const handleEditAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setIsEditMode(true);
    };

    return (
        <div className='flex-row' style={{ width: "100%" }}>
            <div className='flex-column'>
                <div className='add-form'>
                    <h4>
                        {isEditMode ? 'Edit Appointment' : 'Add New Appointment'}
                    </h4>
                    {error && <div className="error-message">{error}</div>}
                    <form className="appointment-form"
                        onSubmit={
                            isEditMode
                                ? (e) => handleUpdateAppointment(selectedAppointment._id, e)
                                : handleAddAppointment
                        }>
                        <div className="form-group">
                            <label>Patient Name:</label>
                            <input 
                                type="text"
                                required
                                value={
                                    isEditMode
                                        ? selectedAppointment.patientName
                                        : newAppointment.patientName
                                }
                                onChange={
                                    (e) =>
                                        isEditMode
                                            ? setSelectedAppointment({
                                                ...selectedAppointment,
                                                patientName: e.target.value
                                            })
                                            : setNewAppointment({
                                                ...newAppointment,
                                                patientName: e.target.value
                                            })
                                } 
                            />
                        </div>
                        <div className="form-group">
                            <label>Doctor Name:</label>
                            <input 
                                type="text"
                                required
                                value={
                                    isEditMode
                                        ? selectedAppointment.doctorName
                                        : newAppointment.doctorName
                                }
                                onChange={
                                    (e) =>
                                        isEditMode
                                            ? setSelectedAppointment({
                                                ...selectedAppointment,
                                                doctorName: e.target.value
                                            })
                                            : setNewAppointment({
                                                ...newAppointment,
                                                doctorName: e.target.value
                                            })
                                } 
                            />
                        </div>
                        <div className="form-group">
                            <label>Date:</label>
                            <input 
                                type="date"
                                required
                                value={
                                    isEditMode
                                        ? selectedAppointment.date
                                        : newAppointment.date
                                }
                                onChange={
                                    (e) =>
                                        isEditMode
                                            ? setSelectedAppointment({
                                                ...selectedAppointment,
                                                date: e.target.value
                                            })
                                            : setNewAppointment({
                                                ...newAppointment,
                                                date: e.target.value
                                            })
                                } 
                            />
                        </div>
                        <button type="submit" className="submit-button">
                            {isEditMode ? 'Update Appointment' : 'Add Appointment'}
                        </button>
                    </form>
                </div>
            </div>
            <div className='appointments'>
                <h3>Appointments ({appointments.length})</h3>
                <div className="appointment-list">
                    {appointments.map(appointment => (
                        <AppointmentCard
                            key={appointment._id}
                            appointment={appointment}
                            onEdit={handleEditAppointment}
                            onDelete={handleDeleteAppointment}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Appointments;