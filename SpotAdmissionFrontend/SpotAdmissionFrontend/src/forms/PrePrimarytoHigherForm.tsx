import { useState } from "react";
import axiosInstance from "../api/Api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CheckCircle, ArrowLeft, PlusCircle, Home } from "lucide-react"; // Icons for success screen
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

// --- Types & Interfaces ---
// type AcademicPerf = "Excellent" | "Good" | "Average" | "Needs Improvement";
// type BehaviorOption = "Cooperative" | "Quiet" | "Hyperactive" | "Distracted" | "Aggressive";
// type SocialOption = "Friendly" | "Shy" | "Prefers Isolation" | "Seeks Attention";
// type EmotionalOption = "Happy" | "Anxious" | "Sad" | "Irritable" | "Withdrawn";

// --- Types & Interfaces ---
interface FormState {
  fullName: string; email: string; contact: string; dob: string; gender: string;
  fatherName: string; fatherOcc: string; motherName: string; motherOcc: string;
  parentEmail: string; fatherContact: string; motherContact: string;
  address: string; city: string; state: string; pincode: string; country: string;
  class: string; board: string; ABCId: string; Seatno: string;
  favoriteSubjects: string; difficultSubjects: string;
  // FIX 1: Interface mein sirf simple string type aayega
  attendance: "Regular" | "Occasional" | "Irregular" | ""; 
  counselingTypes: string[]; 
  counselorName: string; counselingDate: string; declare: boolean;
}

const defaultState: FormState = {
  fullName: "", email: "", contact: "", dob: "", gender: "",
  fatherName: "", fatherOcc: "", motherName: "", motherOcc: "",
  parentEmail: "", fatherContact: "", motherContact: "",
  address: "", city: "", state: "", pincode: "", country: "India",
  class: "", board: "", ABCId: "", Seatno: "",
  favoriteSubjects: "", difficultSubjects: "", 
  attendance: "", 
  counselingTypes: [],
  counselorName: "", counselingDate: "", declare: false
};

export default function PrePrimarytoHigherForm() {
  const [form, setForm] = useState<FormState>(defaultState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const update = (key: keyof FormState, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    const nameWords = form.fullName.trim().split(/\s+/);

    if (!form.fullName) e.sname = "Required";
    if (!form.address) e.address = "Required";
    if (!form.class) e.class = "Required";
    if (!form.board) e.board = "Required";
    else if (nameWords.length > 2) e.sname = "Max 2 words only";
    
    if (!form.email.endsWith("@gmail.com")) e.email = "Must be @gmail.com";
    if (form.contact.length !== 10) e.scontact = "Must be 10 digits";
    if (form.pincode.length !== 6) e.pincode = "Must be 6 digits";
    
    if ((form.class.includes("9 to 10") || form.class.includes("11 to 12")) && !form.Seatno) {
      e.Seatno = "Seat number is required for Board classes";
    }
    
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Pehle validation check karein
    if (!validate()) {
      toast.error("Please fix errors highlighted in blue!");
      return;
    }

    try {
      // 2. API Call karein
      const response = await axiosInstance.post("/preprimaryform", form);

      // 3. Agar response success hai (Status 200 ya 201)
      if (response.status === 200 || response.status === 201) {
        toast.success("🎉 Form Submitted Successfully!");
        
        // YAHAN HAI MAIN CHANGE: 
        // Navigate karne ki jagah state change karein taaki Success Screen dikhe
        setIsSubmitted(true); 
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      toast.error(err.response?.data?.message || "Submission failed. Check your connection.");
    }
  };

  const getInputClass = (key: keyof FormState) => `
    mt-1 p-3 border rounded-xl w-full outline-none transition-all text-sm
    ${errors[key] ? "border-blue-500 bg-blue-50 focus:ring-blue-100" : "border-gray-200 bg-gray-50/50 focus:ring-indigo-100 focus:border-indigo-500 focus:ring-2"}
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 p-4 md:p-8 font-sans">
      <ToastContainer position="top-center" autoClose={2000} />
      
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-white overflow-hidden">
        {/* Header */}
        {!isSubmitted ? (
          <>
        <div className="bg-indigo-600 p-12 text-white text-center">
          <h1 className="text-4xl font-black tracking-tight">Student Admission Form</h1>
          <p className="mt-2 text-indigo-100 font-medium">Academic Year 2026-27</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-12">
          
          {/* SECTION 1: Student & Parents */}
          <section>
            <h2 className="text-xl font-black text-indigo-800 mb-6 flex items-center gap-2">
              <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600 text-sm">01</span>
              Personal & Family Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Student Name </label>
                <input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} className={getInputClass("fullName")} placeholder="e.g. Rahul Sharma" />
                {errors.fullName && <p className="text-blue-500 text-[10px] font-bold mt-1 uppercase">{errors.fullName}</p>}
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Student Contact</label>
                <input maxLength={10} value={form.contact} onChange={(e) => update("contact", e.target.value.replace(/\D/g, ""))} placeholder="10 Digit Number" className={getInputClass("contact")} />
                {errors.contact && <p className="text-blue-500 text-[10px] font-bold mt-1 uppercase">{errors.contact}</p>}
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Student Email</label>
                <input value={form.email} onChange={(e) => update("email", e.target.value)} className={getInputClass("email")} placeholder="name@gmail.com" />
                {errors.email && <p className="text-blue-500 text-[10px] font-bold mt-1 uppercase">{errors.email}</p>}
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Date of Birth</label>
                <input type="date" value={form.dob} onChange={(e) => update("dob", e.target.value)} className={getInputClass("dob")} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Gender</label>
                <select value={form.gender} onChange={(e) => update("gender", e.target.value)} className={getInputClass("gender")}>
                  <option value="">Select </option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>

              {/* Parents Details */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-gray-200">
                <label className="text-xm font-bold text-indigo-600">Father's Info</label>
                <input placeholder="Name" value={form.fatherName} onChange={(e) => update("fatherName", e.target.value)} className={`${getInputClass("fatherName")} mb-2`} />
                <input placeholder="Occupation" value={form.fatherOcc} onChange={(e) => update("fatherOcc", e.target.value)} className={getInputClass("fatherOcc")} />
                <input placeholder="Contact" maxLength={10} value={form.fatherContact} onChange={(e) => update("fatherContact", e.target.value.replace(/\D/g, ""))} className={`${getInputClass("fatherContact")} mt-2`} />
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-gray-200">
                <label className="text-xm font-bold text-indigo-600">Mother's Info</label>
                <input placeholder="Name" value={form.motherName} onChange={(e) => update("motherName", e.target.value)} className={`${getInputClass("motherName")} mb-2`} />
                <input placeholder="Occupation" value={form.motherOcc} onChange={(e) => update("motherOcc", e.target.value)} className={getInputClass("motherOcc")} />
                <input placeholder="Contact" maxLength={10} value={form.motherContact} onChange={(e) => update("motherContact", e.target.value.replace(/\D/g, ""))} className={`${getInputClass("motherContact")} mt-2`} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Parent Email</label>
                <input value={form.parentEmail} onChange={(e) => update("parentEmail", e.target.value)} placeholder="name@gmail.com" className={getInputClass("parentEmail")} />
              </div>
            </div>
          </section>

          {/* SECTION 2: Address with Dynamic Dropdowns */}
          <section className="bg-indigo-50/50 -mx-8 p-8 border-y border-indigo-100">
            <h2 className="text-xl font-black text-indigo-800 mb-6 flex items-center gap-2">
              <span className="bg-white p-2 rounded-lg text-indigo-600 text-sm">02</span>
              Address Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-4">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Address</label>
                <textarea value={form.address} onChange={(e) => update("address", e.target.value)} className={getInputClass("address")} rows={2} />
              </div>
              <div>
                <label className="text-xs font-bold uppercase">Country</label>
                <select value={form.country} onChange={(e) => update("country", e.target.value)} className={getInputClass("country")}>
                  <option value="India">India</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase">State</label>
                <select 
                    value={form.state} 
                    onChange={(e) => { update("state", e.target.value); update("city", ""); }} 
                    className={getInputClass("state")}
                >
                  <option value="">Select State</option>
                  {Object.keys(locationData).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase">City</label>
                <select 
                    value={form.city} 
                    onChange={(e) => update("city", e.target.value)} 
                    className={getInputClass("city")}
                    disabled={!form.state}
                >
                  <option value="">Select City</option>
                  {form.state && locationData[form.state].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase">Pincode</label>
                <input maxLength={6} value={form.pincode} onChange={(e) => update("pincode", e.target.value.replace(/\D/g, ""))} placeholder="383001" className={getInputClass("pincode")} />
                {errors.pincode && <p className="text-blue-500 text-[10px] font-bold mt-1 uppercase">{errors.pincode}</p>}
              </div>
            </div>
          </section>

          {/* SECTION 3: Academics */}
          <section>
            <h2 className="text-xl font-black text-indigo-800 mb-6 flex items-center gap-2">
              <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600 text-sm">03</span>
              Academic Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <select value={form.class} onChange={(e) => update("class", e.target.value)} className={getInputClass("class")} >
                <option value="">Select Class</option>
                <option>Nursery</option><option>Primary Education [1 to 5]</option>
                <option>Secondary Education [9 to 10]</option><option>Higher Secondary Education [11 to 12]</option>
              </select>
              <select value={form.board} onChange={(e) => update("board", e.target.value)} className={getInputClass("board")}>
                <option value="">Select Board</option>
                <option>GSEB</option><option>CBSE</option><option>ICSE</option>
              </select>
              <div className="md:col-span-2">
                {/* <input placeholder="Section" value={form.section} onChange={(e) => update("section", e.target.value)} className={getInputClass("section")} /> */}
                <input placeholder="ABC ID" value={form.ABCId} onChange={(e) => update("ABCId", e.target.value)} className={getInputClass("ABCId")} />
                {/* <input placeholder="Roll No" value={form.rollNo} onChange={(e) => update("rollNo", e.target.value)} className={getInputClass("rollNo")} /> */}
              </div>
              <div className="md:col-span-2">
                <input placeholder="Board Seat Number (Required for 10th/12th)" value={form.Seatno} onChange={(e) => update("Seatno", e.target.value)} className={getInputClass("Seatno")} />
                {errors.Seatno && <p className="text-blue-500 text-[10px] font-bold mt-1 uppercase">{errors.Seatno}</p>}
              </div>
              <div className="md:col-span-2">
                <select value={form.attendance} onChange={(e) => update("attendance", e.target.value as any)} className={getInputClass("attendance")}>
                  <option value="">Attendance</option>
                  <option>Regular</option><option>Occasional</option><option>Irregular</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <select value={form.favoriteSubjects} onChange={(e) => update("favoriteSubjects", e.target.value as any)} className={getInputClass("favoriteSubjects")}>
                  <option value="">Favorite Subject</option>
                  <option>Maths</option>
                  <option>Science</option>
                  <option>Social-SCience</option>
                  <option>Gujarati</option>
                  <option>Hindi</option>
                  <option>Sanskrit</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <select value={form.difficultSubjects} onChange={(e) => update("difficultSubjects", e.target.value as any)} className={getInputClass("difficultSubjects")}>
                  <option value="">Difficult Subject</option>
                  <option>Maths</option>
                  <option>Science</option>
                  <option>Social-SCience</option>
                  <option>Gujarati</option>
                  <option>Hindi</option>
                  <option>Sanskrit</option>
                </select>
              </div>
            </div>
          </section>

          {/* Declaration & Action */}
          <div className="space-y-6 pt-6 border-t">
            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <input type="checkbox" id="declare" checked={form.declare} onChange={(e) => update("declare", e.target.checked)} className="h-5 w-5 text-indigo-600 rounded cursor-pointer" required />
              <label htmlFor="declare" className="text-sm font-medium text-indigo-900 cursor-pointer">I declare that all information provided is true and correct.</label>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <button type="submit" className="flex-1 bg-indigo-500 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 text-lg">
                Submit Application
              </button>
              <button type="button" onClick={() => window.confirm("Reset all data?") && setForm(defaultState)} className="px-10 py-4 bg-blue-100 text-blue-500 font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all">
                Reset
              </button>
            </div>
          </div>

        </form>
        </>
        ) : (
          /* --- STEP 2: SHOW THANK YOU SCREEN --- */
          <div className="p-12 md:p-24 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <CheckCircle size={48} strokeWidth={3} />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
              AWESOME, <span className="text-indigo-600 uppercase">{form.fullName.split(' ')[0]}!</span>
            </h1>
            
            <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed font-medium mb-12">
              Your application has been successfully registered. Our team will send a  <span className="text-indigo-900 font-bold">confirmation mail 
                </span> to {form.email} shortly.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-2xl hover:-translate-y-1"
              >
                <Home size={20} /> Back to Home
              </button>
              
              <button 
                onClick={() => { setIsSubmitted(false); setForm(defaultState); }}
                className="flex items-center gap-2 px-10 py-4 bg-indigo-50 text-indigo-600 font-black rounded-2xl hover:bg-indigo-100 transition-all border border-indigo-100"
              >
                <PlusCircle size={20} /> New Application
              </button>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-100 inline-block">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                Reference ID: #TC{Math.floor(100000 + Math.random() * 900000)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
      