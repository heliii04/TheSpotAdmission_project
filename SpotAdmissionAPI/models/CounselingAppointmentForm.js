const mongoose = require("mongoose");

const CounselingAppointmentSchema = new mongoose.Schema(
  {
    // Section 1: Student Info
    fullName: String,
    dob: String,
    gender: String,
    classYear: String,
    schoolName: String,
    rollNumber: String,
    email: String,
    contact: String,
    city: String,

    // Section 2: Counseling Details
    category: String,
    concern: String,
    mode: String,
    preferredDate: String,
    alternativeDate: String,
    preferredCounselor: String,

    // Section 3: Background & Emergency
    previousSession: String,
    previousDetails: String,
    specialNeeds: String,
    emergencyContact: String,
    relationship: String,
    emergencyNumber: String,

    // Section 4: Consent
    studentSignature: String,
    submissionDate: String,
    parentApproval: String,

    // Section 5: Office Use
    formReceived: String,
    verifiedBy: String,
    assignedCounselor: String,
    scheduledDate: String,
    officeMode: String,
    remarks: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "CounselingAppointment",
  CounselingAppointmentSchema
);
