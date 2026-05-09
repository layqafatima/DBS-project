# 🚀 Quick Reference Card

## One-Page Cheat Sheet for Student Enrollment System

---

## 📋 SETUP COMMANDS

### Step 1: Database (5 min)
```bash
mysql -u root -p
SOURCE "C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\database_setup.sql"
exit
```

### Step 2: Backend (3 min) - Terminal 1
```bash
cd "C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\backend"
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
✅ Running on: **http://localhost:5000**

### Step 3: Frontend (3 min) - Terminal 2
```bash
cd "C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\frontend"
npm install
npm start
```
✅ Running on: **http://localhost:3000**

---

## 🌐 URLS & PORTS

| Service | URL | Port |
|---------|-----|------|
| Frontend App | http://localhost:3000 | 3000 |
| Backend API | http://localhost:5000 | 5000 |
| API Students | http://localhost:5000/api/students | 5000 |
| Database | localhost:1521 (XE) | 1521 |

---

## 🔗 KEY API ENDPOINTS

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create student
- `PUT /api/students/<id>` - Update student
- `DELETE /api/students/<id>` - Delete student

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course

### Enrollments
- `GET /api/enrollments` - Get all enrollments
- `POST /api/enrollments` - Enroll student
- `DELETE /api/enrollments/<id>` - Drop course

---

## 📂 IMPORTANT FILES

| File | Purpose | Location |
|------|---------|----------|
| `app.py` | Backend API | backend/ |
| `models.py` | Database models | backend/ |
| `EnrollmentForm.jsx` | Form component | frontend/src/components/ |
| `StudentList.jsx` | List component | frontend/src/components/ |
| `database_setup.sql` | DB initialization | root/ |
| `.env` | Config variables | backend/ |

---

## 🔐 DATABASE LOGIN

```
Username: system
Password: (your Oracle password set during installation)
Database: XE (Service Name)
Host: localhost
Port: 1521
```

---

## 📊 DATABASE TABLES

### students
- id, first_name, last_name, email, phone
- date_of_birth, gender, address, city, state
- postal_code, program, enrollment_date, status

### courses
- id, course_code, course_name, description
- credits, capacity

### enrollments
- id, student_id, course_id
- enrollment_date, grade

---

## ✅ TEST CHECKLIST

- [ ] Backend running at http://localhost:5000
- [ ] Frontend running at http://localhost:3000
- [ ] Can view API at http://localhost:5000/api/students
- [ ] Can enroll a student via form
- [ ] Can view students in list
- [ ] Can delete students

---

## 🛠️ COMMON FIXES

```bash
# Check .env DATABASE_URL format:
# DATABASE_URL=oracle+cx_oracle://system:password@localhost:1521/?service_name=XE

# Or use SQL*Plus to verify connection:
sqlplus system/password@XE
```

### Oracle Service Not Running
```bash
# Start Oracle Service (Windows Services)
Services.msc → Find OracleServiceXE → Right-click → Start

# Or via Command Prompt
net start OracleServiceXE
```

### Oracle Connection Error in Flask
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <number> /F

# Or use different port in app.py
app.run(port=5001)
```

### MySQL Not Starting
```bash
# Start MySQL Service
net start MySQL80
```

### npm Error
```bash
cd frontend
rm node_modules
rm package-lock.json
npm install
```

### Python Module Error
```bash
cd backend
venv\Scripts\activate
pip install -r requirements.txt --upgrade
```

---

## 📚 DOCUMENTATION MAP

| Need | File | Time |
|------|------|------|
| Quick start | QUICK_START.md | 2 min read |
| Complete setup | WINDOWS_SETUP_GUIDE.md | 5 min read |
| API details | API_DOCUMENTATION.md | Reference |
| Architecture | ARCHITECTURE.md | Reference |
| File guide | PROJECT_FILES_GUIDE.md | Reference |

---

## 💻 WORKING WITH CODE

### Add New Field to Student
1. Edit `database_setup.sql` - add column
2. Edit `models.py` - add to class
3. Edit `EnrollmentForm.jsx` - add input
4. Edit `StudentList.jsx` - add column

### Add New API Endpoint
1. Edit `app.py` - create route
2. Edit `api.js` - create function
3. Edit component - use function

### Change Database
```bash
# Edit .env file
DATABASE_URL=mysql+mysqlconnector://root:password@host:3306/newdb
```

---

## 🔍 QUICK SQL COMMANDS

```sql
# Connect to database
USE student_enrollment;

# View all students
SELECT * FROM students;

# View all courses
SELECT * FROM courses;

# View enrollments
SELECT * FROM enrollments;

# Clear all data
TRUNCATE TABLE enrollments;
TRUNCATE TABLE students;

# Check student count
SELECT COUNT(*) FROM students;

# Check course capacity
SELECT course_name, capacity, 
       (SELECT COUNT(*) FROM enrollments WHERE course_id = courses.id) as enrolled
FROM courses;
```

---

## 📱 FORM FIELDS (for testing)

```
First Name: John
Last Name: Doe
Email: john@example.com
Phone: 555-1234
DOB: 2000-01-15
Gender: Male
Address: 123 Main St
City: New York
State: NY
Zip: 10001
Program: Bachelor of Computer Science
```

---

## ⚠️ TROUBLESHOOTING QUICK LINKS

- **Python errors?** → WINDOWS_SETUP_GUIDE.md → Troubleshooting
- **npm errors?** → QUICK_START.md → Common Commands
- **API errors?** → API_DOCUMENTATION.md → Error Responses
- **Database errors?** → ARCHITECTURE.md → Database Schema

---

## 🎯 FINAL CHECKLIST

- [ ] All 3 services running (DB, Backend, Frontend)
- [ ] Database populated with courses
- [ ] API responding to requests
- [ ] Frontend displaying correctly
- [ ] Can enroll students
- [ ] Can view student list
- [ ] System working end-to-end

---

## 📞 QUICK CONTACT URLS

- Python Docs: https://docs.python.org/3/
- Flask Docs: https://flask.palletsprojects.com/
- React Docs: https://react.dev/
- MySQL Docs: https://dev.mysql.com/doc/

---

**Print this page and keep it handy!**

**Created**: May 2, 2026 | **System**: Complete & Ready

