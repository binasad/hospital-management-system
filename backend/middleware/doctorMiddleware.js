const Doctor = require('../models/Doctor');

// Validate doctor data
exports.validateDoctor = (req, res, next) => {
    const { name, specialization, experience, contact, email } = req.body;

    if (!name || !specialization || !experience || !contact || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Convert experience to number and validate
    const expNum = parseInt(experience);
    if (isNaN(expNum) || expNum < 0) {
        return res.status(400).json({ message: 'Experience must be a positive number' });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    // Update the request body with parsed experience
    req.body.experience = expNum;
    next();
};

// Check if doctor exists
exports.checkDoctorExists = async (req, res, next) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        req.doctor = doctor;
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Check if email is unique
exports.checkEmailUnique = async (req, res, next) => {
    try {
        const existingDoctor = await Doctor.findOne({ email: req.body.email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 