const express = require("express");
const router = express.Router();
const {
  createCareerForm,
  getAllCareerForms,
  getCareerFormById,
  updateCareerForm,
  deleteCareerForm,
} = require("../controllers/careerFormController");

const { protect, authorize } = require("../middleware/authMiddleware");

router.post("/", createCareerForm); // Submit form (Public)
router.get("/", protect, authorize('admin'), getAllCareerForms); // Get all (Admin only)
router.get("/:id", protect, authorize('admin'), getCareerFormById); // Get by ID (Admin only)
router.put("/:id", protect, authorize('admin'), updateCareerForm);
router.delete("/:id", protect, authorize('admin'), deleteCareerForm); // Delete (Admin only)

module.exports = router;
