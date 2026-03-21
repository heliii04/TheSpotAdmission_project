import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Calendar, Loader2 } from 'lucide-react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../api/Api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    service: '',
    message: '',
    preferredTime: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const services = [
    "Pre-Primary School Counselling",
    "College Admission Counselling",
    "Career Guidance & Stream Selection",
    "Personalized Student Counselling",
    "Entrance Exam Preparation",
    "School Selection Assistance",
    "Other"
  ];

  const timeSlots = [
    "Morning (9 AM - 12 PM)",
    "Afternoon (12 PM - 3 PM)",
    "Evening (3 PM - 6 PM)",
    "Flexible"
  ];

  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      details: "+91 8780596840",
      availability: "Mon-Sat: 9 AM - 7 PM",
      action: "Call Now",
      link: "tel:+918780596840",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: "info@thespotadmission.co.in",
      availability: "24/7 Online Support",
      action: "Send Email",
      link: "mailto:info@thespotadmission.co.in",
      color: "text-purple-600",
      bg: "bg-purple-50"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: "+91 8780596840",
      availability: "Quick Response",
      action: "Start Chat",
      link: "https://wa.me/918780596840",
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      icon: Calendar,
      title: "Visit Us",
      details: "Sector 11, Gandhinagar",
      availability: "In-person Meeting",
      action: "Get Direction",
      link: "https://goo.gl/maps/xyz", // Update with actual link
      color: "text-orange-600",
      bg: "bg-orange-50"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/contact", formData);
      if (res.data.success) {
        setIsSubmitted(true);
        setFormData({
          name: "", phone: "", email: "", service: "",
          preferredTime: "", subject: "", message: "",
        });
        toast.success("Message sent successfully! 🎓");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-neutral-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Hero Section with Glassmorphism */}
      <section className="relative bg-indigo-900 py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {/* Aapki slider image yahan background mein fit hogi */}
          <img 
            src="/path-to-your-vintage-image.jpg" 
            className="w-full h-full object-cover grayscale" 
            alt="background"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Let's Shape Your <span className="text-yellow-400">Future</span>
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
            Have questions about admissions? Our expert consultants are just a message away.
          </p>
        </div>
      </section>

      {/* Contact Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => (
            <a 
              href={method.link} 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group"
            >
              <div className={`${method.bg} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <method.icon className={`h-7 w-7 ${method.color}`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{method.title}</h3>
              <p className="text-gray-600 text-sm font-medium mb-3">{method.details}</p>
              <span className={`text-xs font-bold uppercase tracking-wider ${method.color}`}>
                {method.action} →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Main Content: Form & Info */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send a Message</h2>
              
              {isSubmitted ? (
                <div className="text-center py-12 bg-green-50 rounded-2xl border border-green-100">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200">
                    <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                  <p className="text-gray-600">Your inquiry has been received. We'll contact you shortly.</p>
                  <button onClick={() => setIsSubmitted(false)} className="mt-6 text-indigo-600 font-bold hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Full Name *</label>
                      <input name="name" type="text" required value={formData.name} onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                        placeholder="e.g. Rahul Sharma" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Phone Number *</label>
                      <input name="phone" type="tel" pattern="[0-9]{10}" required value={formData.phone} onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                        placeholder="10 digit number" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Email Address *</label>
                    <input name="email" type="email" required value={formData.email} onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                      placeholder="rahul@example.com" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Service</label>
                      <select name="service" value={formData.service} onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all appearance-none bg-no-repeat bg-[right_1rem_center]">
                        <option value="">Choose Service</option>
                        {services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Call Slot</label>
                      <select name="preferredTime" value={formData.preferredTime} onChange={handleInputChange}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all">
                        <option value="">Choose Time</option>
                        {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 ml-1">Message *</label>
                    <textarea name="message" required rows={4} value={formData.message} onChange={handleInputChange}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                      placeholder="How can we help you?"></textarea>
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 transition-all flex items-center justify-center disabled:opacity-70">
                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2 h-5 w-5" />}
                    {loading ? "Sending..." : "Request a Callback"}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Info & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-indigo-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">Office Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <p className="text-indigo-100">Shalin Complex, 905, Sector 11, Gandhinagar, Gujarat 382011</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-bold">Business Hours</p>
                      <p className="text-indigo-100 text-sm">Mon - Fri: 10:00 AM - 07:00 PM</p>
                      <p className="text-indigo-100 text-sm">Sat: 10:00 AM - 04:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Decorative Circle */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-800 rounded-full opacity-50"></div>
            </div>

            {/* Live Map */}
            <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 h-80">
              <iframe 
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.497284714574!2d72.6366!3d23.2167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEzJzAwLjEiTiA3MsKwMzgnMTEuOCJF!5e0!3m2!1sen!2sin!4v1625555555555" 
                className="w-full h-full rounded-2xl"
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;