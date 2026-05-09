-- Create Database
CREATE DATABASE IF NOT EXISTS student_enrollment;
USE student_enrollment;

-- Create Students Table
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(120) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  date_of_birth DATE NOT NULL,
  gender VARCHAR(10) NOT NULL,
  address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  program VARCHAR(100) NOT NULL,
  enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'Active',
  INDEX idx_email (email),
  INDEX idx_enrollment_date (enrollment_date)
);

-- Create Courses Table
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  course_code VARCHAR(20) UNIQUE NOT NULL,
  course_name VARCHAR(200) NOT NULL,
  description TEXT,
  credits INT NOT NULL,
  capacity INT NOT NULL,
  INDEX idx_course_code (course_code)
);

-- Create Enrollments Table (Many-to-Many relationship)
CREATE TABLE IF NOT EXISTS enrollments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  enrollment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  grade VARCHAR(2),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  UNIQUE KEY unique_enrollment (student_id, course_id),
  INDEX idx_student_id (student_id),
  INDEX idx_course_id (course_id)
);

-- Insert Sample Data for Courses
INSERT INTO courses (course_code, course_name, description, credits, capacity) VALUES
('CS101', 'Introduction to Computer Science', 'Fundamentals of computer science and programming', 3, 30),
('CS102', 'Data Structures', 'Study of various data structures and algorithms', 3, 25),
('CS201', 'Web Development', 'Full-stack web development with React and Node.js', 4, 20),
('MATH101', 'Calculus I', 'Introduction to differential and integral calculus', 4, 35),
('MATH102', 'Linear Algebra', 'Foundations of linear algebra and matrix theory', 3, 30),
('BUS101', 'Business Fundamentals', 'Introduction to business management and economics', 3, 40),
('BUS201', 'Marketing Principles', 'Core concepts of marketing and consumer behavior', 3, 35),
('ENG101', 'English Composition', 'Academic writing and communication skills', 3, 25);

-- Create Indexes for Performance
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_students_program ON students(program);
CREATE INDEX idx_enrollments_date ON enrollments(enrollment_date);

-- Display table information
SELECT 'Database setup completed successfully!' as Status;
SHOW TABLES;
