import React, { useState } from "react";
import axiosInstance from "../api/Api"; // Tamara axios instance no use karo
import { GraduationCap, User, Mail, Phone, Building, MapPin, Calendar, FileText, CheckCircle, Send } from "lucide-react";

interface AdmissionFormData {
  sname: string;
  semail: string;
  scontact: string;
  course: string;
  city: string;
  address: string;
  deadline: string;
  status: string;
}

const AdmissionForm: React.FC = () => {
  const [formData, setFormData] = useState<AdmissionFormData>({
    sname: "",
    semail: "",
    scontact: "",
    course: "",
    city: "",
    address: "",
    deadline: "",
    status: "Pending",
  });

  const [message, setMessage] = useState<{ text: string; type: "success" | "error" | "" }>({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const requiredFields = ["sname", "semail", "scontact", "course", "deadline"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
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

    const newErrors: Record<string, boolean> = {};
    requiredFields.forEach((field) => {
      if (!formData[field as keyof AdmissionFormData]?.trim()) {
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
      // Backend Endpoint: /api/admission/submit
      const response = await axiosInstance.post("/admission/submit", formData);

      if (response.data.success) {
        setMessage({ text: "🎉 Admission submitted successfully!", type: "success" });
        setFormData({ sname: "", semail: "", scontact: "", course: "", city: "", address: "", deadline: "", status: "Pending" });
        setErrors({});
      }
    } catch (error: any) {
      setMessage({ text: "❌ Submission failed. Check backend connection.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const getFieldStyle = (fieldName: string) => {
    const baseStyle = "w-full pl-12 pr-4 py-4 bg-slate-50 border rounded-2xl outline-none transition-all font-medium text-slate-700";
    const normalStyle = "border-slate-100 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500";
    const errorStyle = "border-red-500 bg-red-50 focus:ring-4 focus:ring-red-500/10";
    return `${baseStyle} ${errors[fieldName] ? errorStyle : normalStyle}`;
  };

  const labelStyle = "block text-[10px] font-black text-slate-400 mb-2 ml-1 uppercase tracking-[0.2em]";
  const iconStyle = (fieldName: string) => `absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-colors ${errors[fieldName] ? "text-red-400" : "text-indigo-500"}`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[3rem] p-8 md:p-14 border border-slate-50 relative overflow-hidden">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-[2rem] mb-6 shadow-2xl shadow-indigo-200">
            <GraduationCap className="text-white h-10 w-10" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">College Admission</h2>
          <p className="text-slate-400 mt-2 font-medium">Fill details to start your academic journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7" noValidate>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* Student Name */}
            <div>
              <label className={labelStyle}>Full Name *</label>
              <div className="relative">
                <User className={iconStyle("sname")} />
                <input type="text" name="sname" placeholder="John Doe" value={formData.sname} onChange={handleChange} className={getFieldStyle("sname")} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={labelStyle}>Email Address *</label>
              <div className="relative">
                <Mail className={iconStyle("semail")} />
                <input type="email" name="semail" placeholder="john@example.com" value={formData.semail} onChange={handleChange} className={getFieldStyle("semail")} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* Contact */}
            <div>
              <label className={labelStyle}>Contact Number *</label>
              <div className="relative">
                <Phone className={iconStyle("scontact")} />
                <input type="tel" name="scontact" placeholder="+91 98765 43210" value={formData.scontact} onChange={handleChange} className={getFieldStyle("scontact")} />
              </div>
            </div>

            {/* Course Select */}
            <div>
              <label className={labelStyle}>Preferred Course *</label>
              <div className="relative">
                <CheckCircle className={iconStyle("course")} />
                <select name="course" value={formData.course} onChange={handleChange} className={getFieldStyle("course")}>
                  <option value="">Select Course</option>
                  <option value="B.Tech IT">B.Tech IT</option>
                  <option value="B.Tech Computer">B.Tech Computer</option>
                  <option value="BCA">BCA</option>
                  <option value="MCA">MCA</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
             {/* City */}
             <div>
              <label className={labelStyle}>City</label>
              <div className="relative">
                <Building className={iconStyle("city")} />
                <input type="text" name="city" placeholder="Ahmedabad" value={formData.city} onChange={handleChange} className={getFieldStyle("city")} />
              </div>
            </div>

            {/* Deadline */}
            <div>
              <label className={labelStyle}>Submission Deadline *</label>
              <div className="relative">
                <Calendar className={iconStyle("deadline")} />
                <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className={getFieldStyle("deadline")} />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className={labelStyle}>Full Address</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-5 text-indigo-500" size={20} />
              <textarea name="address" rows={2} placeholder="Enter your full residential address" value={formData.address} onChange={handleChange} 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-700 resize-none" />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-5 rounded-[1.5rem] bg-indigo-600 text-white font-black text-lg shadow-2xl shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70 group">
            {loading ? "Processing..." : (
              <>
                Confirm Submission
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        {message.text && (
          <div className={`mt-8 p-5 rounded-[1.2rem] text-center font-bold animate-in fade-in slide-in-from-top-2 ${message.type === "success" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdmissionForm;