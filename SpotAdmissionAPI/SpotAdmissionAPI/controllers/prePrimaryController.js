const PrePrimaryForm = require("../models/PrePrimarytoHigherForm");
const sendEmail = require("../utils/emailService");

// ================================
// CREATE FORM (POST)
// ================================
exports.createForm = async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await PrePrimaryForm.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: "An inquiry from this email already exists." });

    // Map 'class' from frontend to 'grade' in model
    if (req.body.class && !req.body.grade) {
      req.body.grade = req.body.class;
    }

    const newForm = await PrePrimaryForm.create(req.body);

    // Auto-Register User if account doesn't exist
    let credentialsBlock = "";
    try {
      const { autoRegisterUser, getCredentialsBlock } = require("../utils/authHelpers");
      const { name, fatherName, motherName, contact } = req.body;
      const displayName = name || fatherName || motherName || "User";
      const { password, isNew } = await autoRegisterUser(displayName, email, contact);
      if (isNew) {
        credentialsBlock = getCredentialsBlock(email.toLowerCase(), password);
      }
    } catch (e) { console.error("Auto-registration failed:", e.message); }

    // Send Email Notifications
    try {
      const { fullName, email, contact, address, city, fatherName, motherName, class: schoolingType } = req.body;
      
      // Email to Admin
      await sendEmail({
        email: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `New Pre-Primary Inquiry: ${fullName}`,
        html: `
          <h3>New Pre-Primary to Higher Education Inquiry</h3>
          <p><strong>Parent Name:</strong> ${fatherName || motherName}</p>
          <p><strong>Child Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${contact}</p>
          <p><strong>Location:</strong> ${city || address}</p>
          <p><strong>Schooling Type:</strong> ${schoolingType}</p>
        `
      });

      // Confirmation to User
      if (email) {
        await sendEmail({
          email: email,
          subject: "Inquiry Received - The Spot Admission",
          html: `
            <h3>Hello ${fullName},</h3>
            <p>We have received your inquiry regarding admission for <strong>${schoolingType}</strong>. Our counselors will call you soon to discuss the best options for education.</p>
            ${credentialsBlock}
            <br/>
            <p>Best Regards,</p>
            <p>The Spot Admission Team</p>
          `
        });
      }
    } catch (emailError) {
      console.error("Pre-Primary Form Email Error:", emailError.message);
    }

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
