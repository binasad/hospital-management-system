// src/components/AppointmentCard.js

import React from 'react';

const AppointmentCard = ({
    appointment,
    onEdit,
    onDelete
}) => {
    if (!appointment) return null;

    return (
        <div className="appointment-card">
            <p><span>Patient Name:</span> {appointment.patientName}</p>
            <p><span>Doctor Name:</span> {appointment.doctorName}</p>
            <p><span>Date:</span> {new Date(appointment.date).toLocaleString()}</p>
             
            <div className='btn-container'>
                <button onClick={() => onEdit(appointment)}>Edit</button>
                <button onClick={() => onDelete(appointment._id)}>Delete</button>
            </div>
        </div>
    );
};

export default AppointmentCard;