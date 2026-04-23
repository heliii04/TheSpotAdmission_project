const CounselingForm = require("../models/PersonalizedCounselingForm");
const sendEmail = require("../utils/emailService");

// Create Form
exports.createForm = async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await CounselingForm.findOne({ email });
    if (existing) return res.status(400).json({ message: "Your Personalized counseling request has already been submitted." });

    const form = new CounselingForm(req.body);
    await form.save();

    // Send Email Notifications
    try {
      const { fullName, email, contact, address, expectation } = req.body;
      
      // Email to Admin
      await sendEmail({
        email: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `New Personalized Counseling Inquiry: ${fullName}`,
        html: `
          <h3>New Personalized Counseling Inquiry</h3>
          <p><strong>Student Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${contact}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Expectations:</strong> ${expectation}</p>
        `
      });

      // Confirmation to User
      if (email) {
        await sendEmail({
          email: email,
          subject: "Personalized Counseling Request Received - The Spot Admission",
          html: `
            <h3>Hello ${fullName},</h3>
            <p>Thank you for reaching out. We have received your query regarding personalized counseling. Our team will analyze your requirements and get back to you with the best solutions.</p>
            <br/>
            <p>Best Regards,</p>
            <p>The Spot Admission Team</p>
          `
        });
      }
    } catch (emailError) {
      console.error("Personalized Counseling Email Error:", emailError.message);
    }

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
