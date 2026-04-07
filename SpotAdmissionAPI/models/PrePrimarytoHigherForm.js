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
    country:String,
    city:String,
    state:String,
    pincode:Number,

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
    counselingTypes: [String],

    counselorName: String,
    counselingDate: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PrePrimarytoHigherForm", PrePrimarytoHigherFormSchema);
