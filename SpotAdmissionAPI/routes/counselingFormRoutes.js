const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/counselingFormController");

// CREATE
router.post("/", createAppointment);

// READ ALL
router.get("/", getAppointments);

// UPDATE
router.put("/:id", updateAppointment);

// DELETE
router.delete("/:id", deleteAppointment);

module.exports = router;
