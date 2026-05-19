// ============================================================
//  myFormsRoute.js
//  Mount karo:  app.use("/myforms", myFormsRoute);   in app.js
//
//  Yeh route sirf logged-in user ke apne forms return karta hai
//  Email se match karke — admin rights ki zarurat nahi.
// ============================================================

const express = require("express");
const router  = express.Router();
const { protect } = require("../middleware/authMiddleware");

const CareerForm              = require("../models/careerFormModel");
const CounselingAppointment   = require("../models/CounselingAppointmentForm");
const PersonalizedCounseling  = require("../models/PersonalizedCounselingForm");
const PrePrimaryForm          = require("../models/PrePrimarytoHigherForm");

// GET /myforms/
// Returns all form submissions where email === logged-in user's email
router.get("/", protect, async (req, res) => {
  try {
    const email = req.user.email.toLowerCase();

    const [career, counseling, personalized, prePrimary] = await Promise.all([
      CareerForm.find({ email }).sort({ createdAt: -1 }).lean(),
      CounselingAppointment.find({ email }).sort({ createdAt: -1 }).lean(),
      PersonalizedCounseling.find({ email }).sort({ createdAt: -1 }).lean(),
      PrePrimaryForm.find({
        $or: [
          { email },
          { parentEmail: email },
        ],
      })
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    const combined = [
      ...career.map((f) => ({
        _id:       f._id,
        formType:  "career",
        label:     "Career Guidance & Streams",
        status:    f.status || "Pending",
        createdAt: f.createdAt,
        detail:    f.preferredCareer || f.streamOptions || f.schoolName || "—",
        raw:       f,
      })),
      ...counseling.map((f) => ({
        _id:       f._id,
        formType:  "counseling",
        label:     "College Admission Counselling",
        status:    f.status || "Pending",
        createdAt: f.createdAt,
        detail:    f.category || f.concern || "—",
        raw:       f,
      })),
      ...personalized.map((f) => ({
        _id:       f._id,
        formType:  "personalized",
        label:     "Personalized Student Support",
        status:    f.status || "Pending",
        createdAt: f.createdAt,
        detail:    f.reason || f.schoolName || "—",
        raw:       f,
      })),
      ...prePrimary.map((f) => ({
        _id:       f._id,
        formType:  "preprimary",
        label:     "Pre-Primary to Higher Secondary",
        status:    f.status || "Pending",
        createdAt: f.createdAt,
        detail:    f.grade || f.schoolName || f.city || "—",
        raw:       f,
      })),
    ];

    // Sort newest first
    combined.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    res.json({ success: true, data: combined });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;