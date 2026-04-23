import React, { useState } from "react";
import {CheckCircle, Home, PlusCircle} from "lucide-react";
import axiosInstance from "../api/Api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ======================
// 1️⃣ INTERFACE
// ======================
interface CounselingFormData {
  fullName?: string; dob?: string; gender?: string; classYearDept?: string;
  rollNumber?: string; schoolName?: string; contact?: string; email?: string;
  address?: string; fatherName?: string; fatherOccupation?: string; alternative?:string;
  fatherContact?: string; motherName?: string; motherOccupation?: string; parentsEmail?:string;
  motherContact?: string; parentcontact?: string; parentsemail?: string; expectation?:string;
  performance?: string; favoriteSubjects?: string; difficultSubjects?: string; selection?:string;
  learningStyle?: string; activities?: string; Fields?: string; personality?:string; stream?:string;
  stressFactors?: string; coping?: string; reason?: string; level?:string; support?:string;
  referral?: string; previousCounseling?: string; strengths?: string; stressed?:string;
  improvements?: string; expectations?: string; Challenges?: string; concerns?:string; dream?:string;
  motivation?: string; sessionDate?: string; counselorName?: string; shortgoal?:string; longgoal?:string;
  observation?: string; studentSignature?: string; parentSignature?: string; declare?: boolean;
}

const PersonalizedCounselingForm: React.FC = () => {
  const navigate = useNavigate();

  const initialData = {
  fullName: "", dob: "", gender: "", contact: "", email: "",fatherName:"", fatherContact:"", fatherOcc:"", motherName:"", motherContact:"", motherOcc:"", parentEmail:"",
  address: "", declare: false // 'declare' yahan add kiya
};

  const [formData, setFormData] = useState<CounselingFormData>({ declare: false });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const requiredFields = ["fullName", "email", "contact", "gender", "expectation"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Remove error border when user starts typing
    if (errors.includes(e.target.name)) {
      setErrors(errors.filter((f) => f !== e.target.name));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation Logic
    const newErrors = requiredFields.filter((f) => !formData[f as keyof CounselingFormData]);
    
    if (newErrors.length > 0) {
      setErrors(newErrors);
      toast.error("Please fix errors highlighted in blue!");
      return;
    }

    try {
      await axiosInstance.post("/personalizedcounselingform", formData);
      toast.success("Form successfully submit ho gaya hai!");
      setIsSubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("Server error: Submit nahi ho paya");
    }
  };

  // Helper function for dynamic styling
  const getInputClass = (name: string) => {
    const hasError = errors.includes(name);
    return `w-full p-3 bg-[#F8FAFC] border rounded-xl outline-none transition-all text-slate-600 text-sm focus:ring-2 ${
      hasError ? "border-blue-500 ring-1 ring-blue-100 bg-blue-50" : "border-[#E2E8F0] focus:ring-[#6366F1]"
    }`;
  };

  const labelStyle = "text-[11px] font-bold uppercase tracking-widest text-[#64748B] mb-2 block ml-1";
  const sectionHeader = "text-xl font-black text-[#1E293B] mb-8 flex items-center gap-3 mt-12 border-b pb-4";
  const badge = "w-8 h-8 bg-[#6366F1] text-white flex items-center justify-center rounded-lg text-sm font-black shadow-lg";

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 font-sans">
      <ToastContainer position="top-center" />

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-white overflow-hidden">
        {!isSubmitted ? (
          <>
        {/* HEADER SECTION */}
        <div className="bg-indigo-600 p-12 text-center text-white">
          <h1 className="text-4xl font-black tracking-tight">Personalized Student Counselling</h1>
          <p className="text-indigo-100 mt-2 font-medium">Personalized Career Counselling & Development Form</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-12">

          {/* SECTION 1 */}
          <section>
            <h2 className="text-xl font-black text-indigo-800 mb-6 flex items-center gap-2">
              <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600 text-sm">01</span>
              Personal Information
            </h2>
          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <label className={labelStyle}>Full Name</label>
                <input name="fullName" value={formData.fullName} placeholder="Rahul Patel" className={getInputClass("fullName")} onChange={handleChange} />
              </div>
              <div>
                <label className={labelStyle}>Date of Birth</label>
                <input name="dob" value={formData.dob} type="date" className={getInputClass("dob")} onChange={handleChange} />
              </div>
              <div>
                <label className={labelStyle}>Gender</label>
                <select name="gender" value={formData.gender} className={getInputClass("gender")} onChange={handleChange}>
                  <option value="">Select</option><option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
              <div>
                <label className={labelStyle}>Contact</label>
                <input name="contact" maxLength={10} value={formData.contact} placeholder="98765 43210" className={getInputClass("contact")} onChange={handleChange} />
              </div>
              <div>
                <label className={labelStyle}>Email</label>
                <input name="email" type="email" value={formData.email} placeholder="rahul@example.com" className={getInputClass("email")} onChange={handleChange} />
              </div>
              <div>
                <label className={labelStyle}>Current Class/Grade</label>
                <input name="class/grade" placeholder="" className={getInputClass("class/grade")} onChange={handleChange} />
              </div>
              <div className="md:col-span-2">
                  <label className={labelStyle}>School/College Name</label>
                  <input name="school/college" placeholder="" className={getInputClass("school/college")} onChange={handleChange} />
              </div>
            </div >
          </section>

          {/* SECTION 2 */}
          <section className="bg-indigo-50/50 -mx-8 p-8 border-y border-indigo-100">
            <h2 className="text-xl font-black text-indigo-800 mb-6 flex items-center gap-2">
              <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600 text-sm">02</span>
              Family Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div><label className={labelStyle}>Father's Name</label><input name="fatherName" className={getInputClass("fatherName")} onChange={handleChange} /></div>
              <div><label className={labelStyle}>Mother's Name</label><input name="motherName" className={getInputClass("motherName")} onChange={handleChange} /></div>
              <div><label className={labelStyle}>Parents Contact</label><input name="contact" className={getInputClass("parentcontact")} onChange={handleChange} /></div>
              <div><label className={labelStyle}>Father Occupation</label><input name="fatheroccupation" className={getInputClass("fatherOccupation")} onChange={handleChange} /></div>
              <div><label className={labelStyle}>Mother Occupation</label><input name="motheroccupation" className={getInputClass("motherOccupation")} onChange={handleChange} /></div>
              <div><label className={labelStyle}>Parents Email</label><input name="parentsemail" className={getInputClass("parentsemail")} onChange={handleChange} /></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols- gap-6">
              <label className={labelStyle}>Expectations from Counselling</label><input name="expectation" className={getInputClass("expectation")} onChange={handleChange} />
            </div>
          </section>

          {/* SECTION 3 */}
          <section>
            <h2 className="text-xl font-black text-indigo-900 mb-6 flex items-center gap-3">
              <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600 text-sm">03</span>
              Academic Assessment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className={labelStyle}>Recent Academic Performance</label><select name="performance" className={getInputClass("performance")} onChange={handleChange}><option value="">Select</option><option>Excellent</option><option>Good</option><option>Average</option></select></div>
              <div><label className={labelStyle}>Learning Challenges(if any)</label><input name="Challenges" className={getInputClass("Challenges")} onChange={handleChange} /></div>
              <div>
                <label className={labelStyle}>Favorite Subject</label>
                <select name="favoriteSubjects" value={formData.favoriteSubjects} className={getInputClass("favoriteSubjects")} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Maths</option>
                  <option>Science</option>
                  <option>Social-SCience</option>
                  <option>Gujarati</option>
                  <option>Hindi</option>
                  <option>Sanskrit</option>
                </select>
              </div>
              <div>
                <label className={labelStyle}>Difficult Subject</label>
                <select name="difficultSubjects" value={formData.difficultSubjects} className={getInputClass("difficultSubjects")} onChange={handleChange}>
                  <option value="">Select</option>
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

          {/* SECTION 4*/}
          <section className="bg-indigo-50/50 -mx-8 p-8 border-y border-indigo-100">
            <h2 className="text-xl font-black text-indigo-800 mb-6 flex items-center gap-2">
              <span className="bg-white p-2 rounded-lg text-indigo-600 text-sm">04</span>
              Psychometric & Interest Assessment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelStyle}>Areas of Interest</label>
                <select name="difficultSubjects" value={formData.difficultSubjects} className={getInputClass("difficultSubjects")} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Technical </option>
                  <option>Creative </option>
                  <option>Analytical </option>
                  <option>Business </option>
                  <option>Social</option>
                </select>
              </div>
              <div><label className={labelStyle}>Activities you enjoy</label><input name="activities" className={getInputClass("activities")} onChange={handleChange} /></div>
              <div><label className={labelStyle}>Preferblue Career Fields (if known)</label><input name="Fields" className={getInputClass("Fields")} onChange={handleChange} /></div>
            </div>
          </section>

          {/* SECTION-5 */}
          <section>
            <h2 className="text-xl font-black text-indigo-900 mb-6 flex items-center gap-3">
              <span className="bg-white text-indigo-600 w-8 h-8 flex items-center justify-center rounded-lg shadow-sm text-sm">05</span>
              Skills & Personality Evaluation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className={labelStyle}>Key Strengths</label><input name="strengths" className={getInputClass("strengths")} onChange={handleChange} /></div>
              <div><label className={labelStyle}>Areas for Improvement</label><input name="improvements" className={getInputClass("improvements")} onChange={handleChange} /></div>
              <div>
                <label className={labelStyle}>Personality Type</label>
                <select name="personality" value={formData.personality} className={getInputClass("personality")} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Introvert  </option>
                  <option>Extrovert  </option>
                  <option>Ambivert </option>
                </select>
              </div>
              <div>
                <label className={labelStyle}>Motivation Level(1 to 5)</label>
                <select name="level" value={formData.level} className={getInputClass("level")} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
          </section>

          {/* SECTION-6 */}
          <section className="bg-indigo-50/50 -mx-8 p-8 border-y border-indigo-100">
            <h2 className="text-xl font-black text-indigo-800 mb-6 flex items-center gap-2">
              <span className="bg-white p-2 rounded-lg text-indigo-600 text-sm">06</span>
              Mental Wellness & Motivation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelStyle}>Do you feel stressed about studies/career? </label>
                <select name="stressed" value={formData.stressed} className={getInputClass("stressed")} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>YES</option>
                  <option>NO</option>
                </select>
              </div>
              <div><label className={labelStyle}>Main Concerns (if any)</label><input name="concerns" className={getInputClass("concerns")} onChange={handleChange} /></div>
              <div>
                <label className={labelStyle}> Support Required </label>
                <select name="support" value={formData.support} className={getInputClass("support")} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Motivation </option>
                  <option>Time Management </option>
                  <option>Confidence Building </option>
                  <option>Stress Management </option>
                </select>
              </div>
            </div>
          </section>

          {/* SECTION-7 */}
          <section>
            <h2 className="text-xl font-black text-indigo-900 mb-6 flex items-center gap-3">
              <span className="bg-white text-indigo-600 w-8 h-8 flex items-center justify-center rounded-lg shadow-sm text-sm">07</span>
              Career Goals & Planning           
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div><label className={labelStyle}>Short-Term Goals </label><input name="shortgoal" className={getInputClass("shortgoal")} onChange={handleChange} /></div>
              <div><label className={labelStyle}>Long-Term Goals</label><input name="longgoal" className={getInputClass("longgoal")} onChange={handleChange} /></div>
              <div><label className={labelStyle}>Dream Career</label><input name="dream" className={getInputClass("dream")} onChange={handleChange} /></div>
            </div>
          </section>

          {/* SECTION 8 */}
          <section className="bg-indigo-50/50 -mx-8 p-8 border-y border-indigo-100">
            <h2 className="text-xl font-black text-indigo-800 mb-6 flex items-center gap-2">
              <span className="bg-white p-2 rounded-lg text-indigo-600 text-sm">08</span>
              Stream Selection & Career Mapping
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={labelStyle}> Preferblue Stream </label>
                <select name="stream" value={formData.stream} className={getInputClass("stream")} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Science  </option>
                  <option>Commerce  </option>
                  <option>Arts </option>
                </select>
              </div>
              <div><label className={labelStyle}>Reason for Selection</label><input name="selection" className={getInputClass("selection")} onChange={handleChange} /></div>
              <div><label className={labelStyle}>Alternative Options</label><input name="alternative" className={getInputClass("alternative")} onChange={handleChange} /></div>
            </div>
          </section>

          {/* SECTION-12 */}
          <section>
            <h2 className="text-xl font-black text-indigo-900 mb-6 flex items-center gap-3">
              <span className="bg-white text-indigo-600 w-8 h-8 flex items-center justify-center rounded-lg shadow-sm text-sm">09 </span>
              Admission Guidance Support          
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div><label className={labelStyle}>Target Institutions/Colleges </label><input name="shortgoal" className={getInputClass("shortgoal")} onChange={handleChange} /></div>
              <div><label className={labelStyle}>Entrance Exams (if any): </label><input name="longgoal" className={getInputClass("longgoal")} onChange={handleChange} /></div>
              <div><label className={labelStyle}>Admission Concerns</label><input name="dream" className={getInputClass("dream")} onChange={handleChange} /></div>
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
          
          {/* SUBMIT BUTTON
          <div className="mt-16 text-center border-t border-slate-100 pt-10">
            <button
              type="submit"
              className="w-full md:w-2/3 bg-[#4F46E5] text-white py-5 rounded-2xl font-black text-xl hover:bg-[#4338CA] shadow-2xl transition-all uppercase tracking-widest transform hover:-translate-y-1 active:scale-95"
            >
              Submit Application
            </button>
            <p className="mt-4 text-slate-400 text-xs font-bold italic animate-pulse">* blue border wali fields mandatory hain</p>
          </div> */}

        </form>
        </>
        ) : (
          /* --- SUCCESS SCREEN (THANK YOU) --- */
          <div className="p-12 md:p-24 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <CheckCircle size={48} strokeWidth={3} />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
              CONGRATS, <span className="text-indigo-600 uppercase">
                {formData.fullName?.split(' ')[0] || "STUDENT"}!
              </span>
            </h1>
            
            <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed font-medium mb-12">
              Your application has been successfully registeblue. Our team will send a 
              <span className="text-indigo-900 font-bold"> confirmation mail </span> 
              to {formData.email} shortly.
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

export default PersonalizedCounselingForm;