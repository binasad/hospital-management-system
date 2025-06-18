// routes/doctors.js

const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: error.message });
    }
});

// Create doctor
router.post('/', async (req, res) => {
    try {
        console.log('Received doctor data:', req.body);
        
        const doctor = new Doctor({
            name: req.body.name,
            specialization: req.body.specialization,
            experience: parseInt(req.body.experience),
            contact: req.body.contact,
            email: req.body.email
        });

        const savedDoctor = await doctor.save();
        console.log('Doctor saved successfully:', savedDoctor);
        res.status(201).json(savedDoctor);
    } catch (error) {
        console.error('Error creating doctor:', error);
        res.status(400).json({ message: error.message });
    }
});

// Update doctor
router.put('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        Object.assign(doctor, req.body);
        const updatedDoctor = await doctor.save();
        res.json(updatedDoctor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete doctor
router.delete('/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        await doctor.deleteOne();
        res.json({ message: 'Doctor deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;