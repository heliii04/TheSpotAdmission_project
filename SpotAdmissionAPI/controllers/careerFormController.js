const CareerForm = require("../models/careerFormModel");

// ✅ Create new form entry (POST)
exports.createCareerForm = async (req, res) => {
  try {
    const newForm = new CareerForm(req.body);
    await newForm.save();
    res.status(201).json({ message: "Form submitted successfully", form: newForm });
  } catch (error) {
    res.status(500).json({ message: "Error submitting form", error: error.message });
  }
};

// ✅ Get all forms (GET)
exports.getAllCareerForms = async (req, res) => {
  try {
    const forms = await CareerForm.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms", error: error.message });
  }
};

// ✅ Get a single form by ID (GET)
exports.getCareerFormById = async (req, res) => {
  try {
    const form = await CareerForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error fetching form", error: error.message });
  }
};

// ✅ Update a form by ID (PUT)
exports.updateCareerForm = async (req, res) => {
  try {
    const updatedForm = await CareerForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedForm) return res.status(404).json({ message: "Form not found" });

    res.status(200).json({ message: "Form updated successfully", form: updatedForm });
  } catch (error) {
    res.status(500).json({ message: "Error updating form", error: error.message });
  }
};

// ✅ Delete a form by ID (DELETE)
exports.deleteCareerForm = async (req, res) => {
  try {
    const deletedForm = await CareerForm.findByIdAndDelete(req.params.id);
    if (!deletedForm) return res.status(404).json({ message: "Form not found" });
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting form", error: error.message });
  }
};
