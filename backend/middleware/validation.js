// Validation middleware
const validateDoctor = (req, res, next) => {
    const { name, specialty } = req.body;
    if (!name || !specialty) {
        return res.status(400).json({ message: 'Name and specialty are required' });
    }
    next();
};

const validatePatient = (req, res, next) => {
    const { name, age, gender } = req.body;
    if (!name || !age || !gender) {
        return res.status(400).json({ message: 'Name, age, and gender are required' });
    }
    next();
};

const validateAppointment = (req, res, next) => {
    const { patientName, doctorName, date } = req.body;
    if (!patientName || !doctorName || !date) {
        return res.status(400).json({ message: 'Patient name, doctor name, and date are required' });
    }
    next();
};

const validateRegistration = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ 
            message: 'Username, email, and password are required' 
        });
    }

    if (password.length < 6) {
        return res.status(400).json({ 
            message: 'Password must be at least 6 characters long' 
        });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ 
            message: 'Invalid email format' 
        });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ 
            message: 'Email and password are required' 
        });
    }

    next();
};

module.exports = {
    validateDoctor,
    validatePatient,
    validateAppointment,
    validateRegistration,
    validateLogin
}; 