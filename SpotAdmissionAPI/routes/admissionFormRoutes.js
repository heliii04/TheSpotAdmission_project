const express = require("express");
const {
  createForm,
  getForms,
  updateForm,
  deleteForm,
  getMyAdmissionStatus
} = require("../controllers/admissionFormController");

const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/my-status/:email", protect, getMyAdmissionStatus);
router.post("/", createForm); // Public or protect by user choice, usually public for new applicants
router.get("/", protect, authorize('admin', 'counsellor'), getForms);
router.put("/:id", protect, authorize('admin'), updateForm);
router.delete("/:id", protect, authorize('admin'), deleteForm);

module.exports = router;
