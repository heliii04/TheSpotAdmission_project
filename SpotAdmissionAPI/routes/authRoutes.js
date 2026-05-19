const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const authController = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, authController.updateProfile);

// Admin & Management
router.get('/users', protect, authorize('admin', 'counsellor'), authController.getUsers);
router.delete('/users/:id', protect, authorize('admin'), authController.deleteUser);
router.put('/users/:id/role', protect, authorize('admin'), authController.updateUserRole);
router.post('/add-team', protect, authorize('admin'), authController.addTeamMember);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);


module.exports = router;