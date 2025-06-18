import React from 'react';

const DoctorCard = ({ doctor, onEdit, onDelete }) => {
    // Add null check to prevent undefined errors
    if (!doctor) return null;

    return (
        <div className="doctor-card">
            <p>
                <span>Name:</span> {doctor.name}
            </p>
            <p>
                <span>Specialty:</span> {doctor.specialty}
            </p>
            <div className='btn-container'>
                <button onClick={() => onEdit(doctor)}>
                    Edit
                </button>
                <button onClick={() => onDelete(doctor._id)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DoctorCard; 