import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  User, BookOpen, Clock, CheckCircle,
  MessageSquare, LogOut, Bell, FileText,
  Send, GraduationCap, X, Paperclip, Mail, Phone, MapPin, Save,
  RefreshCw, AlertCircle, Plus, ExternalLink, ChevronRight,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/Api';

// ─── Types ────────────────────────────────────────────────────────────────────

interface StudentInfo {
  name: string;
  id: string;
  email: string;
  course: string;
  phone: string;
  address: string;
  role: string;
}

interface AppRecord {
  _id: string;
  formType: string;
  label: string;         // human-readable form name
  status: string;
  createdAt: string;
  detail: string;        // one-liner summary
  raw: Record<string, any>;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FORM_LINKS = [
  { label: 'Pre-Primary to Higher Secondary', path: '/preprimarytohigher', icon: '🏫' },
  { label: 'College Admission Counselling',   path: '/collegeadmission', icon: '🎓' },
  { label: 'Career Guidance & Streams',       path: '/careerguidance', icon: '🧭' },
  { label: 'Personalized Student Support',    path: '/personalizedcounseling', icon: '🤝' },
];

const STATUS_COLORS: Record<string, string> = {
  Solved:          'bg-emerald-100 text-emerald-700',
  Admitted:        'bg-emerald-100 text-emerald-700',
  Selected:        'bg-emerald-100 text-emerald-700',
  Pending:         'bg-amber-100 text-amber-700',
  'Under Review':  'bg-blue-100 text-blue-700',
};
const statusColor = (s: string) => STATUS_COLORS[s] || 'bg-gray-100 text-gray-600';

const fmtDate = (iso: string) =>
  iso ? new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

// ─── Fetch all forms for logged-in user via /myforms ─────────────────────────
// Backend ka GET /myforms route use karta hai jo email se filter karta hai
// Yeh route protect middleware se secured hai — token chahiye
// app.js mein: app.use("/myforms", require("./routes/myFormsRoute"));

const fetchAllForms = async (_email: string): Promise<AppRecord[]> => {
  // Single API call — backend khud email filter karta hai req.user.email se
  const res = await axiosInstance.get('/myforms/');
  const data: any[] = res.data?.data ?? [];
  return data; // Already sorted newest-first by backend
};

// ─── New Application Modal ────────────────────────────────────────────────────

const NewApplicationModal = ({
  onClose,
  onNavigate,
}: {
  onClose: () => void;
  onNavigate: (path: string) => void;
}) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
      <div className="bg-blue-600 px-6 py-5 flex justify-between items-center">
        <div>
          <h3 className="text-white font-bold text-lg">New Application</h3>
          <p className="text-blue-200 text-xs mt-0.5">Choose a form to fill</p>
        </div>
        <button onClick={onClose} className="text-blue-200 hover:text-white p-1 rounded-full hover:bg-blue-700 transition">
          <X size={20} />
        </button>
      </div>
      <div className="p-5 space-y-3">
        {FORM_LINKS.map((form) => (
          <button
            key={form.path}
            onClick={() => onNavigate(form.path)}
            className="w-full flex items-center justify-between px-5 py-4 rounded-xl border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition group text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{form.icon}</span>
              <span className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">
                {form.label}
              </span>
            </div>
            <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-500" />
          </button>
        ))}
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState('My Profile');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showNewAppModal, setShowNewAppModal] = useState(false);

  // Profile state
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    name: 'Guest User',
    id: 'STU-0000',
    email: 'not-logged-in@example.com',
    course: 'Not Assigned',
    phone: '',
    address: '',
    role: 'student',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileError, setProfileError] = useState('');

  // Applications state
  const [myApplications, setMyApplications] = useState<AppRecord[]>([]);
  const [appsLoading, setAppsLoading] = useState(true);
  const [appsError, setAppsError] = useState('');

  // Chat state
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I am your counselor. How can I help you today?', sender: 'counselor' },
  ]);

  // ── Load user from localStorage ──────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        setStudentInfo({
          name:    u.fullName || u.name || 'Guest User',
          email:   u.email    || '',
          id:      u._id      || u.id || 'STU-0000',
          course:  u.course   || 'Not Assigned',
          phone:   u.phone    || '',
          address: u.address  || '',
          role:    u.role     || 'student',
        });
      } catch (_) {}
    }
  }, []);

  // ── Also fetch fresh profile from backend (to get phone if saved) ─────────
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    axiosInstance
      .get('/auth/profile')
      .then((res) => {
        const u = res.data;
        setStudentInfo((prev) => ({
          ...prev,
          name:  u.name  || prev.name,
          phone: u.phone || prev.phone,
          email: u.email || prev.email,
          id:    u._id   || prev.id,
          role:  u.role  || prev.role,
        }));
        // Update localStorage too
        const saved = localStorage.getItem('user');
        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            localStorage.setItem('user', JSON.stringify({ ...parsed, phone: u.phone }));
          } catch (_) {}
        }
      })
      .catch(() => {/* silently ignore */});
  }, []);

  // ── Fetch all applications ───────────────────────────────────────────────
  const loadApplications = useCallback(async (email: string) => {
    if (!email || email === 'not-logged-in@example.com') return;
    setAppsLoading(true);
    setAppsError('');
    try {
      const data = await fetchAllForms(email);
      setMyApplications(data);
    } catch (err: any) {
      setAppsError('Could not load applications. Please try again.');
    } finally {
      setAppsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (studentInfo.email && studentInfo.email !== 'not-logged-in@example.com') {
      loadApplications(studentInfo.email);
    }
  }, [studentInfo.email, loadApplications]);

  // ── Save Profile (with phone) ────────────────────────────────────────────
  const handleSaveProfile = async () => {
    setProfileSaving(true);
    setProfileError('');
    try {
      const res = await axiosInstance.put('/auth/profile', {
        name:  studentInfo.name,
        phone: studentInfo.phone,
      });
      // Update localStorage with new data
      const saved = localStorage.getItem('user');
      if (saved) {
        const parsed = JSON.parse(saved);
        localStorage.setItem(
          'user',
          JSON.stringify({ ...parsed, name: res.data.name, phone: res.data.phone })
        );
      }
      setIsEditing(false);
    } catch (err: any) {
      setProfileError(err?.response?.data?.message || 'Profile update failed. Please try again.');
    } finally {
      setProfileSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
    window.location.reload();
  };

  const handleInputChange = (field: string, value: string) => {
    setStudentInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    setMessages((prev) => [...prev, { id: prev.length + 1, text: chatInput, sender: 'student' }]);
    setChatInput('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) alert(`File "${file.name}" selected for upload.`);
  };

  // Navigate to form + refresh applications on return
  const handleNavigateToForm = (path: string) => {
    setShowNewAppModal(false);
    navigate(path);
    // After user comes back, refresh applications
    // We store a flag so on focus we refresh
    sessionStorage.setItem('refreshApps', '1');
  };

  // Refresh when user comes back from form page
  useEffect(() => {
    const onFocus = () => {
      if (sessionStorage.getItem('refreshApps') === '1') {
        sessionStorage.removeItem('refreshApps');
        loadApplications(studentInfo.email);
      }
    };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, [studentInfo.email, loadApplications]);

  const solved = myApplications.filter(
    (a) => ['Solved', 'Admitted', 'Selected'].includes(a.status)
  ).length;

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex h-screen bg-slate-50 font-sans">

      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-2 text-blue-600 font-bold text-xl border-b">
          <GraduationCap size={26} />
          <span>Student Portal</span>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { id: 'My Profile',      icon: <User size={18} /> },
            { id: 'My Applications', icon: <FileText size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              {tab.icon} {tab.id}
            </button>
          ))}
          <button
            onClick={() => setIsChatOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-all"
          >
            <MessageSquare size={18} /> Support Chat
          </button>
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl transition shadow"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white px-8 py-4 shadow-sm flex justify-between items-center shrink-0">
          <h2 className="text-xl font-bold text-slate-800">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800">{studentInfo.name}</p>
              <p className="text-[10px] text-slate-400">{studentInfo.email}</p>
            </div>
            <Bell className="text-slate-400 cursor-pointer" size={20} />
            <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow uppercase">
              {studentInfo.name.charAt(0)}
            </div>
          </div>
        </header>

        <main className="p-8 overflow-y-auto flex-1">

          {/* ── MY PROFILE ── */}
          {activeTab === 'My Profile' && (
            <div className="space-y-6 max-w-10xl">
              {/* Avatar card */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-6 relative">
                <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-3xl font-black border-4 border-white shadow-md uppercase">
                  {studentInfo.name.charAt(0)}
                </div>
                <div className="text-center md:text-left space-y-1">
                  <h3 className="text-xl font-bold text-slate-800">{studentInfo.name}</h3>
                  <p className="text-slate-500 text-sm">{studentInfo.email}</p>
                  <span className="inline-block mt-1 px-3 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                    Profile Active
                  </span>
                </div>
                <button
                  onClick={() => {
                    if (isEditing) handleSaveProfile();
                    else setIsEditing(true);
                  }}
                  disabled={profileSaving}
                  className={`md:absolute top-8 right-8 flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-sm transition shadow-sm disabled:opacity-60 ${
                    isEditing
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  {profileSaving
                    ? <><RefreshCw size={14} className="animate-spin" /> Saving…</>
                    : isEditing
                    ? <><Save size={15} /> Save Profile</>
                    : 'Edit Profile'}
                </button>
              </div>

              {/* Error banner */}
              {profileError && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                  <AlertCircle size={15} /> {profileError}
                </div>
              )}

              {/* Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                  <h4 className="font-bold text-slate-700 border-b pb-2 text-xs uppercase tracking-wider">
                    Contact Details
                  </h4>
                  <EditableInfo
                    icon={<Mail size={17} />} label="Email Address" field="email"
                    value={studentInfo.email} isEditing={false} onChange={handleInputChange}
                  />
                  <EditableInfo
                    icon={<Phone size={17} />} label="Phone Number" field="phone"
                    value={studentInfo.phone || (isEditing ? '' : 'Not added yet')}
                    isEditing={isEditing} onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                  />
                  <EditableInfo
                    icon={<MapPin size={17} />} label="Address" field="address"
                    value={studentInfo.address || (isEditing ? '' : 'Not added yet')}
                    isEditing={isEditing} onChange={handleInputChange}
                    isTextArea placeholder="Your city / full address"
                  />
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
                  <h4 className="font-bold text-slate-700 border-b pb-2 text-xs uppercase tracking-wider">
                    Account Info
                  </h4>
                  <EditableInfo
                    icon={<BookOpen size={17} />} label="Account ID" field="id"
                    value={studentInfo.id} isEditing={false} onChange={handleInputChange}
                  />
                  <EditableInfo
                    icon={<User size={17} />} label="Role" field="role"
                    value={studentInfo.role} isEditing={false} onChange={handleInputChange}
                  />
                  <EditableInfo
                    icon={<GraduationCap size={17} />} label="Course / Programme" field="course"
                    value={studentInfo.course || (isEditing ? '' : 'Not assigned')}
                    isEditing={isEditing} onChange={handleInputChange}
                    placeholder="e.g. B.Tech CSE"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── MY APPLICATIONS ── */}
          {activeTab === 'My Applications' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-5">
                <div className="bg-blue-600 p-6 rounded-2xl text-white shadow">
                  <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider">Total Applied</p>
                  <h3 className="text-3xl font-black mt-1">{String(myApplications.length).padStart(2, '0')}</h3>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Pending</p>
                    <h3 className="text-3xl font-black text-slate-800 mt-1">
                      {String(myApplications.length - solved).padStart(2, '0')}
                    </h3>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl">
                    <Clock size={22} className="text-amber-500" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Completed</p>
                    <h3 className="text-3xl font-black text-slate-800 mt-1">
                      {String(solved).padStart(2, '0')}
                    </h3>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl">
                    <CheckCircle size={22} className="text-emerald-500" />
                  </div>
                </div>
              </div>

              {/* Application History Table */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                  <h3 className="font-bold text-slate-800 text-sm">Application History</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => loadApplications(studentInfo.email)}
                      title="Refresh"
                      className="p-2 rounded-lg hover:bg-slate-200 text-slate-400 transition"
                    >
                      <RefreshCw size={15} className={appsLoading ? 'animate-spin' : ''} />
                    </button>
                    <button
                      onClick={() => setShowNewAppModal(true)}
                      className="flex items-center gap-1.5 text-blue-600 text-sm font-bold bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
                    >
                      <Plus size={15} /> New Application
                    </button>
                  </div>
                </div>

                {appsError && (
                  <div className="flex items-center gap-2 bg-red-50 border-b border-red-100 text-red-600 px-6 py-3 text-sm">
                    <AlertCircle size={14} /> {appsError}
                    <button
                      onClick={() => loadApplications(studentInfo.email)}
                      className="ml-auto font-semibold underline hover:no-underline"
                    >
                      Retry
                    </button>
                  </div>
                )}

                {appsLoading ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
                    <RefreshCw size={24} className="animate-spin text-blue-400" />
                    <p className="text-sm">Loading your applications…</p>
                  </div>
                ) : myApplications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-slate-400">
                    <GraduationCap size={36} className="text-slate-300" />
                    <p className="text-sm font-medium">No applications found.</p>
                    <button
                      onClick={() => setShowNewAppModal(true)}
                      className="flex items-center gap-1.5 text-blue-600 text-sm font-bold bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 mt-1"
                    >
                      <Plus size={14} /> Start your first application
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
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
                        {myApplications.map((app) => (
                          <tr key={app._id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                              {fmtDate(app.createdAt)}
                            </td>
                            <td className="px-6 py-4 font-semibold text-slate-700">
                              {app.label}
                            </td>
                            <td className="px-6 py-4 text-slate-500 max-w-[200px] truncate">
                              {app.detail}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${statusColor(app.status)}`}>
                                {app.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Upload Documents */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm">
                  <FileText size={17} className="text-blue-600" /> Upload Documents
                </h3>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-200 rounded-xl p-10 text-center hover:border-blue-400 transition cursor-pointer group"
                >
                  <Paperclip className="mx-auto text-slate-300 mb-2 group-hover:text-blue-500" size={28} />
                  <p className="text-slate-500 text-sm font-medium">Click to upload marksheet / documents</p>
                  <p className="text-slate-400 text-xs mt-1">PNG, JPG or PDF accepted</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── CHAT POPUP ── */}
      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white shadow-2xl rounded-2xl border border-slate-200 overflow-hidden z-50">
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center font-bold text-xs border border-blue-300">
                AD
              </div>
              <p className="font-bold text-xs">Support Team</p>
            </div>
            <button onClick={() => setIsChatOpen(false)}><X size={20} /></button>
          </div>
          <div className="h-64 p-4 bg-slate-50 overflow-y-auto text-xs space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-2xl max-w-[85%] shadow-sm ${
                  msg.sender === 'student'
                    ? 'bg-blue-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-700 rounded-tl-none border'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 bg-white border-t flex gap-2">
            <input
              type="text"
              placeholder="Type message…"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 bg-slate-100 rounded-xl px-4 py-2 text-xs focus:ring-1 ring-blue-500 outline-none"
            />
            <button onClick={handleSendMessage} className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition">
              <Send size={17} />
            </button>
          </div>
        </div>
      )}

      {/* ── NEW APPLICATION MODAL ── */}
      {showNewAppModal && (
        <NewApplicationModal
          onClose={() => setShowNewAppModal(false)}
          onNavigate={handleNavigateToForm}
        />
      )}
    </div>
  );
};

// ─── Helper components ────────────────────────────────────────────────────────

const EditableInfo = ({
  icon, label, value, isEditing, onChange, field, isTextArea, placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isEditing: boolean;
  onChange: (field: string, value: string) => void;
  field: string;
  isTextArea?: boolean;
  placeholder?: string;
}) => (
  <div className="flex items-start gap-4">
    <div className="p-2 bg-slate-50 rounded-lg text-slate-400 mt-1 shrink-0">{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      {isEditing ? (
        isTextArea ? (
          <textarea
            className="w-full bg-slate-50 border border-blue-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 ring-blue-400"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(field, e.target.value)}
            rows={3}
          />
        ) : (
          <input
            className="w-full bg-slate-50 border border-blue-200 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 ring-blue-400"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(field, e.target.value)}
          />
        )
      ) : (
        <p className="text-sm font-semibold text-slate-700 truncate">{value || '—'}</p>
      )}
    </div>
  </div>
);

export default StudentDashboard;