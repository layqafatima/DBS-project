# Complete Windows Setup & Running Guide

This guide provides detailed, step-by-step instructions for Windows users.

---

## Prerequisites Installation (Windows)

### 1. Install Python 3.8+

1. Download from https://www.python.org/downloads/
2. Run the installer
3. **IMPORTANT**: Check "Add Python to PATH"
4. Click "Install Now"
5. Verify installation:
   ```cmd
   python --version
   ```

### 2. Install Node.js 14+

1. Download from https://nodejs.org/
2. Run the installer
3. Follow the default installation
4. Verify installation:
   ```cmd
   node --version
   npm --version
   ```

### 3. Install Oracle Database

1. Download from https://www.oracle.com/database/technologies/xe-downloads.html
2. Run the installer
3. Choose default port 1521
4. Set password for system user
5. Complete installation
6. Start Oracle services

### 4. Install Oracle SQL Developer

1. Download from https://www.oracle.com/tools/downloads/sqldev-downloads.html
2. Extract or install
3. Run SQL Developer (sqldev.exe)
4. Create new connection with system credentials

---

## Complete Setup Process

### Part 1: Database Setup (5 minutes)

**Step 1.1: Open Oracle SQL Developer**

Open Oracle SQL Developer application:
1. Click "New Database Connection" (green plus icon)
2. Enter:
   - Connection Name: `SystemDB` (or any name)
   - Username: `system`
   - Password: (your Oracle password set during installation)
   - Connection Type: `Basic`
   - Hostname: `localhost`
   - Port: `1521`
   - Service Name: `XE`
3. Click "Save" then "Connect"

**Step 1.2: Execute Database Setup Script**

In SQL Developer:
1. File → Open
2. Navigate to: `C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\oracle_database_setup.sql`
3. Click "Open"
4. Press **Ctrl+Enter** or click the Execute button (green play icon)
5. Wait for completion (you'll see success messages)

**Step 1.3: Verify Setup**

Run this SQL query to verify:
```sql
SELECT table_name FROM user_tables 
WHERE table_name IN ('STUDENTS', 'COURSES', 'ENROLLMENTS');
```

You should see:
```
STUDENTS
COURSES
ENROLLMENTS
```

---

### Part 2: Backend Setup (5 minutes)

**Step 2.1: Open Command Prompt**

Press `Win + R`, type `cmd`, press Enter:
```cmd
cd C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\backend
```

**Step 2.2: Create Virtual Environment**

```cmd
python -m venv venv
```

This creates a `venv` folder (takes ~1-2 minutes)

**Step 2.3: Activate Virtual Environment**

```cmd
venv\Scripts\activate
```

You should see `(venv)` at the beginning of the command line

**Step 2.4: Install Dependencies**

```cmd
pip install -r requirements.txt
```

This installs Flask, MySQL connector, etc. (takes ~2-3 minutes)

**Step 2.5: Update .env File**

Open `.env` file with Notepad:
```cmd
notepad .env
```

Edit the DATABASE_URL line with your MySQL password:
```
FLASK_ENV=development
FLASK_APP=app.py
DATABASE_URL=mysql+mysqlconnector://root:YOUR_PASSWORD@localhost:3306/student_enrollment
```

Replace `YOUR_PASSWORD` with your MySQL root password, then save (Ctrl+S)

**Step 2.6: Run Backend Server**

```cmd
python app.py
```

You should see:
```
WARNING in app.run...
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

✅ **Backend is running! Keep this window open.**

---

### Part 3: Frontend Setup (5 minutes)

**Step 3.1: Open New Command Prompt**

Press `Win + R`, type `cmd`, press Enter (NEW window, don't close the previous one):
```cmd
cd C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\frontend
```

**Step 3.2: Install Node Dependencies**

```cmd
npm install
```

This takes 3-5 minutes and downloads Oracle credentials:
```
FLASK_ENV=development
FLASK_APP=app.py
DATABASE_URL=oracle+cx_oracle://system:YOUR_PASSWORD@localhost:1521/?service_name=XE
```

Replace `YOUR_PASSWORD` with your Oracle system password (set during installation)
The application will automatically open in your browser at:
```
http://localhost:3000
```

✅ **Frontend is running! You should see the Student Enrollment System UI.**

---

## Testing the System

### Test 1: Enroll a Student

1. Make sure you see the "Student Enrollment System" heading
2. You should be on the "Enroll Student" tab
3. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john.doe@example.com
   - Phone: 555-1234
   - Date of Birth: 2000-01-15
   - Gender: Male
   - Address: 123 Main Street
   - City: New York
   - State: NY
   - Postal Code: 10001
   - Program: Bachelor of Computer Science
4. Click "Enroll Student"
5. You should see success message with Student ID

### Test 2: View Enrolled Students

1. Click "View Students" tab
2. You should see John Doe in the list
3. Can delete students with the Delete button

### Test 3: Test API Directly

1. Open browser and go to:
   ```
   http://localhost:5000/api/students
   ```
2. You should see JSON data of all students

---

## Stopping the Application

When you're done, close the servers:

1. **Close Backend**: In backend Command Prompt, press `Ctrl + C`
2. **Close Frontend**: In frontend Command Prompt, press `Ctrl + C`
3. Keep MySQL running (optional)

---

## Running Again Next Time

**Terminal 1 (Backend):**
```cmd
cd C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\backend
venv\Scripts\activate
python app.py
```

**Terminal 2 (Frontend):**
```cmd
cd C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\frontend
npm start
```

---

## Troubleshooting for Windows

### Problem: "Python not found" or "'python' is not recognized"
**Solution:**
1. Go to Settings → System → About → Advanced system settings
2. Click "Environment Variables"
3. Under User variables, click "Path", then "Edit"
4. Make sure Python installation path is there: `C:\Users\YourName\AppData\Local\Programs\Python\Python311`
5. Click OK and restart Command Prompt

### Problem: Port 5000 already in use
**Solution:**
```cmd
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

Then run Flask again

### Problem: Port 3000 already in use
**Solution:**
Set different port:
```cmd
set PORT=3001
npm start
```

### Problem: MySQL connection error
**Solution:**
1. Start MySQL Service:
   - Services.msc → MySQL80 → Start
2. Or verify credentials in `.env` file

### Problem: npm ERR! code EACCES
**Solution:**
```cmd
npm cache clean --force
rm -r node_modules package-lock.json
npm install
```

### Problem: Virtual environment not activating
**Solution:**
```cmd
python -m venv venv
venv\Scripts\activate.bat
pip install -r requirements.txt
python app.py
```

---

## Windows 11 Terminal Alternative

If using Windows Terminal (recommended):
```powershell
# Backend
cd "C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\backend"
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

---

## Useful Windows Commands

```cmd
# Navigate to folder
cd path\to\folder

# List files
dir

# Create folder
mkdir foldername

# View file content
type filename.txt

# Edit file with Notepad
notepad filename.txt

# Kill process on port
netstat -ano | findstr :PORT
taskkill /PID <number> /F

# Check if service is running
tasklist | find "service_name"

# Set environment variable
set VARIABLE_NAME=value
```

---

## Summary

| Step | Time | Command | Result |
|------|------|---------|--------|
| 1. Database | 5 min | MySQL Setup Script | Database Created ✅ |
| 2. Backend | 5 min | `python app.py` | API Running on :5000 ✅ |
| 3. Frontend | 5 min | `npm start` | UI Running on :3000 ✅ |

**Total Setup Time: ~15 minutes**

---

## Need Help?

- Check API_DOCUMENTATION.md for API details
- See README.md for full documentation
- Review troubleshooting section above

**Enjoy your Student Enrollment System! 🎓**

