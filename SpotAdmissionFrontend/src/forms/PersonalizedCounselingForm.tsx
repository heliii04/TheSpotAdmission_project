import React, { useState } from "react";
import { CheckCircle, Home, PlusCircle } from "lucide-react";
import axiosInstance from "../api/Api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ======================
// INTERFACE
// ======================
interface CounselingFormData {
  fullName?: string;
  dob?: string;
  gender?: string;
  classGrade?: string;
  schoolCollege?: string;
  contact?: string;
  email?: string;
  fatherName?: string;
  fatherOccupation?: string;
  motherName?: string;
  motherOccupation?: string;
  parentContact?: string;
  parentsEmail?: string;
  expectation?: string;
  performance?: string;
  Challenges?: string;
  favoriteSubjects?: string;
  difficultSubjects?: string;
  areasOfInterest?: string;
  activities?: string;
  Fields?: string;
  strengths?: string;
  improvements?: string;
  personality?: string;
  level?: string;
  stressed?: string;
  concerns?: string;
  support?: string;
  shortgoal?: string;
  longgoal?: string;
  dream?: string;
  stream?: string;
  selection?: string;
  alternative?: string;
  targetInstitutions?: string;
  entranceExams?: string;
  admissionConcerns?: string;
  declare?: boolean;
}

const initialData: CounselingFormData = {
  fullName: "", dob: "", gender: "", classGrade: "", schoolCollege: "",
  contact: "", email: "", fatherName: "", fatherOccupation: "", motherName: "",
  motherOccupation: "", parentContact: "", parentsEmail: "", expectation: "",
  performance: "", Challenges: "", favoriteSubjects: "", difficultSubjects: "",
  areasOfInterest: "", activities: "", Fields: "", strengths: "", improvements: "",
  personality: "", level: "", stressed: "", concerns: "", support: "",
  shortgoal: "", longgoal: "", dream: "", stream: "", selection: "",
  alternative: "", targetInstitutions: "", entranceExams: "", admissionConcerns: "",
  declare: false,
};

const PersonalizedCounselingForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CounselingFormData>({ ...initialData });
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const requiredFields: (keyof CounselingFormData)[] = [
    "fullName", "email", "contact", "gender", "expectation",
  ];

  // ✅ FIX 1: Checkbox ko properly handle karo
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors.includes(name)) {
      setErrors((prev) => prev.filter((f) => f !== name));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = requiredFields.filter(
      (f) => !formData[f]
    ) as string[];

    if (newErrors.length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all required fields (marked in blue)!");
      return;
    }

    if (!formData.declare) {
      toast.error("Please accept the declaration before submitting!");
      return;
    }

    try {
      await axiosInstance.post("/personalizedcounselingform", formData);
      toast.success("Form successfully submitted!");
      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
      const msg =
        err?.response?.data?.message || "Server error: Could not submit form.";
      toast.error(msg);
    }
  };

  const getInputClass = (name: string) => {
    const hasError = errors.includes(name);
    return `w-full p-3 bg-[#F8FAFC] border rounded-xl outline-none transition-all text-slate-600 text-sm focus:ring-2 ${
      hasError
        ? "border-blue-500 ring-1 ring-blue-100 bg-blue-50"
        : "border-[#E2E8F0] focus:ring-[#6366F1]"
    }`;
  };

  const labelStyle =
    "text-[11px] font-bold uppercase tracking-widest text-[#64748B] mb-2 block ml-1";

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 font-sans">
      <ToastContainer position="top-center" />

      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-white overflow-hidden">
        {!isSubmitted ? (
          <>
            {/* HEADER */}
            <div className="bg-indigo-600 p-12 text-center text-white">
              <h1 className="text-4xl font-black tracking-tight">
                Personalized Student Counselling
              </h1>
              <p className="text-indigo-100 mt-2 font-medium">
                Personalized Career Counselling & Development Form
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-12">

              {/* SECTION 1 — Personal Information */}
              <section>
                <h2 className="text-xl font-black text-indigo-800 mb-6 flex items-center gap-2">
                  <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600 text-sm">01</span>
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className={labelStyle}>Full Name *</label>
                    {/* ✅ FIX 2: name="fullName" matches state key */}
                    <input name="fullName" value={formData.fullName} placeholder="Rahul Patel" className={getInputClass("fullName")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Date of Birth</label>
                    <input name="dob" value={formData.dob} type="date" className={getInputClass("dob")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Gender *</label>
                    <select name="gender" value={formData.gender} className={getInputClass("gender")} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelStyle}>Contact *</label>
                    <input name="contact" maxLength={10} value={formData.contact} placeholder="98765 43210" className={getInputClass("contact")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Email *</label>
                    <input name="email" type="email" value={formData.email} placeholder="rahul@example.com" className={getInputClass("email")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Current Class/Grade</label>
                    {/* ✅ FIX 3: name has no "/" — use camelCase */}
                    <input name="classGrade" value={formData.classGrade} placeholder="e.g. 10th / 12th" className={getInputClass("classGrade")} onChange={handleChange} />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelStyle}>School/College Name</label>
                    <input name="schoolCollege" value={formData.schoolCollege} placeholder="e.g. Delhi Public School" className={getInputClass("schoolCollege")} onChange={handleChange} />
                  </div>
                </div>
              </section>

              {/* SECTION 2 — Family Information */}
              <section className="bg-indigo-50/50 -mx-8 p-8 border-y border-indigo-100">
                <h2 className="text-xl font-black text-indigo-800 mb-6 flex items-center gap-2">
                  <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600 text-sm">02</span>
                  Family Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className={labelStyle}>Father's Name</label>
                    <input name="fatherName" value={formData.fatherName} className={getInputClass("fatherName")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Mother's Name</label>
                    <input name="motherName" value={formData.motherName} className={getInputClass("motherName")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Parents Contact</label>
                    {/* ✅ FIX 4: name was "contact" (clash with student contact) — fixed to "parentContact" */}
                    <input name="parentContact" value={formData.parentContact} className={getInputClass("parentContact")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Father Occupation</label>
                    <input name="fatherOccupation" value={formData.fatherOccupation} className={getInputClass("fatherOccupation")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Mother Occupation</label>
                    <input name="motherOccupation" value={formData.motherOccupation} className={getInputClass("motherOccupation")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Parents Email</label>
                    <input name="parentsEmail" value={formData.parentsEmail} className={getInputClass("parentsEmail")} onChange={handleChange} />
                  </div>
                </div>
                <div className="mt-6">
                  <label className={labelStyle}>Expectations from Counselling *</label>
                  <input name="expectation" value={formData.expectation} className={getInputClass("expectation")} onChange={handleChange} />
                </div>
              </section>

              {/* SECTION 3 — Academic Assessment */}
              <section>
                <h2 className="text-xl font-black text-indigo-900 mb-6 flex items-center gap-3">
                  <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600 text-sm">03</span>
                  Academic Assessment
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyle}>Recent Academic Performance</label>
                    <select name="performance" value={formData.performance} className={getInputClass("performance")} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>Excellent</option>
                      <option>Good</option>
                      <option>Average</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelStyle}>Learning Challenges (if any)</label>
                    <input name="Challenges" value={formData.Challenges} className={getInputClass("Challenges")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Favorite Subject</label>
                    <select name="favoriteSubjects" value={formData.favoriteSubjects} className={getInputClass("favoriteSubjects")} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>Maths</option><option>Science</option><option>Social Science</option>
                      <option>Gujarati</option><option>Hindi</option><option>Sanskrit</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelStyle}>Difficult Subject</label>
                    <select name="difficultSubjects" value={formData.difficultSubjects} className={getInputClass("difficultSubjects")} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>Maths</option><option>Science</option><option>Social Science</option>
                      <option>Gujarati</option><option>Hindi</option><option>Sanskrit</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* SECTION 4 — Psychometric & Interest Assessment */}
              <section className="bg-indigo-50/50 -mx-8 p-8 border-y border-indigo-100">
                <h2 className="text-xl font-black text-indigo-800 mb-6 flex items-center gap-2">
                  <span className="bg-white p-2 rounded-lg text-indigo-600 text-sm">04</span>
                  Psychometric & Interest Assessment
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className={labelStyle}>Areas of Interest</label>
                    {/* ✅ FIX 5: was bound to "difficultSubjects" by mistake — fixed to "areasOfInterest" */}
                    <select name="areasOfInterest" value={formData.areasOfInterest} className={getInputClass("areasOfInterest")} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>Technical</option><option>Creative</option><option>Analytical</option>
                      <option>Business</option><option>Social</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelStyle}>Activities you enjoy</label>
                    <input name="activities" value={formData.activities} className={getInputClass("activities")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Preferred Career Fields (if known)</label>
                    <input name="Fields" value={formData.Fields} className={getInputClass("Fields")} onChange={handleChange} />
                  </div>
                </div>
              </section>

              {/* SECTION 5 — Skills & Personality */}
              <section>
                <h2 className="text-xl font-black text-indigo-900 mb-6 flex items-center gap-3">
                  <span className="bg-white text-indigo-600 w-8 h-8 flex items-center justify-center rounded-lg shadow-sm text-sm">05</span>
                  Skills & Personality Evaluation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelStyle}>Key Strengths</label>
                    <input name="strengths" value={formData.strengths} className={getInputClass("strengths")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Areas for Improvement</label>
                    <input name="improvements" value={formData.improvements} className={getInputClass("improvements")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Personality Type</label>
                    <select name="personality" value={formData.personality} className={getInputClass("personality")} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>Introvert</option><option>Extrovert</option><option>Ambivert</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelStyle}>Motivation Level (1 to 5)</label>
                    <select name="level" value={formData.level} className={getInputClass("level")} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* SECTION 6 — Mental Wellness */}
              <section className="bg-indigo-50/50 -mx-8 p-8 border-y border-indigo-100">
                <h2 className="text-xl font-black text-indigo-800 mb-6 flex items-center gap-2">
                  <span className="bg-white p-2 rounded-lg text-indigo-600 text-sm">06</span>
                  Mental Wellness & Motivation
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className={labelStyle}>Do you feel stressed about studies/career?</label>
                    <select name="stressed" value={formData.stressed} className={getInputClass("stressed")} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>YES</option><option>NO</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelStyle}>Main Concerns (if any)</label>
                    <input name="concerns" value={formData.concerns} className={getInputClass("concerns")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Support Required</label>
                    <select name="support" value={formData.support} className={getInputClass("support")} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>Motivation</option><option>Time Management</option>
                      <option>Confidence Building</option><option>Stress Management</option>
                    </select>
                  </div>
                </div>
              </section>

              {/* SECTION 7 — Career Goals */}
              <section>
                <h2 className="text-xl font-black text-indigo-900 mb-6 flex items-center gap-3">
                  <span className="bg-white text-indigo-600 w-8 h-8 flex items-center justify-center rounded-lg shadow-sm text-sm">07</span>
                  Career Goals & Planning
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className={labelStyle}>Short-Term Goals</label>
                    <input name="shortgoal" value={formData.shortgoal} className={getInputClass("shortgoal")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Long-Term Goals</label>
                    <input name="longgoal" value={formData.longgoal} className={getInputClass("longgoal")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Dream Career</label>
                    <input name="dream" value={formData.dream} className={getInputClass("dream")} onChange={handleChange} />
                  </div>
                </div>
              </section>

              {/* SECTION 8 — Stream Selection */}
              <section className="bg-indigo-50/50 -mx-8 p-8 border-y border-indigo-100">
                <h2 className="text-xl font-black text-indigo-800 mb-6 flex items-center gap-2">
                  <span className="bg-white p-2 rounded-lg text-indigo-600 text-sm">08</span>
                  Stream Selection & Career Mapping
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className={labelStyle}>Preferred Stream</label>
                    <select name="stream" value={formData.stream} className={getInputClass("stream")} onChange={handleChange}>
                      <option value="">Select</option>
                      <option>Science</option><option>Commerce</option><option>Arts</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelStyle}>Reason for Selection</label>
                    <input name="selection" value={formData.selection} className={getInputClass("selection")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Alternative Options</label>
                    <input name="alternative" value={formData.alternative} className={getInputClass("alternative")} onChange={handleChange} />
                  </div>
                </div>
              </section>

              {/* SECTION 9 — Admission Guidance */}
              <section>
                <h2 className="text-xl font-black text-indigo-900 mb-6 flex items-center gap-3">
                  <span className="bg-white text-indigo-600 w-8 h-8 flex items-center justify-center rounded-lg shadow-sm text-sm">09</span>
                  Admission Guidance Support
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className={labelStyle}>Target Institutions/Colleges</label>
                    {/* ✅ FIX 6: Section 9 fields were copy-pasted with Section 7 names — all fixed with unique names */}
                    <input name="targetInstitutions" value={formData.targetInstitutions} className={getInputClass("targetInstitutions")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Entrance Exams (if any)</label>
                    <input name="entranceExams" value={formData.entranceExams} className={getInputClass("entranceExams")} onChange={handleChange} />
                  </div>
                  <div>
                    <label className={labelStyle}>Admission Concerns</label>
                    <input name="admissionConcerns" value={formData.admissionConcerns} className={getInputClass("admissionConcerns")} onChange={handleChange} />
                  </div>
                </div>
              </section>

              {/* Declaration & Submit */}
              <div className="space-y-6 pt-6 border-t">
                <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <input
                    type="checkbox"
                    id="declare"
                    name="declare"
                    checked={formData.declare}
                    onChange={handleChange}
                    className="h-5 w-5 text-indigo-600 rounded cursor-pointer"
                  />
                  <label htmlFor="declare" className="text-sm font-medium text-indigo-900 cursor-pointer">
                    I declare that all information provided is true and correct.
                  </label>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-500 hover:bg-indigo-700 text-white font-black py-4 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 text-lg"
                  >
                    Submit Application
                  </button>
                  <button
                    type="button"
                    onClick={() => window.confirm("Reset all data?") && setFormData({ ...initialData })}
                    className="px-10 py-4 bg-blue-100 text-blue-500 font-bold rounded-2xl hover:bg-blue-600 hover:text-white transition-all"
                  >
                    Reset
                  </button>
                </div>
              </div>

            </form>
          </>
        ) : (
          /* SUCCESS SCREEN */
          <div className="p-12 md:p-24 text-center">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
              <CheckCircle size={48} strokeWidth={3} />
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
              CONGRATS,{" "}
              <span className="text-indigo-600 uppercase">
                {formData.fullName?.split(" ")[0] || "STUDENT"}!
              </span>
            </h1>

            <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed font-medium mb-12">
              Your application has been successfully registered. Our team will send a{" "}
              <span className="text-indigo-900 font-bold">confirmation mail</span> to{" "}
              {formData.email} shortly.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-10 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-2xl hover:-translate-y-1"
              >
                <Home size={20} /> Back to Home
              </button>
              <button
                onClick={() => { setIsSubmitted(false); setFormData({ ...initialData }); }}
                className="flex items-center gap-2 px-10 py-4 bg-indigo-50 text-indigo-600 font-black rounded-2xl hover:bg-indigo-100 border border-indigo-100"
              >
                <PlusCircle size={20} /> New Admission
              </button>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-100 inline-block">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                Counselling ID: #CAD{Math.floor(100000 + Math.random() * 900000)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalizedCounselingForm;