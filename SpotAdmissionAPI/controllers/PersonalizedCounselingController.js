const CounselingForm = require("../models/PersonalizedCounselingForm");
const sendEmail = require("../utils/emailService");

// ✅ Create Personalized Guidance Form (POST)
exports.createForm = async (req, res) => {
  try {
    const { fullName, email, contact, address, expectations } = req.body;

    // 1. Check for duplicate submission
    const existing = await CounselingForm.findOne({ email });
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        message: "Your Personalized counseling request has already been submitted." 
      });
    }

    // 2. Save to Database
    const form = new CounselingForm(req.body);
    await form.save();

    // 3. Send Email Notifications
    try {
      const brandColor = "#5D5FEF"; // Signature Purple Header
      const referenceId = form._id.toString().slice(-6).toUpperCase();

      // --- Admin Notification ---
      await sendEmail({
        email: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `New Personalized Guidance Inquiry: ${fullName}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
            <h2 style="color: ${brandColor};">New Personalized Counseling Request</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${contact}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Expectations:</strong> ${expectations}</p>
          </div>
        `
      });

      // --- Professional Dark Confirmation to User ---
      if (email) {
        await sendEmail({
          email: email,
          subject: "Personalized Request Received - The Spot Admission",
          html: `
            <div style="background-color: #121212; color: #ffffff; font-family: 'Segoe UI', Tahoma, sans-serif; max-width: 550px; margin: auto; border-radius: 12px; overflow: hidden;">
              
              <div style="background-color: ${brandColor}; padding: 35px 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px; letter-spacing: 1.5px; color: white; font-weight: bold;">THE SPOT ADMISSION</h1>
                <p style="margin: 5px 0 0; font-size: 13px; opacity: 0.9; color: white;">Guidance. Clarity. Confidence.</p>
              </div>
              
              <div style="padding: 30px; background-color: #1A1A1A;">
                <p style="font-size: 16px; margin-top: 0;">Dear <strong>${fullName}</strong>,</p>
                <p style="line-height: 1.6; color: #B0B0B0; font-size: 15px;">We have received your request for **Personalized 1-on-1 Guidance**. Our experts are analyzing your requirements to provide the best roadmap for your future.</p>
                
                <div style="background-color: #252525; border-left: 4px solid ${brandColor}; padding: 20px; margin: 25px 0;">
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #ffffff;"><strong>Request ID:</strong> #${referenceId}</p>
                  <p style="margin: 0; font-size: 14px; color: #ffffff;"><strong>Category:</strong> Personalized Counseling</p>
                </div>
                
                <h3 style="color: #ffffff; font-size: 17px; margin-bottom: 10px;">What's Next?</h3>
                <p style="color: #B0B0B0; line-height: 1.6; font-size: 14px; margin-bottom: 25px;">
                  A senior counselor will analyze your expectations and contact you at <strong>${contact}</strong> within 24-48 hours.
                </p>
                
                <div style="text-align: center; margin-bottom: 10px;">
                  <a href="https://thespotadmission.co.in/dashboard" 
                     style="background-color: ${brandColor}; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block;">
                    Check Application Status
                  </a>
                </div>
              </div>

              <div style="background-color: #121212; padding: 25px; text-align: center; font-size: 12px; color: #666666; border-top: 1px solid #252525;">
                <p style="margin: 0 0 5px 0;">Shalin Complex, 905, Sector 11, Gandhinagar, Gujarat 382011</p>
                <p style="margin: 0;">Contact: +91 87805 96840 | info@thespotadmission.co.in</p>
                <p style="margin-top: 15px; opacity: 0.8;">&copy; 2026 The Spot Admission. All rights reserved.</p>
              </div>
            </div>
          `
        });
      }
    } catch (emailError) {
      console.error("Personalized Email Error:", emailError.message);
    }

    return res.status(201).json({ success: true, message: "Form submitted successfully", form });

  } catch (error) {
    console.error("Submission Error:", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Get All Forms (GET)
exports.getForms = async (req, res) => {
  try {
    const forms = await CounselingForm.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: forms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Get Single Form (GET)
exports.getFormById = async (req, res) => {
  try {
    const form = await CounselingForm.findById(req.params.id);
    if (!form) return res.status(404).json({ success: false, message: "Form not found" });
    res.status(200).json({ success: true, data: form });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Update Form (PUT)
exports.updateForm = async (req, res) => {
  try {
    const updated = await CounselingForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ success: true, message: "Updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// ✅ Delete Form (DELETE)
exports.deleteForm = async (req, res) => {
  try {
    await CounselingForm.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};