# Project Report: Student Enrollment System

**Document Type:** Project Report  
**Version:** 1.0  
**Date:** May 10, 2026  

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [System Architecture](#system-architecture)
4. [Technology Stack](#technology-stack)
5. [Database Design](#database-design)
6. [Backend Implementation](#backend-implementation)
7. [Frontend Implementation](#frontend-implementation)
8. [API Documentation](#api-documentation)
9. [Features & Functionality](#features--functionality)
10. [Testing & Validation](#testing--validation)
11. [Challenges & Solutions](#challenges--solutions)
12. [Conclusion](#conclusion)

---

## 1. Executive Summary

The Student Enrollment System is a full-stack web application developed to streamline and digitize the process of managing student registrations, course offerings, and course enrollments for an educational institution. The system replaces manual, paper-based processes with an intuitive, browser-based interface backed by a robust REST API.

The application was built using a modern client-server architecture: a **React.js** single-page application on the frontend communicates with a **Flask (Python)** REST API on the backend, which persists data to an **Oracle Database (XE)**. The system supports full CRUD operations for students and courses, along with controlled enrollment management including capacity enforcement and duplicate-enrollment prevention.

---

## 2. Project Overview

### 2.1 Objectives

- Provide a centralized digital platform for enrolling and managing students.
- Enable administrative staff to add, view, update, and remove student records.
- Allow the creation and listing of courses with capacity management.
- Track student-to-course enrollments and prevent violations (duplicates, over-capacity).
- Deliver a responsive, user-friendly interface accessible via any modern web browser.

### 2.2 Scope

The system covers the following functional areas:

- **Student Management** — Registration, profile viewing, profile editing, and deletion.
- **Course Management** — Course creation and listing with code, name, credit hours, and capacity.
- **Enrollment Management** — Enrolling students in courses, viewing all enrollments, and dropping enrollments.
- **Data Validation** — Server-side validation for all inputs with meaningful error responses.

### 2.3 Target Users

- **Administrative Staff:** Manage student records and course data.
- **Academic Coordinators:** Monitor enrollments and course capacity utilization.

---

## 3. System Architecture

The system follows a classic **three-tier architecture**:

```
┌─────────────────────────────────────────────────────┐
│                  Presentation Tier                   │
│           React.js SPA (Port 3000)                   │
│  EnrollmentForm | StudentList | CourseList |         │
│                  EnrollmentList                      │
└───────────────────────┬─────────────────────────────┘
                        │ HTTP / REST (Axios)
┌───────────────────────▼─────────────────────────────┐
│                  Application Tier                    │
│           Flask REST API (Port 5000)                 │
│    Routes: /api/students, /api/courses,              │
│            /api/enrollments                          │
└───────────────────────┬─────────────────────────────┘
                        │ SQLAlchemy ORM
┌───────────────────────▼─────────────────────────────┐
│                    Data Tier                         │
│           Oracle Database XE (Port 1521)             │
│    Tables: STUDENTS, COURSES, ENROLLMENTS            │
└─────────────────────────────────────────────────────┘
```

The frontend and backend are decoupled; CORS is enabled to allow cross-origin requests during development. In production, the two can be served from the same origin or behind a reverse proxy (e.g., Nginx).

---

## 4. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Frontend Framework | React.js | 18.2.0 |
| HTTP Client | Axios | 1.4.0 |
| Client Routing | React Router DOM | 6.11.0 |
| Build Tool | Create React App / react-scripts | 5.0.1 |
| Backend Framework | Flask | Latest |
| ORM | Flask-SQLAlchemy | Latest |
| Cross-Origin | Flask-CORS | Latest |
| Database Driver | python-oracledb | Latest |
| Database | Oracle Database XE | 21c |
| Environment Config | python-dotenv | Latest |

---

## 5. Database Design

### 5.1 Entity-Relationship Overview

Three core entities are persisted in the database:

- **Student** — Stores personal and academic profile data.
- **Course** — Stores course metadata including credit hours and seat capacity.
- **Enrollment** — A junction table representing the many-to-many relationship between students and courses.

### 5.2 Table Definitions

#### STUDENTS Table

| Column | Type | Constraints |
|---|---|---|
| id | INTEGER | PRIMARY KEY (Sequence: students_seq) |
| first_name | VARCHAR(100) | NOT NULL |
| last_name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(120) | NOT NULL, UNIQUE |
| phone | VARCHAR(20) | NOT NULL |
| date_of_birth | DATE | NOT NULL |
| gender | VARCHAR(10) | NOT NULL |
| address | VARCHAR(255) | NOT NULL |
| city | VARCHAR(100) | NOT NULL |
| state | VARCHAR(100) | NOT NULL |
| postal_code | VARCHAR(20) | NOT NULL |
| program | VARCHAR(100) | NOT NULL |
| enrollment_date | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| status | VARCHAR(50) | DEFAULT 'Active' |

#### COURSES Table

| Column | Type | Constraints |
|---|---|---|
| id | INTEGER | PRIMARY KEY (Sequence: courses_seq) |
| course_code | VARCHAR(20) | NOT NULL, UNIQUE |
| course_name | VARCHAR(200) | NOT NULL |
| description | TEXT | NULLABLE |
| credits | INTEGER | NOT NULL |
| capacity | INTEGER | NOT NULL |

#### ENROLLMENTS Table

| Column | Type | Constraints |
|---|---|---|
| id | INTEGER | PRIMARY KEY (Sequence: enrollments_seq) |
| student_id | INTEGER | NOT NULL, FK → students.id |
| course_id | INTEGER | NOT NULL, FK → courses.id |
| enrollment_date | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| grade | VARCHAR(2) | NULLABLE |

### 5.3 Relationships

- A **Student** can enroll in many **Courses** (many-to-many via Enrollment).
- A **Course** can have many **Students** enrolled (many-to-many via Enrollment).
- SQLAlchemy `backref` relationships enable easy traversal in both directions.

---

## 6. Backend Implementation

### 6.1 Application Factory Pattern

The backend uses Flask's application factory pattern (`create_app()`), which makes the application configurable and testable. The factory accepts an environment name (`development`, `production`, or `testing`) and loads the appropriate configuration class.

### 6.2 Configuration

Three configuration profiles are defined in `config.py`:

- **DevelopmentConfig** — Connects to Oracle XE at `localhost:1521`, debug mode enabled.
- **ProductionConfig** — Reads `DATABASE_URL` from environment variable.
- **TestingConfig** — Uses an in-memory SQLite database for isolation.

Environment-specific secrets (e.g., database passwords) are loaded from a `.env` file via `python-dotenv`.

### 6.3 Models

Models are defined using Flask-SQLAlchemy in `models.py`. Oracle-compatible sequences (`Sequence`) are used for primary key generation to ensure compatibility with Oracle's auto-increment behavior. Each model exposes a `to_dict()` method for clean JSON serialization.

### 6.4 API Routes

All routes follow RESTful conventions and return JSON responses. Input validation is performed at the route level before any database operations. Database operations are wrapped in try/except blocks with `db.session.rollback()` on failure to maintain data integrity.

---

## 7. Frontend Implementation

### 7.1 Component Structure

The React application is organized as a single-page application with four main views managed via tab-based navigation in `App.jsx`:

```
App.jsx (Root, tab state)
├── EnrollmentForm.jsx   — Student registration form
├── StudentList.jsx      — Table of all students with edit/delete
├── CourseList.jsx       — Course listing and course creation form
└── EnrollmentList.jsx   — All enrollment records with drop functionality
```

### 7.2 API Service Layer

All HTTP communication is abstracted into `src/services/api.js` using Axios. The base URL defaults to `http://localhost:5000/api` but can be overridden via the `REACT_APP_API_URL` environment variable. This clean separation means components are not coupled to HTTP implementation details.

### 7.3 Styling

Component-specific CSS files (`EnrollmentForm.css`, `StudentList.css`) provide scoped styling. The global `App.css` handles layout, header, navigation tabs, and footer. The application uses a tab-button navigation paradigm for switching between views without page reloads.

---

## 8. API Documentation

### Students

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Retrieve all students |
| GET | `/api/students/:id` | Retrieve a single student |
| POST | `/api/students` | Create (register) a new student |
| PUT | `/api/students/:id` | Update student profile |
| DELETE | `/api/students/:id` | Delete a student |
| GET | `/api/students/:id/courses` | Get courses for a student |

### Courses

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/courses` | Retrieve all courses |
| POST | `/api/courses` | Create a new course |

### Enrollments

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/enrollments` | Retrieve all enrollments |
| POST | `/api/enrollments` | Enroll a student in a course |
| DELETE | `/api/enrollments/:id` | Drop an enrollment |

### Sample Request — Register Student

```json
POST /api/students
{
  "first_name": "Ali",
  "last_name": "Hassan",
  "email": "ali.hassan@example.com",
  "phone": "0300-1234567",
  "date_of_birth": "2002-06-15",
  "gender": "Male",
  "address": "House 12, Block A",
  "city": "Karachi",
  "state": "Sindh",
  "postal_code": "75300",
  "program": "Computer Science"
}
```

### Sample Response

```json
{
  "message": "Student enrolled successfully",
  "student": {
    "id": 1,
    "first_name": "Ali",
    "last_name": "Hassan",
    "email": "ali.hassan@example.com",
    "program": "Computer Science",
    "status": "Active",
    "enrollment_date": "2026-05-10 12:00:00"
  }
}
```

---

## 9. Features & Functionality

### 9.1 Student Management

- Register a new student with full personal and academic profile.
- View all students in a tabular listing.
- Edit student details (name, contact, program, status).
- Delete a student record from the system.
- Email uniqueness enforced to prevent duplicate registrations.

### 9.2 Course Management

- Add new courses with a unique course code, name, description, credit hours, and maximum capacity.
- View all available courses.

### 9.3 Enrollment Management

- Enroll an existing student into an available course.
- Prevent duplicate enrollment (same student + same course).
- Enforce course seat capacity — enrollment is blocked when capacity is reached.
- View all current enrollments with student and course details.
- Drop (delete) an enrollment.

### 9.4 Error Handling

- All API endpoints return structured JSON error messages.
- Custom 404 and 500 error handlers are registered on the Flask app.
- Frontend receives and can display error messages returned by the API.

---

## 10. Testing & Validation

### 10.1 Server-Side Validation

- Required field checking is performed before any database write.
- Date format validation for `date_of_birth` (`YYYY-MM-DD`).
- Uniqueness checks for student email and course code.
- Referential integrity checks (student/course existence) before enrollment creation.
- Capacity check before enrollment insertion.

### 10.2 Configuration Profiles

A dedicated `TestingConfig` uses SQLite in-memory, enabling unit tests to run without an Oracle connection. This is set up via the `FLASK_ENV=testing` environment variable.

---

## 11. Challenges & Solutions

| Challenge | Solution |
|---|---|
| Oracle sequence compatibility | Used SQLAlchemy `Sequence` objects in model definitions to generate PK values Oracle-style |
| Oracle client dependency on Windows | `oracledb.init_oracle_client()` called with explicit `lib_dir` pointing to Oracle Instant Client |
| Cross-origin requests in development | `Flask-CORS` enabled globally to allow React dev server (port 3000) to call Flask (port 5000) |
| Environment-specific DB config | `python-dotenv` + `Config` class hierarchy ensures secrets are never hardcoded |
| Duplicate enrollment prevention | Explicit pre-insert query checks for existing enrollment records |

---

## 12. Conclusion

The Student Enrollment System successfully delivers a functional, full-stack web application that addresses the core requirements of student and course administration. The layered architecture separates concerns cleanly: the React frontend handles user interaction, the Flask API handles business logic and validation, and Oracle XE handles persistent data storage.

The codebase is structured for maintainability with the application factory pattern, a dedicated service layer on the frontend, and environment-based configuration. Future enhancements could include user authentication and role-based access control, a grade management module, reporting and analytics dashboards, and email notification on enrollment confirmation.

---

*Report prepared based on source code analysis of the Student Enrollment System.*  
*Frontend: React 18 | Backend: Flask + SQLAlchemy | Database: Oracle XE*
