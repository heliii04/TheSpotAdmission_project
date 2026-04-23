const CareerForm = require("../models/careerFormModel");
const sendEmail = require("../utils/emailService");

// ✅ Create new form entry (POST)
exports.createCareerForm = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if duplicate submission
    const existingForm = await CareerForm.findOne({ email });
    if (existingForm) {
      return res.status(400).json({ message: "You have already submitted this form." });
    }

    const newForm = new CareerForm(req.body);
    await newForm.save();

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
      const { fullName, email, contact, address, currentclass, CareerOption } = req.body;
      
      // Email to Admin
      await sendEmail({
        email: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `New Career Guidance Inquiry: ${fullName}`,
        html: `
          <h3>New Career Guidance Form Submission</h3>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${contact}</p>
          <p><strong>Location:</strong> ${address}</p>
          <p><strong>Class:</strong> ${currentclass}</p>
          <p><strong>Preferred Career:</strong> ${CareerOption}</p>
        `
      });

      // Confirmation to User
      if (email) {
        await sendEmail({
          email: email,
          subject: "Career Guidance Application Received - The Spot Admission",
          html: `
            <h3>Hello ${fullName},</h3>
            <p>Thank you for choosing "The Spot Admission" for your career guidance. We have received your application and our expert counselors will contact you shortly.</p>
            ${credentialsBlock}
            <br/>
            <p>Best Regards,</p>
            <p>The Spot Admission Team</p>
          `
        });
      }
    } catch (emailError) {
      console.error("Career Form Email Error:", emailError.message);
    }

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
