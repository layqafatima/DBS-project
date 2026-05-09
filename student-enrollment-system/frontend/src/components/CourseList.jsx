import React, { useState, useEffect } from 'react';
import { getCourses, createCourse } from '../services/api';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    course_code: '',
    course_name: '',
    description: '',
    credits: '',
    capacity: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load courses');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCourse({
        ...formData,
        credits: parseInt(formData.credits),
        capacity: parseInt(formData.capacity)
      });
      setMessage('Course created successfully!');
      setFormData({ course_code: '', course_name: '', description: '', credits: '', capacity: '' });
      setShowForm(false);
      fetchCourses();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create course');
    }
  };

  if (loading) return <div className="loading">Loading courses...</div>;

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Courses</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Course'}
        </button>
      </div>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="form-container" style={{ marginBottom: '20px' }}>
          <h3>Add New Course</h3>
          <div className="form-group">
            <label>Course Code</label>
            <input name="course_code" value={formData.course_code} onChange={handleChange} required placeholder="e.g. CS101" />
          </div>
          <div className="form-group">
            <label>Course Name</label>
            <input name="course_name" value={formData.course_name} onChange={handleChange} required placeholder="e.g. Introduction to Computer Science" />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input name="description" value={formData.description} onChange={handleChange} placeholder="Optional" />
          </div>
          <div className="form-group">
            <label>Credits</label>
            <input name="credits" type="number" value={formData.credits} onChange={handleChange} required placeholder="e.g. 3" />
          </div>
          <div className="form-group">
            <label>Capacity</label>
            <input name="capacity" type="number" value={formData.capacity} onChange={handleChange} required placeholder="e.g. 30" />
          </div>
          <button type="submit" className="btn-primary">Create Course</button>
        </form>
      )}

      {courses.length === 0 ? (
        <p>No courses found. Add a course to get started.</p>
      ) : (
        <table className="students-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Course Name</th>
              <th>Credits</th>
              <th>Capacity</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <td>{course.course_code}</td>
                <td>{course.course_name}</td>
                <td>{course.credits}</td>
                <td>{course.capacity}</td>
                <td>{course.description || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CourseList;