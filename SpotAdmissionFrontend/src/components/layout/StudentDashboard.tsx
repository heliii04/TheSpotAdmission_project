import React, { useState, useRef, useEffect } from 'react';
import { 
  User, BookOpen, Clock, CheckCircle, 
  MessageSquare, LogOut, Bell, FileText, 
  Send, GraduationCap, X, Paperclip, Mail, Phone, MapPin, Save
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const StudentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('My Profile');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [myApplications, setMyApplications] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          
          // API Call to get all forms by email
          const response = await axios.get(`http://localhost:5000/api/student/my-inquiries?email=${userData.email}`);
          
          if (response.data.success) {
            setMyApplications(response.data.data);
          }
        }
      } catch (error) {
        console.error("Error fetching student history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);


  // --- DYNAMIC DATA FETCHING ---
  // Login ke waqt aapne jo 'user' save kiya hoga, use yahan fetch karenge
  const [studentInfo, setStudentInfo] = useState({
    name: "Guest User",
    id: "STU-0000",
    email: "not-logged-in@example.com",
    course: "Not Assigned",
    phone: "+91 00000 00000",
    address: "Address not found"
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user'); // Check your key name (user or userInfo)
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setStudentInfo(prev => ({
        ...prev,
        name: userData.fullName || userData.name || prev.name,
        email: userData.email || prev.email,
        id: userData._id || userData.id || prev.id,
        // Agar aapke database mein phone/address hai toh wo bhi yahan add karein
        phone: userData.phone || prev.phone,
        address: userData.address || prev.address,
        course: userData.course || prev.course
      }));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  // CHAT STATES
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: `Hello ${studentInfo.name.split(' ')[0]}! I am your counselor. How can I help you today?`, sender: "counselor" }
  ]);

  // const myApplications = [
  //   { id: 1, title: "College Admission Counselling", date: "10 April 2026", status: "Solved", counselor: "Dr. Amit Mehta", refNo: "ADM-8821" },
  //   { id: 2, title: "Career Guidance & Streams", date: "08 April 2026", status: "Pending", counselor: "Not Assigned", refNo: "CAR-9902" },
  // ];

  // FUNCTIONS
  const handleInputChange = (field: string, value: string) => {
    setStudentInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSendMessage = () => {
    if (chatInput.trim() === "") return;
    const newMessage = {
      id: messages.length + 1,
      text: chatInput,
      sender: "student"
    };
    setMessages([...messages, newMessage]);
    setChatInput("");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      alert(`Your file "${file.name}" has been selected for upload!`);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center gap-2 text-blue-600 font-bold text-xl border-b">
          <GraduationCap size={28} />
          <span>Student Portal</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button onClick={() => setActiveTab('My Profile')} className="w-full text-left outline-none">
            <SidebarItem icon={<User size={20} />} label="My Profile" active={activeTab === 'My Profile'} />
          </button>
          <button onClick={() => setActiveTab('My Applications')} className="w-full text-left outline-none">
            <SidebarItem icon={<FileText size={20} />} label="My Applications" active={activeTab === 'My Applications'} />
          </button>
          <button onClick={() => setIsChatOpen(true)} className="w-full text-left outline-none">
            <SidebarItem icon={<MessageSquare size={20} />} label="Support Chat" />
          </button>
        </nav>

        {/* LOGOUT SECTION */}
        <div className="p-4 border-t border-slate-100 bg-white">
        <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-md active:scale-95"
        >
            <LogOut size={20} />
            <span>Logout</span>
        </button>
    </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="bg-white px-8 py-4 shadow-sm flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">
            {activeTab === 'My Profile' ? 'My Profile' : 'Application Status'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
               <p className="text-xs font-bold text-slate-800">{studentInfo.name}</p>
               <p className="text-[10px] text-slate-400">{studentInfo.email}</p>
            </div>
            <Bell className="text-slate-400 cursor-pointer" />
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-md uppercase">
              {studentInfo.name.charAt(0)}
            </div>
          </div>
        </header>

        <main className="p-8 overflow-y-auto">
          
          {/* CONDITION 1: MY PROFILE SECTION */}
          {activeTab === 'My Profile' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 relative">
                <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-4xl font-black border-4 border-white shadow-lg uppercase">
                  {studentInfo.name.charAt(0)}
                </div>
                <div className="text-center md:text-left space-y-1">
                  <h3 className="text-2xl font-bold text-slate-800">{studentInfo.name}</h3>
                  <p className="text-slate-500 font-medium">{studentInfo.course}</p>
                  <div className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                    Profile Verified
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    if (isEditing) alert("Profile updated locally!");
                    setIsEditing(!isEditing);
                  }}
                  className={`md:absolute top-8 right-8 flex items-center gap-2 px-6 py-2 rounded-xl font-bold text-sm transition-all shadow-sm ${
                    isEditing ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  {isEditing ? <><Save size={16}/> Save Profile</> : 'Edit Profile'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                  <h4 className="font-bold text-slate-800 border-b pb-3 uppercase text-xs tracking-wider">Contact Details</h4>
                  <EditableInfo 
                    icon={<Mail size={18}/>} label="Email Address" field="email"
                    value={studentInfo.email} isEditing={isEditing} onChange={handleInputChange} 
                  />
                  <EditableInfo 
                    icon={<Phone size={18}/>} label="Phone Number" field="phone"
                    value={studentInfo.phone} isEditing={isEditing} onChange={handleInputChange} 
                  />
                  <EditableInfo 
                    icon={<MapPin size={18}/>} label="Resident Address" field="address"
                    value={studentInfo.address} isEditing={isEditing} onChange={handleInputChange} isTextArea
                  />
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                  <h4 className="font-bold text-slate-800 border-b pb-3 uppercase text-xs tracking-wider">Academic Info</h4>
                  <EditableInfo 
                    icon={<BookOpen size={18}/>} label="Account ID" field="id"
                    value={studentInfo.id} isEditing={false} onChange={handleInputChange} 
                  />
                  <EditableInfo 
                    icon={<GraduationCap size={18}/>} label="Current Course" field="course"
                    value={studentInfo.course} isEditing={isEditing} onChange={handleInputChange} 
                  />
                </div>
              </div>
            </div>
          )}

          {/* CONDITION 2: MY APPLICATIONS SECTION */}
          {activeTab === 'My Applications' && (
            <div className="space-y-8 animate-in slide-in-from-right-5 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg">
                  <p className="text-blue-100 text-sm font-medium">Applied Course</p>
                  <h3 className="text-lg font-bold mt-1">{studentInfo.course}</h3>
                </div>
                {/* Dynamic Count: Jitni inquiries hain unka count */}
                <StatusBox 
                  label="Total Requests" 
                  count={myApplications.length.toString().padStart(2, '0')} 
                  icon={<Clock className="text-orange-500" />} 
                />
                <StatusBox 
                  label="Completed" 
                  count={myApplications.filter(a => a.status === 'Solved' || a.status === 'Selected').length.toString().padStart(2, '0')} 
                  icon={<CheckCircle className="text-green-500" />} 
                />
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h3 className="font-bold text-slate-800">Application History</h3>
                  <button onClick={() => navigate('/counselling')} 
                    className="text-blue-600 text-sm font-bold bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100">  
                      + New Application
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="p-10 text-center text-slate-400">Loading your inquiries...</div>
                  ) : myApplications.length > 0 ? (
                    <table className="w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                        <tr>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Form Type</th>
                          <th className="px-6 py-4">Details</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {myApplications.map((app, index) => (
                          <tr 
                            key={app.id} 
                            className="hover:bg-slate-50 transition-colors cursor-pointer"
                            onClick={() => {
                              setSelectedApp(app); // Aa line thi selectedApp update thase
                              setIsChatOpen(true); // Chat open thai jashe
                            }}>
                            <td className="px-6 py-4 text-slate-500">
                              {new Date(app.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 font-bold text-slate-700">
                              {app.category} {/* Career, Admission, or Counseling */}
                            </td>
                            <td className="px-6 py-4 text-slate-600">
                              {app.course || app.position || "Inquiry"}
                            </td>
                            <td className="px-6 py-4 text-[10px] font-bold">
                              <span className={`px-3 py-1 rounded-full ${
                                app.status === 'Solved' || app.status === 'Selected' || app.status === 'Admitted'
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-orange-100 text-orange-700'
                              }`}>
                                {app.status || 'Pending'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-10 text-center text-slate-400">
                      No inquiries found. Click "+ New Application" to start.
                    </div>
                  )}
                </div>
              </div>
  
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <FileText size={18} className="text-blue-600" /> Upload Documents
                </h3>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,.pdf" />
                <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center hover:border-blue-400 transition cursor-pointer group">
                  <Paperclip className="mx-auto text-slate-300 mb-2 group-hover:text-blue-500" />
                  <p className="text-slate-500 text-sm font-medium">Click to upload marksheet from Gallery</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* CHAT POPUP */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white shadow-2xl rounded-2xl border border-slate-200 overflow-hidden z-50 animate-in slide-in-from-bottom-5">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center font-bold text-xs border border-blue-300">
                {selectedApp?.counselorName ? selectedApp.counselorName.charAt(0) : 'AD'}
              </div>
              <p className="font-bold text-xs">{selectedApp?.counselorName ? `${selectedApp.counselorName} (Counselor)` : "Support Team"}</p>
            </div>
            <button onClick={() => setIsChatOpen(false)}><X size={20} /></button>
          </div>
          
          <div className="h-64 p-4 bg-slate-50 overflow-y-auto text-xs space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl max-w-[85%] shadow-sm ${msg.sender === 'student' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-slate-700 rounded-tl-none border'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-white border-t flex gap-2">
            <input 
              type="text" 
              placeholder="Type message..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-slate-100 rounded-xl px-4 py-2 text-xs focus:ring-1 ring-blue-500 outline-none" 
            />
            <button onClick={handleSendMessage} className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition"><Send size={18} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

// HELPER COMPONENTS (Same as before)
const EditableInfo = ({ icon, label, value, isEditing, onChange, field, isTextArea }: any) => (
  <div className="flex items-start gap-4">
    <div className="p-2 bg-slate-50 rounded-lg text-slate-400 mt-1">{icon}</div>
    <div className="flex-1">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      {isEditing ? (
        isTextArea ? (
          <textarea className="w-full bg-slate-50 border border-blue-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 ring-blue-500" value={value} onChange={(e) => onChange(field, e.target.value)} rows={3} />
        ) : (
          <input className="w-full bg-slate-50 border border-blue-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 ring-blue-500" value={value} onChange={(e) => onChange(field, e.target.value)} />
        )
      ) : (
        <p className="text-sm font-semibold text-slate-700">{value}</p>
      )}
    </div>
  </div>
);

const SidebarItem = ({ icon, label, active = false }: any) => (
  <div className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${active ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}>
    {icon} <span className="font-bold text-sm">{label}</span>
  </div>
);

const StatusBox = ({ label, count, icon }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
    <div>
      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{label}</p>
      <h3 className="text-2xl font-black text-slate-800 mt-1">{count}</h3>
    </div>
    <div className="p-3 bg-slate-50 rounded-2xl">{icon}</div>
  </div>
);

export default StudentDashboard;