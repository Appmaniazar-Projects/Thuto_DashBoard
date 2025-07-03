import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminCalendar from '../components/calendar/AdminCalendar';
import TeacherCalendar from '../components/calendar/TeacherCalendar';
import ParentCalendar from '../components/calendar/ParentCalendar';
import StudentCalendar from '../components/calendar/StudentCalendar';

const CalendarPage = () => {
  const { currentUser } = useAuth();

  switch (currentUser?.role?.toLowerCase()) {
    case 'admin': return <AdminCalendar />;
    case 'teacher': return <TeacherCalendar />;
    case 'parent': return <ParentCalendar />;
    case 'student': return <StudentCalendar />;
    default: return <div>Access Denied</div>;
  }
};

export default CalendarPage;
