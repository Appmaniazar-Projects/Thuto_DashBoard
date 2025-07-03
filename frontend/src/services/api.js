import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// ========== AUTH ENDPOINTS ==========
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
  verifyToken: () => api.get('/auth/verify')
};

// ========== ADMIN DASHBOARD ENDPOINTS ==========
export const adminAPI = {
  getEnrollmentStats: () => api.get('/admin/stats/enrollment'),
  getAttendanceStats: () => api.get('/admin/stats/attendance'),
  getStudents: () => api.get('/admin/students'),
  getCalendarEvents: () => api.get('/admin/calendar'),
  getMessages: () => api.get('/admin/messages'),
  getSystemStats: () => api.get('/admin/stats/system')
};

// ========== TEACHER ENDPOINTS ==========
export const teacherAPI = {
  getClasses: () => api.get('/teacher/classes'),
  getStudents: (classId) => api.get(`/teacher/classes/${classId}/students`),
  markAttendance: (attendanceData) => api.post('/teacher/attendance', attendanceData),
  getAttendance: (classId, date) => api.get(`/teacher/attendance/${classId}/${date}`),
  createAssignment: (assignmentData) => api.post('/teacher/assignments', assignmentData),
  getAssignments: () => api.get('/teacher/assignments'),
  gradeAssignment: (assignmentId, grades) => api.put(`/teacher/assignments/${assignmentId}/grades`, grades)
};

// ========== PARENT ENDPOINTS ==========
export const parentAPI = {
  getChildren: () => api.get('/parent/children'),
  getChildAttendance: (childId) => api.get(`/parent/children/${childId}/attendance`),
  getChildGrades: (childId) => api.get(`/parent/children/${childId}/grades`),
  getChildAssignments: (childId) => api.get(`/parent/children/${childId}/assignments`),
  getMessages: () => api.get('/parent/messages'),
  sendMessage: (messageData) => api.post('/parent/messages', messageData)
};

// ========== STUDENT ENDPOINTS ==========
export const studentAPI = {
  getProfile: () => api.get('/student/profile'),
  getAttendance: () => api.get('/student/attendance'),
  getGrades: () => api.get('/student/grades'),
  getAssignments: () => api.get('/student/assignments'),
  submitAssignment: (assignmentId, submission) => api.post(`/student/assignments/${assignmentId}/submit`, submission),
  getSchedule: () => api.get('/student/schedule')
};

// ========== COMMON ENDPOINTS ==========
export const commonAPI = {
  getEvents: () => api.get('/events'),
  getAnnouncements: () => api.get('/announcements'),
  getProfile: () => api.get('/profile'),
  updateProfile: (profileData) => api.put('/profile', profileData),
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
};

export default api;