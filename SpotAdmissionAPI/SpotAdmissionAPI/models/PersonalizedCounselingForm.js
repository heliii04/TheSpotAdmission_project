const mongoose = require("mongoose");

const PersonalizedCounselingFormSchema = new mongoose.Schema(
  {
    fullName: String,
    dob: String,
    gender: String,
    classYearDept: String,
    rollNumber: String,
    schoolName: String,
    contact: String,
    email: String,
    address: String,

    fatherName: String,
    fatherOccupation: String,
    fatherContact: String,
    motherName: String,
    motherOccupation: String,
    motherContact: String,
    income: String,
    siblings: String,

    performance: String,
    favoriteSubjects: String,
    difficultSubjects: String,
    learningStyle: String,
    activities: String,

    behavior: String,
    stressFactors: String,
    coping: String,

    reason: String,
    referral: String,
    previousCounseling: String,

    strengths: String,
    improvements: String,
    expectations: String,
    challenges: String,
    motivation: String,

    sessionDate: String,
    counselorName: String,
    observation: String,

    studentSignature: String,
    parentSignature: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PersonalizedCounselingForm", PersonalizedCounselingFormSchema);
