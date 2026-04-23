const CounselingAppointment = require("../models/CounselingAppointmentForm");
const sendEmail = require("../utils/emailService");

// Create (POST)
exports.createAppointment = async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await CounselingAppointment.findOne({ email });
    if (existing) return res.status(400).json({ message: "You have already booked an appointment." });

    const form = await CounselingAppointment.create(req.body);

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

    // Send Email Notifications
    try {
      const { fullName, email, contact, city, category, preferredDate } = req.body;
      
      // Email to Admin
      await sendEmail({
        email: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `New Counseling Appointment: ${fullName}`,
        html: `
          <h3>New Counseling Appointment Request</h3>
          <p><strong>Student Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${contact}</p>
          <p><strong>City:</strong> ${city}</p>
          <p><strong>Category:</strong> ${category}</p>
          <p><strong>Preferred Date:</strong> ${preferredDate}</p>
        `
      });

      // Confirmation to User
      if (email) {
        await sendEmail({
          email: email,
          subject: "Counseling Appointment Confirmed - The Spot Admission",
          html: `
            <h3>Hello ${fullName},</h3>
            <p>Your request for a <strong>${category}</strong> counseling session has been received. We will contact you soon to confirm the time for your session on ${preferredDate}.</p>
            ${credentialsBlock}
            <br/>
            <p>Best Regards,</p>
            <p>The Spot Admission Team</p>
          `
        });
      }
    } catch (emailError) {
      console.error("Counseling Appointment Email Error:", emailError.message);
    }

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
