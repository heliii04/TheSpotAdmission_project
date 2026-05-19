const AdmissionForm = require("../models/AdmissionForm");
const User = require("../models/User");
const sendEmail = require("../utils/emailService");

// Get My Admission Status (GET)
exports.getMyAdmissionStatus = async (req, res) => {
  try {
    const { email } = req.params;
    const form = await AdmissionForm.findOne({ email });
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User record not found." });
    }

    // Creating a structured progress response
    const progress = [
      {
        label: "Profile Setup",
        status: "Completed",
        date: user.createdAt,
        done: true
      },
      {
        label: "Document Verification",
        status: form ? form.verificationStatus : "Pending",
        date: form ? (form.verificationStatus === "Completed" ? "Verified" : "Waiting") : "Waiting",
        done: form ? (form.verificationStatus === "Completed") : false
      },
      {
        label: "Final Admission",
        status: form ? form.admissionStatus : "Locked",
        date: form ? (form.admissionStatus === "Admitted" ? "Admitted" : "--") : "--",
        done: form ? (form.admissionStatus === "Admitted") : false
      }
    ];

    res.json({ progress, hasForm: !!form });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create Form (POST)
exports.createForm = async (req, res) => {
  try {
    const { email } = req.body;
    if (email) {
      const existing = await AdmissionForm.findOne({ email });
      if (existing) return res.status(400).json({ message: "Admission form already submitted for this email." });
    }

    const form = await AdmissionForm.create(req.body);

    // Auto-Register User if account doesn't exist
    let credentialsBlock = "";
    try {
      const { autoRegisterUser, getCredentialsBlock } = require("../utils/authHelpers");
      const { fullName, contact } = req.body;
      const { password, isNew } = await autoRegisterUser(fullName, email, contact);
      if (isNew) {
        credentialsBlock = getCredentialsBlock(email.toLowerCase(), password);
      }
    } catch (e) { console.error("Auto-registration failed:", e.message); }

    // Send Emails
    try {
      const { fullName, email, contact, address, city, degree } = req.body;
      
      await sendEmail({
        email: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: "New Admission Form Submitted",
        html: `
          <h3>New Online Admission Submission</h3>
          <p><strong>Student Name:</strong> ${fullName || 'unnamed'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${contact}</p>
          <p><strong>Location:</strong> ${city || address}</p>
          <p><strong>Degree:</strong> ${degree}</p>
        `
      });

      if (email) {
        await sendEmail({
          email: email,
          subject: "Admission Application Received",
          html: `
            <p>Dear Parent/Student,</p>
            <p>We have received the admission application for <b>${fullName}</b>. Our team will review it and get back to you soon.</p>
            ${credentialsBlock}
            <br/>
            <p>Best Regards,</p>
            <p>The Spot Admission Team</p>
          `
        });
      }
    } catch (e) { console.error("Email failed:", e.message); }

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
