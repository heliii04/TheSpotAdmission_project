import React, { useState, useEffect } from "react";
 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/Api";

interface FormData {
  _id?: string;
  fullName: string;
  classGrade: string;
  section: string;
  dob: string;
  gender: string;
  contactNumber: string;
  email: string;
  schoolName: string;
  address: string;
  performance: string;
  favoriteSubjects: string;
  difficultSubjects: string;
  examScores: string;
  coCurricular: string;
  activities: string;
  interests: string[];
  hobbies: string;
  skills: string;
  hasCareerInMind: string;
  preferredCareer: string;
  streamOptions: string;
  reasons: string;
  guidanceReceived: string;
  preferredColleges: string;
  counselingType: string;
  counselingMode: string;
  counselingDate: string;
  counselorName: string;
  remarks: string;
  counselorFindings: string;
  recommendedPath: string;
  interventions: string[];
  followUpDate: string;
  counselorSignature: string;
  counselorDate: string;
  declarationStudentSign: string;
  declarationParentSign: string;
}

const CareerGuidanceForm: React.FC = () => {
  const navigate = useNavigate();
  const emptyForm: FormData = {
    fullName: "",
    classGrade: "",
    section: "",
    dob: "",
    gender: "",
    contactNumber: "",
    email: "",
    schoolName: "",
    address: "",
    performance: "",
    favoriteSubjects: "",
    difficultSubjects: "",
    examScores: "",
    coCurricular: "",
    activities: "",
    interests: [],
    hobbies: "",
    skills: "",
    hasCareerInMind: "",
    preferredCareer: "",
    streamOptions: "",
    reasons: "",
    guidanceReceived: "",
    preferredColleges: "",
    counselingType: "",
    counselingMode: "",
    counselingDate: "",
    counselorName: "",
    remarks: "",
    counselorFindings: "",
    recommendedPath: "",
    interventions: [],
    followUpDate: "",
    counselorSignature: "",
    counselorDate: "",
    declarationStudentSign: "",
    declarationParentSign: "",
  };

  const [formData, setFormData] = useState<FormData>(emptyForm);
  const [forms, setForms] = useState<FormData[]>([]);
  const [editId, setEditId] = useState<string | null>(null);

  // ✅ Fetch all forms
  const fetchForms = async () => {
    try {
      const res = await axiosInstance.get("/careerform");
      setForms(res.data);
    } catch (err) {
      
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  // ✅ Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;

    if (type === "checkbox") {
      const checked = target.checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name as keyof FormData] as string[]), value]
          : (prev[name as keyof FormData] as string[]).filter(
            (v) => v !== value
          ),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Submit (POST) or Update (PUT)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axiosInstance.put(`/careerform/${editId}`, formData);
        toast("Form updated successfully!");
      } else {
        await axiosInstance.post("/careerform", formData);
        toast.success("Form submitted successfully!");
        navigate("/careertable")
      }
      setFormData(emptyForm);
      setEditId(null);
      fetchForms();
    } catch (err) {
      console.error("Error submitting form", err);
      toast.error("Something went wrong!");
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center py-10">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 w-full max-w-5xl mb-10"
      >
        

        {/* 🧩 Student Info */}
        <h2 className="text-lg font-semibold mb-2 text-primary-500">
          Student Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="classGrade" placeholder="Class / Grade" value={formData.classGrade} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="section" placeholder="Section" value={formData.section} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="dob" type="date" value={formData.dob} onChange={handleChange} />
          <select className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="schoolName" placeholder="School / College Name" value={formData.schoolName} onChange={handleChange} />
          <textarea className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
        </div>

        {/* 🧩 Academic Details */}
        <h2 className="text-lg font-semibold mt-6 mb-2 text-primary-500">
          Academic & Performance Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="performance" placeholder="Overall Performance" value={formData.performance} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="examScores" placeholder="Exam Scores / GPA" value={formData.examScores} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="favoriteSubjects" placeholder="Favorite Subjects" value={formData.favoriteSubjects} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="difficultSubjects" placeholder="Difficult Subjects" value={formData.difficultSubjects} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600" name="coCurricular" placeholder="Co-curricular Achievements" value={formData.coCurricular} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600" name="activities" placeholder="Other Activities" value={formData.activities} onChange={handleChange} />
        </div>

        {/* 🧩 Interests */}
        <h2 className="text-lg font-semibold mt-6 mb-2 text-primary-500">Interests</h2>
        <div className="flex flex-wrap gap-3">
          {["Science", "Commerce", "Arts", "Technology", "Sports", "Creative Arts", "Business"].map((i) => (
            <label key={i} className="flex items-center gap-2 text-primary-500">
              <input
                type="checkbox"
                name="interests"
                value={i}
                checked={formData.interests.includes(i)}
                onChange={handleChange}
              />
              {i}
            </label>
          ))}
        </div>

        {/* 🧩 Career Preference */}
        <h2 className="text-lg font-semibold mt-6 mb-2 text-primary-500">
          Career Preferences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="hasCareerInMind" placeholder="Do you have a career in mind?" value={formData.hasCareerInMind} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="preferredCareer" placeholder="Preferred Career" value={formData.preferredCareer} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="streamOptions" placeholder="Preferred Stream Options" value={formData.streamOptions} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="preferredColleges" placeholder="Preferred Colleges" value={formData.preferredColleges} onChange={handleChange} />
          <textarea className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600" name="reasons" placeholder="Reasons for choosing this career/stream" value={formData.reasons} onChange={handleChange} />
          <textarea className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600" name="guidanceReceived" placeholder="Any guidance received so far?" value={formData.guidanceReceived} onChange={handleChange} />
        </div>

        {/* 🧩 Counselor Details */}
        <h2 className="text-lg font-semibold mt-6 mb-2 text-primary-500">
          Counselor Section
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="counselorName" placeholder="Counselor Name" value={formData.counselorName} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="counselingDate" type="date" value={formData.counselingDate} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="counselingMode" placeholder="Counseling Mode" value={formData.counselingMode} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="counselingType" placeholder="Counseling Type" value={formData.counselingType} onChange={handleChange} />
          <textarea className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600" name="remarks" placeholder="Remarks" value={formData.remarks} onChange={handleChange} />
          <textarea className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600" name="counselorFindings" placeholder="Counselor Findings" value={formData.counselorFindings} onChange={handleChange} />
          <textarea className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600" name="recommendedPath" placeholder="Recommended Career Path" value={formData.recommendedPath} onChange={handleChange} />
        </div>

        {/* 🧩 Interventions */}
        <h2 className="text-lg font-semibold mt-6 mb-2 text-primary-500">Interventions</h2>
        <div className="flex flex-wrap gap-3">
          {["Career Test", "Counseling", "Workshops", "Mentorship", "Skill Training"].map((i) => (
            <label key={i} className="flex items-center gap-2 text-primary-500">
              <input
                type="checkbox"
                name="interventions"
                value={i}
                checked={formData.interventions.includes(i)}
                onChange={handleChange}
              />
              {i}
            </label>
          ))}
        </div>

        {/* 🧩 Follow-Up */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="followUpDate" type="date" value={formData.followUpDate} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="counselorSignature" placeholder="Counselor Signature" value={formData.counselorSignature} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="counselorDate" type="date" value={formData.counselorDate} onChange={handleChange} />
        </div>

        {/* 🧩 Declaration */}
        <h2 className="text-lg font-semibold mt-6 mb-2 text-primary-500">
          Declaration
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="declarationStudentSign" placeholder="Student Signature" value={formData.declarationStudentSign} onChange={handleChange} />
          <input className="mt-1 p-2 border border-primary-500 rounded-md w-full 
                   focus:ring-primary-500 focus:border-primary-600"
            name="declarationParentSign" placeholder="Parent Signature" value={formData.declarationParentSign} onChange={handleChange} />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition"
        >
          {editId ? "Update Form" : "Submit Form"}
        </button>
      </form>


    </div>
  );
};

export default CareerGuidanceForm;
