const AdmissionForm = require("../models/AdmissionForm");

// Create Form (POST)
exports.createForm = async (req, res) => {
  try {
    const form = await AdmissionForm.create(req.body);
    res.status(201).json(form);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Forms (GET)
exports.getForms = async (req, res) => {
  try {
    const forms = await AdmissionForm.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update (PUT)
exports.updateForm = async (req, res) => {
  try {
    const updated = await AdmissionForm.findByIdAndUpdate(
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
exports.deleteForm = async (req, res) => {
  try {
    await AdmissionForm.findByIdAndDelete(req.params.id);
    res.json({ message: "Form deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
