const mongoose = require("mongoose");

const PrePrimarytoHigherFormSchema = new mongoose.Schema(
  {
    fullName: String,
    grade: String,
    section: String,
    rollNo: String,
    dob: String,
    gender: String,
    contact: String,
    email: String,
    address: String,

    fatherName: String,
    fatherOcc: String,
    fatherContact: String,
    motherName: String,
    motherOcc: String,
    motherContact: String,
    parentEmail: String,

    academicPerformance: String,
    favoriteSubjects: String,
    difficultSubjects: String,
    attendance: String,

    behavior: String,
    social: String,
    emotional: String,
    incidents: String,

    counselingTypes: [String],
    reason: String,
    expectations: String,

    counselorName: String,
    counselingDate: String,
    observations: String,
    recommendations: [String],
    nextSession: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PrePrimarytoHigherForm", PrePrimarytoHigherFormSchema);
