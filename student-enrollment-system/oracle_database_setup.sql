-- Oracle SQL Developer Database Setup Script
-- Creates complete student enrollment system database

-- Drop existing tables if they exist
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE enrollments';
EXCEPTION
   WHEN OTHERS THEN NULL;
END;
/

BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE students';
EXCEPTION
   WHEN OTHERS THEN NULL;
END;
/

BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE courses';
EXCEPTION
   WHEN OTHERS THEN NULL;
END;
/

-- Drop existing sequences
BEGIN
   EXECUTE IMMEDIATE 'DROP SEQUENCE students_seq';
EXCEPTION
   WHEN OTHERS THEN NULL;
END;
/

BEGIN
   EXECUTE IMMEDIATE 'DROP SEQUENCE courses_seq';
EXCEPTION
   WHEN OTHERS THEN NULL;
END;
/

BEGIN
   EXECUTE IMMEDIATE 'DROP SEQUENCE enrollments_seq';
EXCEPTION
   WHEN OTHERS THEN NULL;
END;
/

-- Create Sequences for Auto-increment
CREATE SEQUENCE students_seq
    START WITH 1
    INCREMENT BY 1
    NOMAXVALUE;
/

CREATE SEQUENCE courses_seq
    START WITH 1
    INCREMENT BY 1
    NOMAXVALUE;
/

CREATE SEQUENCE enrollments_seq
    START WITH 1
    INCREMENT BY 1
    NOMAXVALUE;
/

-- Create Students Table
CREATE TABLE students (
    id NUMBER PRIMARY KEY,
    first_name VARCHAR2(100) NOT NULL,
    last_name VARCHAR2(100) NOT NULL,
    email VARCHAR2(120) NOT NULL UNIQUE,
    phone VARCHAR2(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR2(10) NOT NULL,
    address VARCHAR2(255) NOT NULL,
    city VARCHAR2(100) NOT NULL,
    state VARCHAR2(100) NOT NULL,
    postal_code VARCHAR2(20) NOT NULL,
    program VARCHAR2(100) NOT NULL,
    enrollment_date TIMESTAMP DEFAULT SYSDATE,
    status VARCHAR2(50) DEFAULT 'Active'
);

-- Create indexes on students table
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_enrollment_date ON students(enrollment_date);
CREATE INDEX idx_students_status ON students(status);
CREATE INDEX idx_students_program ON students(program);

-- Create Courses Table
CREATE TABLE courses (
    id NUMBER PRIMARY KEY,
    course_code VARCHAR2(20) NOT NULL UNIQUE,
    course_name VARCHAR2(200) NOT NULL,
    description CLOB,
    credits NUMBER(2) NOT NULL,
    capacity NUMBER(3) NOT NULL
);

-- Create indexes on courses table
CREATE INDEX idx_courses_code ON courses(course_code);

-- Create Enrollments Table (Junction Table for Many-to-Many)
CREATE TABLE enrollments (
    id NUMBER PRIMARY KEY,
    student_id NUMBER NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    course_id NUMBER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
    enrollment_date TIMESTAMP DEFAULT SYSDATE,
    grade VARCHAR2(2),
    CONSTRAINT unique_enrollment UNIQUE (student_id, course_id)
);

-- Create indexes on enrollments table
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
CREATE INDEX idx_enrollments_date ON enrollments(enrollment_date);

-- Create Triggers for Auto-increment Sequences

-- Trigger for students table
CREATE OR REPLACE TRIGGER students_trigger
BEFORE INSERT ON students
FOR EACH ROW
BEGIN
    IF :NEW.id IS NULL THEN
        SELECT students_seq.NEXTVAL INTO :NEW.id FROM dual;
    END IF;
END;
/

-- Trigger for courses table
CREATE OR REPLACE TRIGGER courses_trigger
BEFORE INSERT ON courses
FOR EACH ROW
BEGIN
    IF :NEW.id IS NULL THEN
        SELECT courses_seq.NEXTVAL INTO :NEW.id FROM dual;
    END IF;
END;
/

-- Trigger for enrollments table
CREATE OR REPLACE TRIGGER enrollments_trigger
BEFORE INSERT ON enrollments
FOR EACH ROW
BEGIN
    IF :NEW.id IS NULL THEN
        SELECT enrollments_seq.NEXTVAL INTO :NEW.id FROM dual;
    END IF;
END;
/

-- Insert Sample Courses
INSERT INTO courses (id, course_code, course_name, description, credits, capacity)
VALUES (courses_seq.NEXTVAL, 'CS101', 'Introduction to Computer Science', 
        'Fundamentals of computer science and programming', 3, 30);

INSERT INTO courses (id, course_code, course_name, description, credits, capacity)
VALUES (courses_seq.NEXTVAL, 'CS102', 'Data Structures', 
        'Study of various data structures and algorithms', 3, 25);

INSERT INTO courses (id, course_code, course_name, description, credits, capacity)
VALUES (courses_seq.NEXTVAL, 'CS201', 'Web Development', 
        'Full-stack web development with React and Node.js', 4, 20);

INSERT INTO courses (id, course_code, course_name, description, credits, capacity)
VALUES (courses_seq.NEXTVAL, 'MATH101', 'Calculus I', 
        'Introduction to differential and integral calculus', 4, 35);

INSERT INTO courses (id, course_code, course_name, description, credits, capacity)
VALUES (courses_seq.NEXTVAL, 'MATH102', 'Linear Algebra', 
        'Foundations of linear algebra and matrix theory', 3, 30);

INSERT INTO courses (id, course_code, course_name, description, credits, capacity)
VALUES (courses_seq.NEXTVAL, 'BUS101', 'Business Fundamentals', 
        'Introduction to business management and economics', 3, 40);

INSERT INTO courses (id, course_code, course_name, description, credits, capacity)
VALUES (courses_seq.NEXTVAL, 'BUS201', 'Marketing Principles', 
        'Core concepts of marketing and consumer behavior', 3, 35);

INSERT INTO courses (id, course_code, course_name, description, credits, capacity)
VALUES (courses_seq.NEXTVAL, 'ENG101', 'English Composition', 
        'Academic writing and communication skills', 3, 25);

COMMIT;

-- Display Verification Messages
SELECT 'Database setup completed successfully!' as Status FROM dual;
SELECT table_name FROM user_tables WHERE table_name IN ('STUDENTS', 'COURSES', 'ENROLLMENTS');
SELECT COUNT(*) as course_count FROM courses;

-- Enable output
SET ECHO ON;
SELECT * FROM enrollments;
