const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { protect, authorize } = require("../middleware/authMiddleware");

// 📩 Public route — Create a new contact form submission
router.post('/contact', contactController.createContact);

// 🔒 Restricted routes — View, Get by ID, Delete
router.get('/contact', protect, authorize('admin', 'counsellor'), contactController.getContacts);
router
    .route('/contact/:id')
    .get(protect, authorize('admin', 'counsellor'), contactController.getContactById)
    .delete(protect, authorize('admin'), contactController.deleteContact);

module.exports = router;
