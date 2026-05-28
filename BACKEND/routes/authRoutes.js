const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// --- Your existing Forgot Password routes ---
router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password/:token', authController.resetPassword);

// --- NEW: Add the Register and Login routes here ---
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;