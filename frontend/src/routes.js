// src/routes.js

import { Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import RegisterWelcome from './components/auth/RegisterWelcome';
import RegisterTeacher from './components/auth/RegisterTeacher';
import RegisterUser from './components/auth/RegisterUser';
import AdminLogin from './components/auth/AdminLogin';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import StudentReports from './components/reports/StudentReports';
import ParentReports from './components/reports/ParentReports';
import CalendarPage from './pages/CalendarPage';
import MessagesPage from './pages/MessagesPage';

const routes = [
  {
    path: "/register",
    element: <RegisterWelcome /> // 👈 welcome screen with choices
  },
  {
    path: "/register/teacher",
    element: <RegisterTeacher />
  },
  {
    path: "/register/user",
    element: <RegisterUser />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/admin/login',
    element: <AdminLogin />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardPage /></ProtectedRoute>
  },
  {
    path: '/student-reports',
    element: <ProtectedRoute><StudentReports /></ProtectedRoute>
  },
  {
    path: '/parent-reports',
    element: <ProtectedRoute><ParentReports /></ProtectedRoute>
  },
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />
  },
  {
  path: '/calendar',
  element: <ProtectedRoute><CalendarPage /></ProtectedRoute>
},
{
  path: '/messages',
  element: <ProtectedRoute><MessagesPage /></ProtectedRoute>
},

];

export default routes;
