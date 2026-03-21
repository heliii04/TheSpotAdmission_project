const CounselingForm = require("../models/PersonalizedCounselingForm");

// Create Form
exports.createForm = async (req, res) => {
  try {
    const form = new CounselingForm(req.body);
    await form.save();
    res.status(201).json({ message: "Form submitted successfully", form });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Forms
exports.getForms = async (req, res) => {
  try {
    const forms = await CounselingForm.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Form
exports.getFormById = async (req, res) => {
  try {
    const form = await CounselingForm.findById(req.params.id);
    res.json(form);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Form
exports.updateForm = async (req, res) => {
  try {
    const updated = await CounselingForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: "Updated successfully", updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Form
exports.deleteForm = async (req, res) => {
  try {
    await CounselingForm.findByIdAndDelete(req.params.id);
    res.json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
