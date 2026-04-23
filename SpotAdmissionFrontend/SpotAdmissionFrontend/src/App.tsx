import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Counselling from './pages/Counselling';
import Admissions from './pages/Admissions';
import Directory from './pages/Directory';
import VirtualTour from './pages/VirtualTour';
import Podcasts from './pages/Podcasts';
import Blog from './pages/Blog';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import AdmissionForm from './forms/AdmissionForm.tsx';
import CounsellingForm from './pages/CounsellingForm';
// import Register from './components/Register.tsx';
import Login from './components/Login.tsx';
import ForgotPassword from "./components/ForgotPassword.tsx";
import ResetPassword from "./components/ResetPassword.tsx";
import Dashboard from './components/layout/Dashboard.tsx';
// import AdminApplicationTable from "./components/layout/AdminApplicationTable.tsx";
import CollegeAdmissionForm from './forms/CollegeAdmissionForm';
import PrePrimarytoHigherForm from './forms/PrePrimarytoHigherForm';
import PersonalizedCounselingForm from './forms/PersonalizedCounselingForm';
import CounselingAppointmentForm from './forms/CounselingAppointmentForm';
import CareerGuidanceForm from './forms/CareerGuidanceForm';

// tables 
import CareerTable from './forms/CareerTable';
import CollegeAdmissionTable from './forms/CollegeAdmissionTable';
import CounselingTable from './forms/CounselingAppointmentTable';
import PersonalizedCounselingTable from './forms/PersonalizedCounselingTable';
import PrePrimaryTable from './forms/PrePrimarytoHigherTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ToastContainer position="top-right" autoClose={3000} />
        <Header />
        <main>
          <Routes>

            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/login" element={<Login />} />     
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/admin/applications" element={<AdminApplicationTable />} /> */}
            {/* <Route path="/AdminApplicationTable" element={<AdminApplicationTable />} /> */}
            <Route path="/college-admission" element={<AdmissionForm />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/counselling" element={<Counselling />} />
            <Route path="/counsellingform" element={<CounsellingForm />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/virtual-tour" element={<VirtualTour />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/content" element={<Blog />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            {/* forms  */}
            <Route path="/preprimarytohigher" element={<PrePrimarytoHigherForm />} />
            <Route path="/collegeadmission" element={<CollegeAdmissionForm />} />
            <Route path="/careerguidance" element={<CareerGuidanceForm />} />
            <Route path="/personalizedcounseling" element={<PersonalizedCounselingForm />} />
            <Route path="/counselingappointment" element={<CounselingAppointmentForm  />} />
           {/* tables  */}
            <Route path="/careertable" element={<CareerTable />} />
            <Route path="/collegeadmissiontable" element={<CollegeAdmissionTable />} />
            <Route path="/counselingtable" element={<CounselingTable />} />
            <Route path="/personalizedcounselingtable" element={<PersonalizedCounselingTable />} />
            <Route path="/preprimarytable" element={<PrePrimaryTable />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
