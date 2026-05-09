import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Student API calls
export const getStudents = () => {
  return axios.get(`${API_BASE_URL}/students`);
};

export const getStudent = (studentId) => {
  return axios.get(`${API_BASE_URL}/students/${studentId}`);
};

export const createStudent = (studentData) => {
  return axios.post(`${API_BASE_URL}/students`, studentData);
};

export const updateStudent = (studentId, studentData) => {
  return axios.put(`${API_BASE_URL}/students/${studentId}`, studentData);
};

export const deleteStudent = (studentId) => {
  return axios.delete(`${API_BASE_URL}/students/${studentId}`);
};

// Course API calls
export const getCourses = () => {
  return axios.get(`${API_BASE_URL}/courses`);
};

export const createCourse = (courseData) => {
  return axios.post(`${API_BASE_URL}/courses`, courseData);
};

// Enrollment API calls
export const getEnrollments = () => {
  return axios.get(`${API_BASE_URL}/enrollments`);
};

export const enrollStudent = (enrollmentData) => {
  return axios.post(`${API_BASE_URL}/enrollments`, enrollmentData);
};

export const deleteEnrollment = (enrollmentId) => {
  return axios.delete(`${API_BASE_URL}/enrollments/${enrollmentId}`);
};

export const getStudentCourses = (studentId) => {
  return axios.get(`${API_BASE_URL}/students/${studentId}/courses`);
};
