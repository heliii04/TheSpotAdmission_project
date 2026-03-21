import React, { useState } from "react";
import axios from "axios";

const CounsellingForm: React.FC = () => {
    const [formData, setFormData] = useState({
        studentName: "",
        grade: "",
        serviceType: "",
        preferredDate: "",
        notes: "",
        status: "pending",
    });

    const [message, setMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            // ✅ Get token from localStorage (or sessionStorage)
            const token = localStorage.getItem("token");

            if (!token) {
                setMessage("❌ No authentication token found. Please log in first.");
                return;
            }

            // ✅ Send POST request with Authorization header
            const response = await axios.post(
                "http://localhost:5000/counselling",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
               console.log(response)
            // ✅ Success message
            setMessage("🎉 Counselling form submitted successfully!");
            console.log(response.data);

            // ✅ Reset form
            setFormData({
                studentName: "",
                grade: "",
                serviceType: "",
                preferredDate: "",
                notes: "",
                status: "pending",
            });

        } catch (error: any) {
            console.error("❌ Error submitting counselling form:", error);
            setMessage("❌ Failed to submit counselling form. Please try again.");
        }
    };


    return (
        <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow-lg rounded-2xl border">
            <h2 className="text-2xl font-bold mb-4 text-center text-primary-500">
                Counselling Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Student Name */}
                <input
                    type="text"
                    name="studentName"
                    placeholder="Student Name"
                    value={formData.studentName}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                {/* Grade */}
                <input
                    type="text"
                    name="grade"
                    placeholder="Grade / Class"
                    value={formData.grade}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                {/* Service Type */}
                <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                >
                    <option value="">Select Service Type</option>
                    <option value="Career Counselling">Career Counselling</option>
                    <option value="Admission Guidance">Admission Guidance</option>
                    <option value="Course Selection">Course Selection</option>
                    <option value="Abroad Study">Abroad Study</option>
                </select>

                {/* Preferred Date */}
                <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                {/* Notes */}
                <textarea
                    name="notes"
                    placeholder="Additional Notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                />

                {/* Status */}
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-primary-500 text-white py-2 rounded hover:bg-primary-600 transition"
                >
                    Submit
                </button>
            </form>

            {message && (
                <p
                    className={`mt-4 text-center ${message.startsWith("🎉") ? "text-green-600" : "text-red-600"
                        }`}
                >
                    {message}
                </p>
            )}
        </div>
    );
};

export default CounsellingForm;
