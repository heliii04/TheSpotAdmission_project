const express = require("express");
const router = express.Router();

const {
  createForm,
  getAllForms,
  getFormById,
  updateForm,
  deleteForm
} = require("../controllers/prePrimaryController");

const { protect, authorize } = require("../middleware/authMiddleware");

// BASE URL: /api/preprimary

router.post("/", createForm);          // Create new form (Public)
router.get("/", protect, authorize('admin', 'counsellor'), getAllForms);          // Get all forms
router.get("/:id", protect, authorize('admin', 'counsellor'), getFormById);       // Get single form
router.put("/:id", protect, authorize('admin', 'counsellor'), updateForm);        // Update form
router.delete("/:id", protect, authorize('admin'), deleteForm);     // Delete form

module.exports = router;
