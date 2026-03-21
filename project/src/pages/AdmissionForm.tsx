import React, { useState } from "react";
import axios from "axios";
import { GraduationCap, User, Building, MapPin, Calendar, FileText, CheckCircle } from "lucide-react";

interface AdmissionFormData {
  studentName: string;
  school: string;
  college: string;
  stage: string;
  deadline: string;
  documents: string;
  status: string;
}

const AdmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<AdmissionFormData>({
    studentName: "",
    school: "",
    college: "",
    stage: "",
    deadline: "",
    documents: "",
    status: "",
  });

  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "" }>({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  
  // 1. Error state for validation
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // 2. Define required fields
  const requiredFields = ["studentName", "school", "college", "stage", "deadline", "status"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    // 3. Validation Logic
    const newErrors: Record<string, boolean> = {};
    requiredFields.forEach((field) => {
      if (!formData[field as keyof AdmissionFormData] || formData[field as keyof AdmissionFormData].trim() === "") {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMessage({ text: "❌ Please fill all required fields.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage({ text: "❌ Please log in first.", type: "error" });
        setLoading(false);
        return;
      }

      const payload = {
        ...formData,
        documents: formData.documents ? formData.documents.split(",").map((doc) => doc.trim()) : [],
      };

      await axios.post("http://localhost:5000/api/admissions", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setMessage({ text: "🎉 Admission submitted successfully!", type: "success" });
      setFormData({ studentName: "", school: "", college: "", stage: "", deadline: "", documents: "", status: "" });
      setErrors({});
    } catch (error: any) {
      setMessage({ text: "❌ Submission failed. Try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // 4. Dynamic Style Function
  const getFieldStyle = (fieldName: string) => {
    const baseStyle = "w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl outline-none transition-all font-medium text-slate-700 placeholder:text-slate-400";
    const normalStyle = "border-slate-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500";
    const errorStyle = "border-red-500 bg-red-50 focus:ring-4 focus:ring-red-500/10 animate-pulse";
    
    return `${baseStyle} ${errors[fieldName] ? errorStyle : normalStyle}`;
  };

  const labelStyle = "block text-sm font-bold text-slate-700 mb-1 ml-1 uppercase tracking-wider";
  const iconStyle = (fieldName: string) => `absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${errors[fieldName] ? "text-red-400" : "text-slate-400"}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden border border-slate-100">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-[5rem] -z-0"></div>

        <div className="text-center mb-10 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-xl shadow-indigo-100">
            <GraduationCap className="text-white h-8 w-8" />
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">New Admission</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>
          
          {/* Student Name */}
          <div>
            <label className={labelStyle}>Student Name *</label>
            <div className="relative">
              <User className={iconStyle("studentName")} />
              <input type="text" name="studentName" placeholder="John Doe" value={formData.studentName} onChange={handleChange} className={getFieldStyle("studentName")} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* School ID */}
            <div>
              <label className={labelStyle}>School ID *</label>
              <div className="relative">
                <Building className={iconStyle("school")} />
                <input type="text" name="school" placeholder="MongoDB ID" value={formData.school} onChange={handleChange} className={getFieldStyle("school")} />
              </div>
            </div>

            {/* College ID */}
            <div>
              <label className={labelStyle}>College ID *</label>
              <div className="relative">
                <MapPin className={iconStyle("college")} />
                <input type="text" name="college" placeholder="MongoDB ID" value={formData.college} onChange={handleChange} className={getFieldStyle("college")} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Stage Select */}
            <div>
              <label className={labelStyle}>Application Stage *</label>
              <div className="relative">
                <CheckCircle className={iconStyle("stage")} />
                <select name="stage" value={formData.stage} onChange={handleChange} className={getFieldStyle("stage")}>
                  <option value="">Select Stage</option>
                  <option value="Document Verification">Document Verification</option>
                  <option value="Payment Pending">Payment Pending</option>
                  <option value="Admission Confirmed">Admission Confirmed</option>
                </select>
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className={labelStyle}>Deadline *</label>
              <div className="relative">
                <Calendar className={iconStyle("deadline")} />
                <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className={getFieldStyle("deadline")} />
              </div>
            </div>
          </div>

          {/* Documents */}
          <div>
            <label className={labelStyle}>Documents</label>
            <div className="relative">
              <FileText className={iconStyle("documents")} />
              <input type="text" name="documents" placeholder="Mark sheet, ID Proof" value={formData.documents} onChange={handleChange} className={getFieldStyle("documents")} />
            </div>
          </div>

          {/* Status Select */}
          <div>
            <label className={labelStyle}>Admission Status *</label>
            <select name="status" value={formData.status} onChange={handleChange} className={getFieldStyle("status")}>
              <option value="">Select Status</option>
              <option value="incomplete">Incomplete</option>
              <option value="submitted">Submitted</option>
              <option value="accepted">Accepted</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl transition-all active:scale-95 disabled:opacity-70 mt-4 ${
              Object.keys(errors).length > 0 ? "bg-red-500 shadow-red-100" : "bg-indigo-600 shadow-indigo-100 hover:bg-indigo-700"
            } text-white`}
          >
            {loading ? "Processing..." : "Submit Admission"}
          </button>
        </form>

        {message.text && (
          <div className={`mt-6 p-4 rounded-xl text-center font-bold ${message.type === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionForm;