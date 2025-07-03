import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminMessages from '../components/messages/AdminMessages';
import TeacherMessages from '../components/messages/TeacherMessages';
import ParentMessages from '../components/messages/ParentMessages';
import StudentMessages from '../components/messages/StudentMessages';

const MessagesPage = () => {
  const { currentUser } = useAuth();

  switch (currentUser?.role?.toLowerCase()) {
    case 'admin': return <AdminMessages />;
    case 'teacher': return <TeacherMessages />;
    case 'parent': return <ParentMessages />;
    case 'student': return <StudentMessages />;
    default: return <div>Access Denied</div>;
  }
};

export default MessagesPage;
