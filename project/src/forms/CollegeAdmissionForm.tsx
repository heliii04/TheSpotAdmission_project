import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { GraduationCap, CheckCircle, Home, PlusCircle, User, MapPin, Calendar, BookOpen, Hash, Phone, Mail, Award } from "lucide-react";
import axiosInstance from "../api/Api";
import "react-toastify/dist/ReactToastify.css";

// --- Location Data ---
const locationData: Record<string, string[]> = {
  Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar"],
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad"],
  Delhi: ["New Delhi", "North Delhi", "South Delhi", "West Delhi", "East Delhi"],
  Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner"],
  Karnataka: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru", "Belagavi"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Noida", "Ghaziabad"],
};
 
const CollegeAdmissionForm = () => {
  const navigate = useNavigate();

  const initialData = {
  sname: "", dob: "", gender: "", scontact: "", semail: "",fatherName:"", fatherContact:"", fatherOcc:"", motherName:"", motherContact:"", motherOcc:"", parentEmail:"",
  address: "", country: "India", city: "", state: "", pincode: "",
  admissionLevel: "", boardSeatNo: "", boardName: "", yearOfPassing: "",
  tenthPercent: "", twelfthPercent: "", degree: "", 
  entranceExam: "", scoreRank: "", declare: false // 'declare' yahan add kiya
};

const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Required fields list
  const requiredFields = [
    "sname", "scontact", "semail", 
    "address", "pincode", 
    "admissionLevel", "boardSeatNo", "boardName", "yearOfPassing", "degree"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target;

  // Checkbox ke liye alag logic
  const finalValue = type === "checkbox" 
    ? (e.target as HTMLInputElement).checked 
    : value;

  setFormData((prev) => ({
    ...prev,
    [name]: finalValue,
  }));

  // Agar error state bani hui hai toh use hatayein
  if (errors[name]) {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, boolean> = {};

    requiredFields.forEach((field) => {
  if (!formData[field as keyof typeof initialData]) { // initialData ke key se map kiya
    newErrors[field] = true;
  }});

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix errors highlighted in blue!");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post("/admissionform", formData);
      if (response.status === 200 || response.status === 201){
      toast.success("🎉 Admission Form Submitted Successfully!");
      setIsSubmitted(true); 
    }
    } catch (error) {
      toast.error("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Utility for Error Styling
  const getFieldStyle = (name: string) => {
    const base = "mt-1 p-3 border rounded-xl w-full outline-none transition-all font-medium";
    const normal = "border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 bg-white";
    const error = "border-blue-500 bg-blue-50 animate-pulse focus:ring-blue-200";
    return `${base} ${errors[name] ? error : normal}`;
  };

  const labelStyle = "text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block ml-1";

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 font-sans">
      <ToastContainer position="top-center" />

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-white overflow-hidden">
        {!isSubmitted ? (
          <>
        {/* Header */}
        <div className="bg-indigo-600 p-12 text-center text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[5rem]"></div>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-3xl mb-4 backdrop-blur-md">
            <GraduationCap size={40} />
          </div>
          <h1 className="text-4xl font-black tracking-tight">College Student Admission Form</h1>
          <p className="text-indigo-100 mt-2 font-medium">Academic Year 2026-27</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-12">
          
          {/* SECTION 1: Personal Information */}
          <section>
            <h2 className="text-xl font-black text-indigo-800 mb-6 flex items-center gap-2">
              <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600 text-sm">01</span>
              Personal & Family Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className={labelStyle}>Student Name</label>
                <input name="sname" value={formData.sname} onChange={handleChange} className={getFieldStyle("sname")} placeholder="e.g. Rahul Sharma" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Student Contact</label>
                <input name="scontact" maxLength={10} value={formData.scontact} onChange={handleChange} className={getFieldStyle("scontact")} placeholder="10 Digit Number" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Student Email</label>
                <input name="semail" type="email" value={formData.semail} onChange={handleChange} className={getFieldStyle("semail")} placeholder="rahul@example.com" />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Date of Birth</label>
                <input name="dob" type="date" value={formData.dob} onChange={handleChange} className={getFieldStyle("dob")} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} className={getFieldStyle("gender")}>
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Parents Details */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-gray-200">
                <label className="text-xm font-bold text-indigo-600">Father's Info</label>
                <input placeholder="Name" value={formData.fatherName} onChange={handleChange} className={`${getFieldStyle("fatherName")} mb-2`} />
                <input placeholder="Occupation" value={formData.fatherOcc} onChange={handleChange} className={getFieldStyle("fatherOcc")} />
                <input placeholder="Contact" maxLength={10} value={formData.fatherContact} onChange={handleChange} className={`${getFieldStyle("fatherContact")} mt-2`} />
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-gray-200">
                <label className="text-xm font-bold text-indigo-600">Mother's Info</label>
                <input placeholder="Name" value={formData.motherName} onChange={handleChange} className={`${getFieldStyle("motherName")} mb-2`} />
                <input placeholder="Occupation" value={formData.motherOcc} onChange={handleChange} className={getFieldStyle("motherOcc")} />
                <input placeholder="Contact" maxLength={10} value={formData.motherContact} onChange={handleChange} className={`${getFieldStyle("motherContact")} mt-2`} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Parent Email</label>
                <input value={formData.parentEmail} onChange={handleChange} placeholder="name@gmail.com" className={getFieldStyle("parentEmail")} />
              </div>
            </div>
          </section>

          {/* SECTION 2: Address */}
          <section className="bg-indigo-50/50 -mx-8 p-8 border-y border-indigo-100">
            <h2 className="text-xl font-black text-indigo-800 mb-6 flex items-center gap-2">
              <span className="bg-white p-2 rounded-lg text-indigo-600 text-sm">02</span>
              Address Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-4">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Address</label>
                <textarea name="address" rows={2} value={formData.address} onChange={handleChange} className={getFieldStyle("address")} placeholder="House No, Street, Area..."></textarea>
              </div>
              <div>
                <label className="text-xs font-bold uppercase">Country</label>
                <select value={formData.country} onChange={handleChange} className={getFieldStyle("country")}>
                  <option value="India">India</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase">State</label>
                <select 
                    name="state"
                    value={formData.state} 
                    onChange={handleChange} 
                    className={getFieldStyle("state")}
                >
                  <option value="">Select State</option>
                  {Object.keys(locationData).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase">City</label>
                <select 
                    name="city"
                    value={formData.city} 
                    onChange={handleChange} 
                    className={getFieldStyle("city")}
                    disabled={!formData.state}
                >
                  <option value="">Select City</option>
                  {formData.state && locationData[formData.state].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase">Pincode</label>
                <input name="pincode" maxLength={6} value={formData.pincode} onChange={handleChange} className={getFieldStyle("pincode")} placeholder="380001" />
              </div>
            </div>
          </section>

          {/* SECTION 3: Academic Details */}
          <section >
            <h2 className="text-xl font-black text-indigo-900 mb-6 flex items-center gap-3">
              <span className="bg-white text-indigo-600 w-8 h-8 flex items-center justify-center rounded-lg shadow-sm text-sm">03</span>
              Academic Credentials
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelStyle}>Applying After *</label>
                <select 
                  name="admissionLevel" 
                  value={formData.admissionLevel} 
                  onChange={handleChange} 
                  className={getFieldStyle("admissionLevel")}
                >
                  <option value="">Select Level</option>
                  <option value="10th">After 10th (Diploma)</option>
                  <option value="12th">After 12th (Degree)</option>
                </select>
              </div>
              <div>
                <label className={labelStyle}>Board Name *</label>
                <input name="boardName" value={formData.boardName} onChange={handleChange} className={getFieldStyle("boardName")} placeholder="e.g. GSEB / CBSE" />
              </div>
              <div>
                <label className={labelStyle}>Board Seat Number *</label>
                <input 
                  name="boardSeatNo" 
                  value={formData.boardSeatNo} 
                  onChange={handleChange} 
                  className={getFieldStyle("boardSeatNo")} 
                  placeholder="Seat No (e.g. G12345)" 
                />
              </div>
              <div>
                <label className={labelStyle}>Passing Year *</label>
                <input name="yearOfPassing" type="number" value={formData.yearOfPassing} onChange={handleChange} className={getFieldStyle("yearOfPassing")} placeholder="2025" />
              </div>
              <div>
                <label className={labelStyle}>
                  {formData.admissionLevel === "12th" ? "12th Percentage (%) *" : "10th Percentage (%) *"}
                </label>
                <input 
                  name={formData.admissionLevel === "12th" ? "twelfthPercent" : "tenthPercent"} 
                  value={formData.admissionLevel === "12th" ? formData.twelfthPercent : formData.tenthPercent} 
                  onChange={handleChange} 
                  className={getFieldStyle(formData.admissionLevel === "12th" ? "twelfthPercent" : "tenthPercent")} 
                  placeholder="e.g. 85%" 
                />
              </div>
              <div>
                <label className={labelStyle}>Preferred Degree *</label>
                <select name="degree" value={formData.degree} onChange={handleChange} className={getFieldStyle("degree")}>
                  <option value="">Select Degree</option>
                  <option>B.Tech / B.E</option>
                  <option>Diploma Engg.</option>
                  <option>BCA / B.Sc IT</option>
                  <option>B.Com / BBA</option>
                </select>
              </div>
              <div>
                <label className={labelStyle}>Entrance Exam</label>
                <select name="entranceExam" value={formData.entranceExam} onChange={handleChange} className={getFieldStyle("entranceExam")}>
                  <option value="">Select Exam</option>
                  <option>JEE</option>
                  <option>CUET</option>
                  <option>CET</option>
                  <option>GUJCET</option>
                </select>
              </div>
              <div>
                <label className={labelStyle}>Entrance Exam Rank</label>
                <input name="scoreRank" value={formData.scoreRank} onChange={handleChange} className={getFieldStyle("scoreRank")} placeholder="Score / Rank" />
              </div>
            </div>
          </section>


          {/* Declaration & Action */}
          <div className="space-y-6 pt-6 border-t">
            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <input type="checkbox" id="declare" name="declare" checked={formData.declare} onChange={handleChange} className="h-5 w-5 text-indigo-600 rounded cursor-pointer" required />
              <label htmlFor="declare" className="text-sm font-medium text-indigo-900 cursor-pointer">I declare that all information provided is true and correct.</label>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 text-lg">
                Submit Application
              </button>
              <button 
                type="button" 
                onClick={() => window.confirm("Reset all data?") && setFormData(initialData)} 
                className="px-10 py-4 bg-blue-100 text-blue-500 font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all">
                Reset
              </button>
            </div>
          </div>
        </form>
        </>
        ) : (
          /* --- SUCCESS SCREEN (THANK YOU) --- */
          <div className="p-12 md:p-24 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <CheckCircle size={48} strokeWidth={3} />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
              CONGRATS, <span className="text-indigo-600 uppercase">{formData.sname.split(' ')[0]}!</span>
            </h1>
            
            <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed font-medium mb-12">
              Your application has been successfully registered. Our team will send a 
              <span className="text-indigo-900 font-bold"> confirmation mail </span> 
              to {formData.semail} shortly.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button onClick={() => navigate("/")} className="flex items-center gap-2 px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-2xl hover:-translate-y-1">
                <Home size={20} /> Back to Home
              </button>
              
              <button onClick={() => { setIsSubmitted(false); setFormData(initialData); }} className="flex items-center gap-2 px-10 py-4 bg-indigo-50 text-indigo-600 font-black rounded-2xl hover:bg-indigo-100 border border-indigo-100">
                <PlusCircle size={20} /> New Admission
              </button>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-100 inline-block">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                College Admission ID: #CAD{Math.floor(100000 + Math.random() * 900000)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollegeAdmissionForm;