# Quick Start Guide

## Complete Setup in 5 Easy Steps

### ✅ Step 1: Setup Oracle Database (2 minutes)

**Using Oracle SQL Developer:**

1. Open Oracle SQL Developer
2. Connect to your Oracle database (default: system/password on localhost:1521/XE)
3. Open the file: `oracle_database_setup.sql`
4. Press **Ctrl+Enter** or click Execute button
5. Verify tables were created:
   ```sql
   SELECT table_name FROM user_tables 
   WHERE table_name IN ('STUDENTS', 'COURSES', 'ENROLLMENTS');
   ```

**Or via Command Line (if SQL*Plus installed):**
```bash
sqlplus system/password@XE
@"C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\oracle_database_setup.sql"
```


---

### ✅ Step 2: Setup and Run Backend (3 minutes)

**Open Command Prompt 1:**

```bash
# Navigate to backend folder
cd "C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\backend"

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure Oracle Connection
# Edit .env file with your Oracle connection:
# DATABASE_URL=oracle+cx_oracle://system:your_password@localhost:1521/?service_name=XE

# Run the backend
python app.py
```

**Expected Output:**
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

---

### ✅ Step 3: Setup and Run Frontend (3 minutes)

**Open Command Prompt 2 (Keep Backend Running):**

```bash
# Navigate to frontend folder
cd "C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\frontend"

# Install dependencies
npm install

# Start the development server
npm start
```

**Expected Output:**
- Browser automatically opens at `http://localhost:3000`

---

### ✅ Step 4: Test the Application

1. **Enroll a Student**
   - Click "Enroll Student" tab
   - Fill the form with sample data
   - Click "Enroll Student"

2. **View Students**
   - Click "View Students" tab
   - See all enrolled students

3. **Test API Endpoints**
   - Open browser and go to `http://localhost:5000/api/students`
   - You should see JSON response with student data

---

### ✅ Step 5: Stop the Application

When done:
- Press `Ctrl+C` in each Command Prompt to stop the servers
- MySQL can remain running or you can close it

---

## Summary of Running URLs

| Service | URL | Status |
|---------|-----|--------|
| Backend API | http://localhost:5000 | Running |
| Backend API - Students | http://localhost:5000/api/students | Running |
| Frontend Application | http://localhost:3000 | Running |
| Oracle Database | localhost:1521 (XE) | Running |

---

## Common Commands Reference

```bash
# Activate backend virtual environment
cd backend
venv\Scripts\activate

# Deactivate virtual environment
deactivate

# Update Python dependencies
pip install -r requirements.txt --upgrade

# Update Node dependencies
npm update

# Reset React app
cd frontend
del node_modules
del package-lock.json
npm install
npm start
```

---

## Database Management

```bash
# Connect to Oracle (using SQL*Plus)
sqlplus system/password@XE

# View database
SELECT table_name FROM user_tables;

# Check tables
DESC students;
DESC courses;
DESC enrollments;

# View students
SELECT * FROM students;

# View courses
SELECT * FROM courses;

# View enrollments
SELECT * FROM enrollments;

# Clear all data (if needed)
DELETE FROM enrollments;
DELETE FROM students;
COMMIT;
```

---

## Need Help?

Check the main README.md file for:
- Detailed troubleshooting
- API endpoints documentation
- Project structure details
- Technology stack information

