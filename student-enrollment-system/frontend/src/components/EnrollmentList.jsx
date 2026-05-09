import React, { useState, useEffect } from 'react';
import { getEnrollments, getStudents, getCourses, enrollStudent, deleteEnrollment } from '../services/api';

function EnrollmentList() {
  const [enrollments, setEnrollments] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ student_id: '', course_id: '' });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [e, s, c] = await Promise.all([getEnrollments(), getStudents(), getCourses()]);
      setEnrollments(e.data);
      setStudents(s.data);
      setCourses(c.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load data');
      setLoading(false);
    }
  };

  const getStudentName = (enrollment) => {
    if (enrollment.student) {
      return `${enrollment.student.first_name} ${enrollment.student.last_name}`;
    }
    const found = students.find(s => s.id === enrollment.student_id);
    return found ? `${found.first_name} ${found.last_name}` : `Student #${enrollment.student_id}`;
  };

  const getCourseInfo = (enrollment) => {
    if (enrollment.course) {
      return `${enrollment.course.course_code} - ${enrollment.course.course_name}`;
    }
    const found = courses.find(c => c.id === enrollment.course_id);
    return found ? `${found.course_code} - ${found.course_name}` : `Course #${enrollment.course_id}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await enrollStudent({
        student_id: parseInt(formData.student_id),
        course_id: parseInt(formData.course_id)
      });
      setMessage('Student enrolled in course successfully!');
      setFormData({ student_id: '', course_id: '' });
      setShowForm(false);
      fetchAll();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to enroll student');
    }
  };

  const handleDelete = async (enrollmentId) => {
    if (!window.confirm('Remove this enrollment?')) return;
    try {
      await deleteEnrollment(enrollmentId);
      setMessage('Enrollment removed successfully!');
      fetchAll();
    } catch (err) {
      setError('Failed to remove enrollment');
    }
  };

  if (loading) return <div className="loading">Loading enrollments...</div>;

  return (
    <div className="container">
      <div className="section-header">
        <h2>Enrollments</h2>
        <button className="btn-primary" onClick={() => { setShowForm(!showForm); setError(''); setMessage(''); }}>
          {showForm ? 'Cancel' : '+ Add Enrollment'}
        </button>
      </div>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="form-container">
          <h3>Enroll Student in Course</h3>
          <div className="form-group">
            <label>Select Student</label>
            <select
              value={formData.student_id}
              onChange={e => setFormData({ ...formData, student_id: e.target.value })}
              required
            >
              <option value="">-- Select Student --</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>
                  {s.first_name} {s.last_name} ({s.email})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Select Course</label>
            <select
              value={formData.course_id}
              onChange={e => setFormData({ ...formData, course_id: e.target.value })}
              required
            >
              <option value="">-- Select Course --</option>
              {courses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.course_code} - {c.course_name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-primary">Enroll</button>
        </form>
      )}

      {enrollments.length === 0 ? (
        <p style={{ marginTop: '20px', opacity: 0.8 }}>No enrollments found. Add one to get started.</p>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th>Enrollment ID</th>
              <th>Student Name</th>
              <th>Course</th>
              <th>Enrollment Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {enrollments.map(enrollment => (
              <tr key={enrollment.id}>
                <td>{enrollment.id}</td>
                <td>{getStudentName(enrollment)}</td>
                <td>{getCourseInfo(enrollment)}</td>
                <td>{enrollment.enrollment_date}</td>
                <td>
                  <button className="btn-danger" onClick={() => handleDelete(enrollment.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EnrollmentList;