const PrePrimaryForm = require("../models/PrePrimarytoHigherForm");

// ================================
// CREATE FORM (POST)
// ================================
exports.createForm = async (req, res) => {
  try {
    const newForm = await PrePrimaryForm.create(req.body);
    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: newForm,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// ================================
// GET ALL FORMS
// ================================
exports.getAllForms = async (req, res) => {
  try {
    const forms = await PrePrimaryForm.find().sort({ createdAt: -1 });
    res.json({ success: true, data: forms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ================================
// GET SINGLE FORM BY ID
// ================================
exports.getFormById = async (req, res) => {
  try {
    const form = await PrePrimaryForm.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }
    res.json({ success: true, data: form });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ================================
// UPDATE FORM (PUT)
// ================================
exports.updateForm = async (req, res) => {
  try {
    const updated = await PrePrimaryForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    res.json({
      success: true,
      message: "Form updated successfully",
      data: updated,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// ================================
// DELETE FORM
// ================================
exports.deleteForm = async (req, res) => {
  try {
    const deleted = await PrePrimaryForm.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    res.json({ success: true, message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
