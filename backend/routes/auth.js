const express = require('express');
const router = express.Router();
const { validateRegistration, validateLogin } = require('../middleware/validation');
const auth = require('../middleware/auth');
const {
    register,
    login,
    getProfile,
    updateProfile
} = require('../controllers/authController');

// Register new user
router.post('/register', register);

// Login user
router.post('/login', login);

// Get user profile
router.get('/profile', auth, getProfile);

// Update user profile
router.patch('/profile', auth, updateProfile);

module.exports = router; 