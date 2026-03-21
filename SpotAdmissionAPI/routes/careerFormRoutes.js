const express = require("express");
const router = express.Router();
const {
  createCareerForm,
  getAllCareerForms,
  getCareerFormById,
  updateCareerForm,
  deleteCareerForm,
} = require("../controllers/careerFormController");

router.post("/", createCareerForm); // Submit form
router.get("/", getAllCareerForms); // Get all
router.get("/:id", getCareerFormById); // Get by ID
router.put("/:id", updateCareerForm);
router.delete("/:id", deleteCareerForm); // Delete

module.exports = router;
