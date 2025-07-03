// src/pages/DashboardPage.js
import React from 'react';
import { Typography } from '@mui/material';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';

// Role-specific dashboards
import AdminDashboard from '../components/dashboard/AdminDashboard';
import TeacherDashboard from '../components/dashboard/TeacherDashboard';
import ParentDashboard from '../components/dashboard/ParentDashboard';
import StudentDashboard from '../components/dashboard/StudentDashboard';

const DashboardPage = () => {
  const { user} = useAuth();

  const renderDashboard = () => {
    if (!user){
      return (
        <Typography variant="h5" align="center" sx={{ mt: 4 }}>
          Please log in to view your dashboard.
        </Typography>
      );
    }

    switch (user.role?.toLowerCase()) {
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
