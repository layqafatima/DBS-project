import React, { useState } from 'react';
import EnrollmentForm from './components/EnrollmentForm';
import StudentList from './components/StudentList';
import CourseList from './components/CourseList';
import EnrollmentList from './components/EnrollmentList';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('enroll');
  return (
    <div className="App">
      <header className="app-header">
        <h1>Student Enrollment System</h1>
        <nav className="nav-tabs">
          <button
            className={`tab-button ${activeTab === 'enroll' ? 'active' : ''}`}
            onClick={() => setActiveTab('enroll')}
          >
            Enroll Student
          </button>
          <button
            className={`tab-button ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            View Students
          </button>
          <button
            className={`tab-button ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            Courses
          </button>
          <button
            className={`tab-button ${activeTab === 'enrollments' ? 'active' : ''}`}
            onClick={() => setActiveTab('enrollments')}
          >
            Enrollments
          </button>
        </nav>
      </header>
      <main className="app-main">
        {activeTab === 'enroll' && <EnrollmentForm />}
        {activeTab === 'list' && <StudentList />}
        {activeTab === 'courses' && <CourseList />}
        {activeTab === 'enrollments' && <EnrollmentList />}
      </main>
      <footer className="app-footer">
        <p>&copy; 2026 Student Enrollment System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;