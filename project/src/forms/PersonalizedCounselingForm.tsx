import React, { useState } from "react";
import axiosInstance from "../api/Api";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ======================
// 1️⃣ INTERFACE
// ======================
interface CounselingFormData {
  fullName?: string;
  dob?: string;
  gender?: string;
  classYearDept?: string;
  rollNumber?: string;
  schoolName?: string;
  contact?: string;
  email?: string;
  address?: string;

  fatherName?: string;
  fatherOccupation?: string;
  fatherContact?: string;
  motherName?: string;
  motherOccupation?: string;
  motherContact?: string;
  income?: string;
  siblings?: string;

  performance?: string;
  favoriteSubjects?: string;
  difficultSubjects?: string;
  learningStyle?: string;
  activities?: string;

  behavior?: string;
  stressFactors?: string;
  coping?: string;

  reason?: string;
  referral?: string;
  previousCounseling?: string;

  strengths?: string;
  improvements?: string;
  expectations?: string;
  challenges?: string;
  motivation?: string;

  sessionDate?: string;
  counselorName?: string;
  observation?: string;

  studentSignature?: string;
  parentSignature?: string;
}

// Input UI class
 


// ==========================
// 2️⃣ MAIN FORM COMPONENT
// ==========================
const PersonalizedCounselingForm: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CounselingFormData>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post(
        "/personalizedcounselingform",
        formData
      );
      toast.success("Error submitting form");
      navigate("/personalizedcounselingtable");
    } catch (err) {
      console.log(err);
      toast.error("Error submitting form");
    }
  };


  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-xl rounded-2xl my-10">
        <ToastContainer position="top-right" autoClose={3000} />

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* SECTION 1 */}
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-primary-500">
            Section 1: Basic Student Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="fullName" placeholder="Full Name" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
            <input name="dob" placeholder="Date of Birth (DD/MM/YYYY)" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />

            <select name="gender" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange}>
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

            <input name="classYearDept" placeholder="Class / Year / Department" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
            <input name="rollNumber" placeholder="Roll Number / Student ID" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
            <input name="schoolName" placeholder="School / College Name" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
            <input name="contact" placeholder="Contact Number" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
            <input name="email" placeholder="Email Address" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
          </div>

          <textarea name="address" placeholder="Residential Address" className={`$"mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 mt-3`} onChange={handleChange} />
        </section>


        {/* SECTION 2 */}
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-primary-500">
            Section 2: Family and Background Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="fatherName" placeholder="Father’s Name" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
            <input name="fatherOccupation" placeholder="Father’s Occupation" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
            <input name="fatherContact" placeholder="Father’s Contact Number" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
            <input name="motherName" placeholder="Mother’s Name" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
            <input name="motherOccupation" placeholder="Mother’s Occupation" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
            <input name="motherContact" placeholder="Mother’s Contact Number" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
            <input name="income" placeholder="Family Annual Income" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
          </div>

          <textarea name="siblings" placeholder="Siblings and educational status" className={`$"mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 mt-3`} onChange={handleChange} />
        </section>


        {/* SECTION 3 */}
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-primary-500">
            Section 3: Academic and Co-Curricular Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select name="performance" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange}>
              <option value="">Overall Academic Performance</option>
              <option>Excellent</option>
              <option>Good</option>
              <option>Average</option>
              <option>Needs Improvement</option>
            </select>

            <input name="favoriteSubjects" placeholder="Favorite Subjects" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
            <input name="difficultSubjects" placeholder="Difficult Subjects" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />

            <select name="learningStyle" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange}>
              <option value="">Learning Style</option>
              <option>Visual</option>
              <option>Auditory</option>
              <option>Kinesthetic</option>
              <option>Reading/Writing</option>
            </select>
          </div>

          <textarea name="activities" placeholder="Activities / Achievements" className={`$"mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 mt-3`} onChange={handleChange} />
        </section>


        {/* SECTION 4 */}
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-primary-500">Section 4: Behavioral & Emotional</h2>

          <textarea name="behavior" placeholder="Behavior Observation" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
          <textarea name="stressFactors" placeholder="Stress Factors" className={`$"mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 mt-3`} onChange={handleChange} />
          <textarea name="coping" placeholder="Coping Mechanisms" className={`$"mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 mt-3`} onChange={handleChange} />
        </section>


        {/* SECTION 5 */}
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-primary-500">Section 5: Counseling Needs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="reason" placeholder="Primary Reason" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
            <input name="referral" placeholder="Referral Source" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
          </div>

          <input name="previousCounseling" placeholder="Previous Counseling Details" className={`$"mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 mt-3`} onChange={handleChange} />
        </section>


        {/* SECTION 6 */}
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-primary-500">Section 6: Strengths & Improvement</h2>

          <textarea name="strengths" placeholder="Strengths" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
          <textarea name="improvements" placeholder="Areas to Improve" className={`$"mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 mt-3`} onChange={handleChange} />
          <textarea name="expectations" placeholder="Expectations" className={`$"mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 mt-3`} onChange={handleChange} />
          <textarea name="challenges" placeholder="Handling Challenges" className={`$"mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 mt-3`} onChange={handleChange} />
          <textarea name="motivation" placeholder="Motivation Source" className={`$"mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 mt-3`} onChange={handleChange} />
        </section>


        {/* SECTION 7 */}
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-primary-500">Section 7: Counseling Session</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="sessionDate" placeholder="Session Date" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
            <input name="counselorName" placeholder="Counselor Name" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
          </div>

          <textarea name="observation" placeholder="Observer Summary" className={`$"mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 mt-3`} onChange={handleChange} />
        </section>


        {/* SECTION 8 */}
        <section>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2 text-primary-500">Section 8: Signatures</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="studentSignature" placeholder="Student Signature" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
            <input name="parentSignature" placeholder="Parent Signature" className="mt-1 p-2 border border-primary-500 rounded-md w-full" 
                   focus:ring-primary-500 focus:border-primary-600 onChange={handleChange} />
          </div>
        </section>


        {/* SUBMIT */}
        <div className="text-center mt-10">
          <button
            type="submit"
            className="mt-6 w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 transition"
          >
            Submit Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalizedCounselingForm;
