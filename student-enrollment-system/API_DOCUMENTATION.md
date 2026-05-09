# API Documentation

## Base URL
```
http://localhost:5000/api
```

Database: Oracle Database (XE)
Connection: oracle+cx_oracle://system:password@localhost:1521/?service_name=XE
Currently, the API does not require authentication. All endpoints are public.

---

## Student Endpoints

### 1. Get All Students
**GET** `/students`

**Response:**
```json
[
  {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "date_of_birth": "2000-01-15",
    "gender": "Male",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001",
    "program": "Bachelor of Computer Science",
    "enrollment_date": "2024-05-02 10:30:00",
    "status": "Active"
  }
]
```

---

### 2. Get Specific Student
**GET** `/students/{id}`

**Parameters:**
- `id` (integer, required) - Student ID

**Response:**
```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  ...
}
```

---

### 3. Create New Student
**POST** `/students`

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "date_of_birth": "2000-01-15",
  "gender": "Male",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "postal_code": "10001",
  "program": "Bachelor of Computer Science"
}
```

**Response (201 Created):**
```json
{
  "message": "Student enrolled successfully",
  "student": {
    "id": 1,
    ...
  }
}
```

---

### 4. Update Student
**PUT** `/students/{id}`

**Parameters:**
- `id` (integer, required) - Student ID

**Request Body:**
```json
{
  "first_name": "Jane",
  "phone": "987-654-3210",
  "status": "Inactive"
}
```

**Response (200 OK):**
```json
{
  "message": "Student updated successfully",
  "student": { ... }
}
```

---

### 5. Delete Student
**DELETE** `/students/{id}`

**Parameters:**
- `id` (integer, required) - Student ID

**Response (200 OK):**
```json
{
  "message": "Student deleted successfully"
}
```

---

## Course Endpoints

### 1. Get All Courses
**GET** `/courses`

**Response:**
```json
[
  {
    "id": 1,
    "course_code": "CS101",
    "course_name": "Introduction to Computer Science",
    "description": "Fundamentals of computer science",
    "credits": 3,
    "capacity": 30
  }
]
```

---

### 2. Create New Course
**POST** `/courses`

**Request Body:**
```json
{
  "course_code": "CS101",
  "course_name": "Introduction to Computer Science",
  "description": "Fundamentals of computer science",
  "credits": 3,
  "capacity": 30
}
```

**Response (201 Created):**
```json
{
  "message": "Course created successfully",
  "course": { ... }
}
```

---

## Enrollment Endpoints

### 1. Get All Enrollments
**GET** `/enrollments`

**Response:**
```json
[
  {
    "id": 1,
    "student_id": 1,
    "course_id": 1,
    "enrollment_date": "2024-05-02 10:30:00",
    "grade": null,
    "student": { ... },
    "course": { ... }
  }
]
```

---

### 2. Enroll Student in Course
**POST** `/enrollments`

**Request Body:**
```json
{
  "student_id": 1,
  "course_id": 1
}
```

**Response (201 Created):**
```json
{
  "message": "Enrollment successful",
  "enrollment": { ... }
}
```

**Error Cases:**
- Student already enrolled in course
- Course at full capacity
- Student or Course not found

---

### 3. Delete Enrollment (Drop Course)
**DELETE** `/enrollments/{id}`

**Parameters:**
- `id` (integer, required) - Enrollment ID

**Response (200 OK):**
```json
{
  "message": "Enrollment deleted successfully"
}
```

---

### 4. Get Student's Courses
**GET** `/students/{id}/courses`

**Parameters:**
- `id` (integer, required) - Student ID

**Response:**
```json
[
  {
    "id": 1,
    "student_id": 1,
    "course_id": 1,
    ...
  }
]
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required field: email"
}
```

### 404 Not Found
```json
{
  "error": "Student not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error description"
}
```

---

## Testing with cURL

### Example: Get all students
```bash
curl http://localhost:5000/api/students
```

### Example: Create a student
```bash
curl -X POST http://localhost:5000/api/students \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "date_of_birth": "2000-01-15",
    "gender": "Male",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "postal_code": "10001",
    "program": "Bachelor of Computer Science"
  }'
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid request data |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

