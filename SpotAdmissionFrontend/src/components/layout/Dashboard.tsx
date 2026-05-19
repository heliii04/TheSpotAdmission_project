import React from 'react';
import StudentDashboard from './UserDashboard'; // Tamari student file no path
import AdminDashboard from './AdminDashboard';     // Tamari admin file no path
import { Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const savedUser = localStorage.getItem("user");
  
  if (!savedUser) {
    return <Navigate to="/login" />;
  }

  const userData = JSON.parse(savedUser);

  // Role check logic
  if (userData.role === 'admin') {
    return <AdminDashboard />;
  } else {
    return <StudentDashboard />;
  }
};

export default Dashboard;