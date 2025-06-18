const Patient = require('../models/Patient');

// Get all patients
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add new patient
const addPatient = async (req, res) => {
    try {
        const { name, age, gender } = req.body;
        const newPatient = new Patient({ name, age, gender });
        const savedPatient = await newPatient.save();
        res.json(savedPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update patient
const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, gender } = req.body;
        const updatedPatient = await Patient.findByIdAndUpdate(
            id,
            { name, age, gender },
            { new: true }
        );
        if (!updatedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(updatedPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete patient
const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPatient = await Patient.findByIdAndDelete(id);
        if (!deletedPatient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllPatients,
    addPatient,
    updatePatient,
    deletePatient
}; 