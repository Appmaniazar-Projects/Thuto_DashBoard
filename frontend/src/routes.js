// src/routes.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import StudentReports from './components/reports/StudentReports';
import ParentReports from './components/reports/ParentReports';

const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardPage /></ProtectedRoute>,
  },
  {
    path: '/student-reports',
    element: <ProtectedRoute><StudentReports /></ProtectedRoute>,
  },
  {
    path: '/parent-reports',
    element: <ProtectedRoute><ParentReports /></ProtectedRoute>,
  },
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  }
];

export default routes;