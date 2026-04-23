const CounselingAppointment = require("../models/CounselingAppointmentForm");
const sendEmail = require("../utils/emailService");

// ✅ Create Appointment (POST)
exports.createAppointment = async (req, res) => {
  try {
    const { fullName, email, contact, city, category, preferredDate } = req.body;

    // 1. Check for duplicate booking
    const existing = await CounselingAppointment.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "You have already booked an appointment." });
    }

    // 2. Save to Database
    const form = await CounselingAppointment.create(req.body);
    await form.save();

    // 3. Send Email Notifications
    try {
      const brandColor = "#4f46e5"; // Signature Purple
      const referenceId = form._id.toString().slice(-6).toUpperCase();

      // --- Admin Email ---
      await sendEmail({
        email: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: `New Counseling Appointment: ${fullName}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd;">
            <h2 style="color: ${brandColor};">New Counseling Request</h2>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Preferred Date:</strong> ${preferredDate}</p>
            <p><strong>Contact:</strong> ${contact}</p>
            <p><strong>City:</strong> ${city}</p>
          </div>
        `
      });

      // --- Professional Dark-Themed Confirmation to User ---
      if (email) {
        await sendEmail({
          email: email,
          subject: "Counseling Appointment Received - The Spot Admission",
          html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; border-radius: 8px; border: 1px solid #e5e7eb; overflow: hidden;">
              
              <div style="background-color: ${brandColor}; padding: 25px; color: white; text-align: center;">
                <h1 style="margin: 0; font-size: 20px; letter-spacing: 1px;">THE SPOT ADMISSION</h1>
                <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Guidance. Clarity. Confidence.</p>
              </div>
              
              <div style="padding: 15px; background-color: #f9fafb; border-radius: 6px; margin: 20px 0; border-left: 4px solid ${brandColor};  ">
                <p style="font-size: 14px; margin: 0;">Dear <strong>${fullName}</strong>,</p>
                <p style="line-height: 1.6; color: #B0B0B0; font-size: 15px;">Your request for a <strong>${category}</strong> counseling session has been received. Our team is excited to help you plan your academic journey.</p>
                
                <div style="background-color: #252525; border-left: 4px solid ${brandColor}; padding: 20px; margin: 25px 0;">
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #ffffff;"><strong>Booking ID:</strong> #${referenceId}</p>
                  <p style="margin: 0 0 10px 0; font-size: 14px; color: #ffffff;"><strong>Session Type:</strong> ${category}</p>
                  <p style="margin: 0; font-size: 14px; color: #ffffff;"><strong>Requested Date:</strong> ${preferredDate}</p>
                </div>
                
                <h3 style="color: #ffffff; font-size: 17px; margin-bottom: 10px;">What's Next?</h3>
                <p style="color: #B0B0B0; line-height: 1.6; font-size: 14px; margin-bottom: 25px;">
                  Our expert counselor will contact you at <strong>${contact}</strong> within 24 hours to confirm your exact time slot and share the meeting link.
                </p>
                
                <div style="text-align: center; margin-bottom: 10px;">
                  <a href="https://thespotadmission.co.in/dashboard" 
                     style="background-color: ${brandColor}; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block;">
                    View Booking Details
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
      console.error("Appointment Email Error:", emailError.message);
    }

    res.status(201).json({ success: true, message: "Appointment booked successfully", data: form });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Get All Appointments (GET)
exports.getAppointments = async (req, res) => {
  try {
    const forms = await CounselingAppointment.find().sort({ createdAt: -1 });
    res.json({ success: true, data: forms });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Update Appointment (PUT)
exports.updateAppointment = async (req, res) => {
  try {
    const updated = await CounselingAppointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ success: true, message: "Appointment updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ✅ Delete Appointment (DELETE)
exports.deleteAppointment = async (req, res) => {
  try {
    await CounselingAppointment.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Appointment deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};