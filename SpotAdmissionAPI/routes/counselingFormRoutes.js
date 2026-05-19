const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/counselingFormController");
const { protect, authorize } = require("../middleware/authMiddleware");

// CREATE
router.post("/", createAppointment);

// READ ALL (Admin/Counsellor only)
router.get("/", protect, authorize('admin', 'counsellor'), getAppointments);

// UPDATE
router.put("/:id", protect, authorize('admin', 'counsellor'), updateAppointment);

// DELETE
router.delete("/:id", protect, authorize('admin'), deleteAppointment);

module.exports = router;
