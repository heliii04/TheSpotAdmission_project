const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");
const { protect, admin } = require("../middleware/authMiddleware");

// 📩 Public route — Create a new contact form submission
router.post('/contact', contactController.createContact);

// 🔒 Admin-only routes — View, Get by ID, Delete
router.get('/contact', protect, admin, contactController.getContacts);
router
    .route('/contact/:id')
    .get(protect, admin, contactController.getContactById)
    .delete(protect, admin, contactController.deleteContact);

module.exports = router;
