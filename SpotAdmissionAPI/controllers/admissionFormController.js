const AdmissionForm = require("../models/AdmissionForm");
const sendEmail = require("../utils/emailService");

// Create Form (POST)
exports.createForm = async (req, res) => {
  try {
    const { email, fullName, contact, address, city, degree } = req.body;

    // 1. Check for duplicate submission by email
    if (email) {
      const existing = await AdmissionForm.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: "Admission form already submitted for this email." });
      }
    }

    // 2. Save to Database
    // const form = await AdmissionForm.create(req.body);  
    const form= new AdmissionForm(req.body);
    await form.save();

    // 3. Send Emails notifications
    try { 
      const brandColor = "#4f46e5";
      const schoolName = "The Spot Admission";
      const schoolEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
      const schoolPhone = "+91 87805 96840";
      const submissionDate = new Date().toLocaleDateString("en-US", { day: 'numeric', month: 'long', year: 'numeric' });

      // email to admin
      await sendEmail({
        email: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: "New Admission Form Submitted",
        html: `
        <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
          <h3 style="color: ${brandColor}">New Online Admission Submission</h3>
          <p><strong>Student Name:</strong> ${fullName || 'unnamed'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${contact}</p>
          <p><strong>Location:</strong> ${city || address}</p>
          <p><strong>Degree/Class:</strong> ${degree}</p>
           <p><strong>Location:</strong> ${address}</p>
            <p><strong>Career Option:</strong> ${CareerOption}</p>
        </div>
        `
      });

      // professional confirmation email to user
      if (email) {
        await sendEmail({
          email: email,
          subject: `Admission Application Received - ${schoolName}`,
          html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
            <div style="background-color: ${brandColor}; padding: 25px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 20px; letter-spacing: 1px;">THE SPOT ADMISSION</h1>
                <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Guidance. Clarity. Confidence.</p>
              </div>

              <div style="background-color: ${brandColor}; padding: 25px; text-align: center; color: white;">
                <h1 style="margin: 0; font-size: 20px; letter-spacing: 1px;">THE SPOT ADMISSION</h1>
                <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Guidance. Clarity. Confidence.</p>
              </div>

              <div style="background-color: ${brandColor}; padding: 25px; text-align: center; color: white;">

              <h1 style="margin: 0; font-size: 20px; letter-spacing: 1px;">THE SPOT ADMISSION</h1>
                <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Guidance. Clarity. Confidence.</p>
              </div>

              <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid ${brandColor};">

                  <p style="margin: 0; font-size: 14px;"><strong>Reference ID:</strong> #${form._id.toString().slice(-6).toUpperCase()}</p>
                  <p style="margin: 5px 0 0; font-size: 14px;"><strong>Chosen Field:</strong> ${degree || "General Admission"}
                  </p>
                </div>

                <p style="margin: 0; font-size: 14px;">Dear <strong>${fullName || "Student/Parent"}</strong>,</p>

                <p style="margin: 10px 0 0; font-size: 14px;">Thank you for reaching out. We have successfully received your admission application for <strong>${degree}</strong> on ${submissionDate}.</p>

                <p><strong>What's Next?</strong><br/>
                Our senior counsellor will review your profile and contact you at <strong>${contact}</strong> within 24-48 hours to schedule your session.</p> 

                <div style="text-align: center; margin-top: 30px;">
                  <a href="http://localhost:5173/student-dashboard" style="background-color: ${brandColor}; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">View Application Status</a>
                </div>
              </div>

              <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
                <p>Shalin Complex, 905, Sector 11, Gandhinagar, Gujarat 382011</p>
                <p>Contact: +91 87805 96840 | info@thespotadmission.co.in</p>
                <p style="margin-top: 10px;">&copy; 2026 The Spot Admission. All rights reserved.</p>
              </div>
            </div>
              
          `
        });
      }
    } catch (emailErr) {
      console.error("Email processing error:", emailErr.message);
      // We don't return an error to the user here because the data WAS saved to the DB
    }

    // 4. Success Response
    return res.status(201).json({
      success: true, 
      message: "Form submitted successfully", 
      form: newForm 
    });

  } catch (err) {
    console.error("Form Submission Error:", err.message);
    return res.status(500).json({ success: false, 
      message: "Error submitting form", 
      error: error.message 
    });
  }
};

// Get All Forms (GET)
exports.getForms = async (req, res) => {
  try {
    const forms = await AdmissionForm.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms", error: err.message });
  }
};

// Get a single form by ID (GET)

exports.getFormById = async (req, res) => {
  try {
    const form = await AdmissionForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error fetching form", error: error.message });
  }
};

// Update (PUT)
exports.updateForm = async (req, res) => {
  try {
    const updated = await AdmissionForm.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Form not found" });
    res.status(200).json({message: "Form updated successfully",updated});
  } catch (error) {
    res.status(500).json({ message: "Error updating form",error: err.message });
  }
};

// Delete (DELETE)
exports.deleteForm = async (req, res) => {
  try {
    const deleted = await AdmissionForm.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Form not found" });
    // await AdmissionForm.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting form",error: err.message });
  }
};

// Updated Create Form with better structure and error handling


// ✅ Create new form entry (POST)
// exports.createCareerForm = async (req, res) => {
//   try {
//     const { fullName, email, contact, address, currentclass, CareerOption } = req.body;
    
//     // 1. Check if duplicate submission
//     const existingForm = await CareerForm.findOne({ email });
//     if (existingForm) {
//       return res.status(400).json({ message: "You have already submitted this form." });
//     }

//     // 2. Save to Database
//     const newForm = new CareerForm(req.body);
//     await newForm.save();

//     // 3. Send Email Notifications
//     try {
//       const brandColor = "#4f46e5";

//       // --- Email to Admin ---
//       await sendEmail({
//         email: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
//         subject: `New Career Guidance Inquiry: ${fullName}`,
//         html: `
//           <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
//             <h2 style="color: ${brandColor};">New Career Guidance Submission</h2>
//             <p><strong>Name:</strong> ${fullName}</p>
//             <p><strong>Email:</strong> ${email}</p>
//             <p><strong>Phone:</strong> ${contact}</p>
//             <p><strong>Class:</strong> ${currentclass}</p>
//             <p><strong>Location:</strong> ${address}</p>
//             <p><strong>Career Option:</strong> ${CareerOption}</p>
//           </div>
//         `
//       });

//       // --- Professional Confirmation to User ---
//       if (email) {
//         await sendEmail({
//           email: email,
//           subject: "Application Received - The Spot Admission",
//           html: `
//             <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
//               <div style="background-color: ${brandColor}; padding: 25px; text-align: center; color: white;">
//                 <h1 style="margin: 0; font-size: 20px; letter-spacing: 1px;">THE SPOT ADMISSION</h1>
//                 <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Guidance. Clarity. Confidence.</p>
//               </div>
              
//               <div style="padding: 30px; color: #374151; line-height: 1.6;">
//                 <p>Dear <strong>${fullName || "Student/Parent"}</strong>,</p>
//                 <p>Thank you for reaching out. We have successfully received your request for academic and career counselling form <strong>${currentclass}</strong>.</p>
                
//                 <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid ${brandColor};">
//                   <p style="margin: 0; font-size: 14px;"><strong>Reference ID:</strong> #${newForm._id.toString().slice(-6).toUpperCase()}</p>
//                   <p style="margin: 5px 0 0; font-size: 14px;"><strong>Chosen Field:</strong> ${CareerOption || "General Career Guidance"}</p>
//                 </div>

//                 <p><strong>What's Next?</strong><br/>
//                 Our senior counsellor will review your profile and contact you at <strong>${contact}</strong> within 24-48 hours to schedule your session.</p>
                
//                 <div style="text-align: center; margin-top: 30px;">
//                   <a href="http://localhost:5173/student-dashboard" style="background-color: ${brandColor}; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">View Application Status</a>
//                 </div>
//               </div>

//               <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #6b7280;">
//                 <p>Shalin Complex, 905, Sector 11, Gandhinagar, Gujarat 382011</p>
//                 <p>Contact: +91 87805 96840 | info@thespotadmission.co.in</p>
//                 <p style="margin-top: 10px;">&copy; 2026 The Spot Admission. All rights reserved.</p>
//               </div>
//             </div>
//           `
//         });
//       }
//     } catch (emailError) {
//       // We log email errors but don't fail the whole request since the data is saved
//       console.error("Career Form Email Error:", emailError.message);
//     }

//     // 4. Success Response
//     return res.status(201).json({ 
//       success: true, 
//       message: "Form submitted successfully", 
//       form: newForm 
//     });

//   } catch (error) {
//     console.error("Controller Error:", error.message);
//     return res.status(500).json({ 
//       success: false, 
//       message: "Error submitting form", 
//       error: error.message 
//     });
//   }
// };

// // ✅ Get all forms (GET)
// exports.getAllCareerForms = async (req, res) => {
//   try {
//     const forms = await CareerForm.find().sort({ createdAt: -1 });
//     res.status(200).json(forms);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching forms", error: error.message });
//   }
// };

// // ✅ Get a single form by ID (GET)
// exports.getCareerFormById = async (req, res) => {
//   try {
//     const form = await CareerForm.findById(req.params.id);
//     if (!form) return res.status(404).json({ message: "Form not found" });
//     res.status(200).json(form);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching form", error: error.message });
//   }
// };

// // ✅ Update a form by ID (PUT)
// exports.updateCareerForm = async (req, res) => {
//   try {
//     const updatedForm = await CareerForm.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (!updatedForm) return res.status(404).json({ message: "Form not found" });
//     res.status(200).json({ message: "Form updated successfully", form: updatedForm });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating form", error: error.message });
//   }
// };

// // ✅ Delete a form by ID (DELETE)
// exports.deleteCareerForm = async (req, res) => {
//   try {
//     const deletedForm = await CareerForm.findByIdAndDelete(req.params.id);
//     if (!deletedForm) return res.status(404).json({ message: "Form not found" });
//     res.status(200).json({ message: "Form deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting form", error: error.message });
//   }
// };



// thsi is old code

// const AdmissionForm = require("../models/AdmissionForm");
// const sendEmail = require("../utils/emailService");

// // Create Form (POST)
// exports.createForm = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (email) {
//       const existing = await AdmissionForm.findOne({ email });
//       if (existing) return res.status(400).json({ message: "Admission form already submitted for this email." });
//     }

//     const form = await AdmissionForm.create(req.body);

//     // Send Emails
//     try {
//       const { fullName, email, contact, address, city, degree } = req.body;
//       
//       await sendEmail({
//         email: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
//         subject: "New Admission Form Submitted",
//         html: `
//           <h3>New Online Admission Submission</h3>
//           <p><strong>Student Name:</strong> ${fullName || 'unnamed'}</p>
//           <p><strong>Email:</strong> ${email}</p>
//           <p><strong>Phone:</strong> ${contact}</p>
//           <p><strong>Location:</strong> ${city || address}</p>
//           <p><strong>Degree:</strong> ${degree}</p>
//         `
//       });

//       if (email) {
//         await sendEmail({
//           email: email,
//           subject: "Admission Application Received",
//           html: `<p>Dear Parent/Student,</p><p>We have received the admission application for <b>${fullName}</b>. Our team will review it and get back to you soon.</p>`
//         });
//       }
//     } catch (e) { console.error("Email failed:", e.message); }

//     res.status(201).json(form);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get All Forms (GET)
// exports.getForms = async (req, res) => {
//   try {
//     const forms = await AdmissionForm.find().sort({ createdAt: -1 });
//     res.json(forms);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Update (PUT)
// exports.updateForm = async (req, res) => {
//   try {
//     const updated = await AdmissionForm.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );

//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete (DELETE)
// exports.deleteForm = async (req, res) => {
//   try {
//     await AdmissionForm.findByIdAndDelete(req.params.id);
//     res.json({ message: "Form deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
