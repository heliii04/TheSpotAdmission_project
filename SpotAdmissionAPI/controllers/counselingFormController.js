const CounselingAppointment = require("../models/CounselingAppointmentForm");

// Create (POST)
exports.createAppointment = async (req, res) => {
  try {
    const form = await CounselingAppointment.create(req.body);
    res.status(201).json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All (GET)
exports.getAppointments = async (req, res) => {
  try {
    const forms = await CounselingAppointment.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update (PUT)
exports.updateAppointment = async (req, res) => {
  try {
    const updated = await CounselingAppointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete (DELETE)
exports.deleteAppointment = async (req, res) => {
  try {
    await CounselingAppointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
