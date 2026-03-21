const express = require("express");
const router = express.Router();

const {
  createForm,
  getAllForms,
  getFormById,
  updateForm,
  deleteForm
} = require("../controllers/prePrimaryController");

// BASE URL: /api/preprimary

router.post("/", createForm);          // Create new form
router.get("/", getAllForms);          // Get all forms
router.get("/:id", getFormById);       // Get single form
router.put("/:id", updateForm);        // Update form
router.delete("/:id", deleteForm);     // Delete form

module.exports = router;
