import React from 'react';
import { Typography } from '@mui/material';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';

// Import role-specific dashboard components
import AdminDashboard from '../components/dashboard/AdminDashboard';
import TeacherDashboard from '../components/dashboard/TeacherDashboard';
import ParentDashboard from '../components/dashboard/ParentDashboard';
import StudentDashboard from '../components/dashboard/StudentDashboard';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  
  // Render the appropriate dashboard based on user role
  const renderDashboard = () => {
    if (!currentUser) {
      return (
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          Please log in to view your dashboard.
        </Typography>
      );
    }

    switch (currentUser.role?.toLowerCase()) {
      case 'admin':
      case 'administrator':
        return <AdminDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'parent':
        return <ParentDashboard />;
      case 'student':
        return <StudentDashboard />;
      default:
        return (
          <Typography variant="h5" align="center" sx={{ mt: 4 }}>
            Dashboard not available for your role: {currentUser.role || 'Unknown'}
          </Typography>
        );
    }
  };
  
  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
};

export default DashboardPage;