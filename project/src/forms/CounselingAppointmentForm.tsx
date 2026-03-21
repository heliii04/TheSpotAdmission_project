import axiosInstance from "../api/Api";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { User, ClipboardList, ShieldCheck, GraduationCap } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

const CounselingAppointmentForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // 1. Error state add ki
  const [errors, setErrors] = useState<any>({});

  // 2. Required fields define kiye
  const requiredFields = ["fullName", "dob", "gender", "email", "contact", "category", "emergencyContact"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));

    // Agar user ne likhna start kar diya hai toh red border hata do
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 3. Validation Logic
    const newErrors: any = {};
    let firstErrorField = "";

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === "") {
        newErrors[field] = true;
        if (!firstErrorField) firstErrorField = field;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields highlighted in red.");
      return; // Stop submission
    }

    setLoading(true);
    try {
      await axiosInstance.post("/counselingform", formData);
      toast.success("Registration Successful! Our experts will contact you soon.");
      setTimeout(() => navigate("/counselingtable"), 2000);
    } catch (err) {
      console.error(err);
      toast.error("Submission failed. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "mt-1 p-3 bg-slate-50 border border-slate-200 rounded-xl w-full focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700";
  // const sectionHeader = "flex items-center gap-2 font-black text-slate-800 mb-6 border-b pb-3 text-lg tracking-tight uppercase";

  // 4. Dynamic Style Function
  const getFieldStyle = (fieldName: string) => {
    const baseStyle = "mt-1 p-3 bg-slate-50 border rounded-xl w-full focus:ring-4 outline-none transition-all font-medium text-slate-700";
    const normalBorder = "border-slate-200 focus:ring-indigo-500/10 focus:border-indigo-500";
    const errorBorder = "border-red-500 bg-red-50 focus:ring-red-500/10 focus:border-red-500 animate-pulse";
    
    return `${baseStyle} ${errors[fieldName] ? errorBorder : normalBorder}`;
  };

  const sectionHeader = "flex items-center gap-2 font-black text-slate-800 mb-6 border-b pb-3 text-lg tracking-tight uppercase";

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
        
        {/* Background Blobs for Brand Vibe */}
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

        <ToastContainer position="top-right" autoClose={3000} />

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-xl shadow-indigo-200">
            <GraduationCap className="text-white h-8 w-8" />
          </div>
          <h1 className="text-3xl font-black text-slate-900">Career Counseling Form</h1>
          <p className="text-slate-500 mt-2 font-medium">Expert guidance to bridge the gap between students and consultants.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12 relative z-10" noValidate>

          {/* SECTION 1: Personal Details */}
          <section>
            <h2 className={sectionHeader}><User className="h-5 w-5 text-indigo-600" /> Student Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <input name="fullName" placeholder="Full Name *" className={getFieldStyle("fullName")} onChange={handleChange} />
                {errors.fullName && <span className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase">Name is required</span>}
              </div>
              <div className="flex flex-col">
                <input name="dob" type="date" className={getFieldStyle("dob")} onChange={handleChange} />
                {errors.dob && <span className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase">Date of Birth is required</span>}
              </div>
              <div className="flex flex-col">
                <select name="gender" className={getFieldStyle("gender")} onChange={handleChange}>
                  <option value="">Select Gender *</option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
                {errors.gender && <span className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase">Gender is required</span>}
              </div>
              <input name="classYear" placeholder="Current Class/Year" className={inputStyle} onChange={handleChange} />
              <input name="schoolName" placeholder="School/College Name" className={inputStyle} onChange={handleChange} />
              <input name="rollNumber" placeholder="Roll Number (Optional)" className={inputStyle} onChange={handleChange} />
              <div className="flex flex-col">
                <input name="email" type="email" placeholder="Email Address *" className={getFieldStyle("email")} onChange={handleChange} />
                {errors.email && <span className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase">Valid Email is required</span>}
              </div>
              <div className="flex flex-col">
                <input name="contact" type="tel" placeholder="Mobile Number *" className={getFieldStyle("contact")} onChange={handleChange} />
                {errors.contact && <span className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase">Contact is required</span>}
              </div>
              <div className="md:col-span-2">
                <input name="city" type="text" placeholder="City & State *" className={getFieldStyle("city")} onChange={handleChange} />
              </div>
            </div>
          </section>

          {/* SECTION 2: Counseling Details */}
          <section>
            <h2 className={sectionHeader}><ClipboardList className="h-5 w-5 text-indigo-600" /> Appointment Details</h2>
            <div className="space-y-5">
              <div className="flex flex-col">
                <select name="category" className={getFieldStyle("category")} onChange={handleChange}>
                  <option value="">Select Counseling Category *</option>
                  <option>Pre-School to Higher Secondary</option>
                  <option>College Admission Counseling</option>
                  <option>Career & Skill Guidance</option>
                </select>
                {errors.category && <span className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase">Please select a category</span>}
              </div>
              <textarea name="concern" placeholder="Briefly describe your main concern or goal..." className={`${inputStyle} h-32 resize-none`} onChange={handleChange} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <select name="mode" className={inputStyle} onChange={handleChange}>
                  <option value="">Preferred Mode</option>
                  <option>Online Video Call</option>
                  <option>Voice Call</option>
                  <option>In-Person Meeting</option>
                </select>
                <input name="preferredDate" type="date" title="Preferred Date" className={inputStyle} onChange={handleChange} />
                <input name="preferredCounselor" placeholder="Preferred Counselor (If any)" className={inputStyle} onChange={handleChange} />
                <input name="alternativeDate" type="date" title="Alternative Date" className={inputStyle} onChange={handleChange} />
              </div>
            </div>
          </section>

          {/* SECTION 3: Background */}
          <section>
            <h2 className={sectionHeader}><ShieldCheck className="h-5 w-5 text-indigo-600" /> Safety & Background</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <select name="previousSession" className={inputStyle} onChange={handleChange}>
                <option value="">Previous Counseling?</option>
                <option>Yes</option><option>No</option>
              </select>
              <input name="specialNeeds" placeholder="Any Special Requirements?" className={inputStyle} onChange={handleChange} />
              <input name="emergencyContact" placeholder="Emergency Contact Name" className={inputStyle} onChange={handleChange} />
              <div className="flex flex-col">
                <input name="emergencyContact" type="tel" placeholder="Emergency Contact Name" className={getFieldStyle("emergencyContact")} onChange={handleChange} />
                {errors.emergencyContact && <span className="text-red-500 text-[10px] font-bold mt-1 ml-2 uppercase">emergencyContact is required</span>}
              </div>
            </div>
          </section>

          {/* SUBMIT BUTTON */}
          <div className="pt-8">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 hover:bg-indigo-700 active:scale-95 transition-all disabled:opacity-70"
            >
              {loading ? "Submitting Request..." : "Confirm My Appointment"}
            </button>
            <p className="text-center text-slate-400 text-xs mt-4 font-bold uppercase tracking-widest">
              The Spot Admission — Smart Path to Education
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CounselingAppointmentForm;