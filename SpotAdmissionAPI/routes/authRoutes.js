const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');


router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);


module.exports = router;