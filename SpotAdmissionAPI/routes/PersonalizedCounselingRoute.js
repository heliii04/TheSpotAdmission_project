const express = require("express");
const router = express.Router();
const PersonalizedCounseling = require("../models/PersonalizedCounselingForm");

// POST /personalizedcounselingform
router.post("/", async (req, res) => {
  try {
    const form = new PersonalizedCounseling(req.body);
    await form.save();
    res.status(201).json({ success: true, message: "Form submitted successfully!", data: form });
  } catch (err) {
    console.error("PersonalizedCounseling Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /personalizedcounselingform — saare forms (admin ke liye)
router.get("/", async (req, res) => {
  try {
    const forms = await PersonalizedCounseling.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: forms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;