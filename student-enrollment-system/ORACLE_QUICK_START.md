# 🎯 Oracle Setup - Step by Step (Complete Guide)

## 🚀 Quick Start with Oracle (20 minutes)

Follow these steps **exactly** in order to get the Student Enrollment System running with Oracle Database.

---

## PART 1: Oracle Database Installation & Setup (8 minutes)

### Step 1.1: Download Oracle Database

1. Go to: https://www.oracle.com/database/technologies/xe-downloads.html
2. Click "Download" for your OS (Windows)
3. Accept license terms
4. Download and extract the ZIP file

### Step 1.2: Install Oracle Database

1. In the extracted folder, run `setup.exe`
2. Follow the installation wizard:
   - Accept License Agreement
   - Choose installation location (default OK)
   - **IMPORTANT**: When asked for password, set a password for `system` user (e.g., `oracle123`)
   - Review settings and click "Install"
3. Wait for installation to complete (5-10 minutes)
4. Click "Finish"

### Step 1.3: Verify Oracle is Running

Press `Win + R` → Type `Services.msc` → Find "OracleServiceXE" → Should show "Running" status

If not running, right-click → Properties → Set Startup type to "Automatic" → Click "Start"

---

## PART 2: Oracle SQL Developer Setup (3 minutes)

### Step 2.1: Download SQL Developer

1. Go to: https://www.oracle.com/tools/downloads/sqldev-downloads.html
2. Download (extract if ZIP version)
3. Run `sqldeveloper.exe`
4. First launch initializes (takes 30 seconds)

### Step 2.2: Create Database Connection

1. In SQL Developer, click the **green + icon** (New Database Connection)
2. Fill in:
   ```
   Connection Name: SystemDB
   Username: system
   Password: oracle123 (or your password from Step 1.2)
   Connection Type: Basic
   Hostname: localhost
   Port: 1521
   Service Name: XE
   ```
3. Click **"Save"**
4. Click **"Connect"** to test (should see green checkmark)

---

## PART 3: Create Database Schema (2 minutes)

### Step 3.1: Execute Database Setup Script

1. In SQL Developer (with SystemDB connected):
2. Click **File** → **Open**
3. Navigate to: `C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\oracle_database_setup.sql`
4. Click **"Open"**
5. Press **Ctrl+Enter** (or click green Execute button)
6. Wait for "Database setup completed successfully!" message

### Step 3.2: Verify Tables Created

In SQL Developer, run this query:
```sql
SELECT table_name FROM user_tables WHERE table_name IN ('STUDENTS', 'COURSES', 'ENROLLMENTS');
```

You should see:
```
STUDENTS
COURSES
ENROLLMENTS
```

✅ **Database is ready!**

---

## PART 4: Backend Setup (4 minutes)

### Step 4.1: Open Command Prompt 1

Press `Win + R` → Type `cmd` → Press Enter

### Step 4.2: Navigate to Backend

```bash
cd "C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\backend"
```

### Step 4.3: Create Virtual Environment

```bash
python -m venv venv
```

### Step 4.4: Activate Virtual Environment

```bash
venv\Scripts\activate
```

You should see `(venv)` at the beginning of the command line.

### Step 4.5: Install Dependencies

```bash
pip install -r requirements.txt
```

Wait for installation (2-3 minutes).

### Step 4.6: Configure Oracle Connection

1. Open `.env` file with Notepad:
   ```bash
   notepad .env
   ```

2. Edit this line (change password to match Step 1.2):
   ```
   DATABASE_URL=oracle+cx_oracle://system:oracle123@localhost:1521/?service_name=XE
   ```

3. Save (Ctrl+S)

### Step 4.7: Start Backend Server

```bash
python app.py
```

You should see:
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

✅ **Backend is running! Keep this window open.**

---

## PART 5: Frontend Setup (3 minutes)

### Step 5.1: Open Command Prompt 2 (NEW window)

Press `Win + R` → Type `cmd` → Press Enter (open a NEW command prompt, don't close the backend one)

### Step 5.2: Navigate to Frontend

```bash
cd "C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\frontend"
```

### Step 5.3: Install Dependencies

```bash
npm install
```

Wait for dependencies (3-5 minutes).

### Step 5.4: Start Frontend

```bash
npm start
```

Browser will automatically open at `http://localhost:3000` showing the Student Enrollment System.

✅ **Frontend is running!**

---

## PART 6: Test the System (2 minutes)

### Test 1: Enroll a Student

1. You should see the Student Enrollment System page
2. Click "Enroll Student" tab (if not already on it)
3. Fill in the form:
   - First Name: **John**
   - Last Name: **Doe**
   - Email: **john.doe@example.com**
   - Phone: **555-1234**
   - Date of Birth: **2000-01-15**
   - Gender: **Male**
   - Address: **123 Main Street**
   - City: **New York**
   - State: **NY**
   - Postal Code: **10001**
   - Program: **Bachelor of Computer Science**

4. Click **"Enroll Student"**
5. You should see: "Student enrolled successfully! Student ID: 1"

### Test 2: View Students

1. Click **"View Students"** tab
2. You should see John Doe in the table

### Test 3: Test API

1. Open new browser tab
2. Go to: `http://localhost:5000/api/students`
3. You should see JSON response with student data

✅ **Everything is working!**

---

## Common Issues & Quick Fixes

### Issue: Cannot connect to Oracle

**Fix:**
1. Check OracleServiceXE is running (Services.msc)
2. Verify .env has correct password
3. Verify port 1521 is not blocked

### Issue: "cx-Oracle" module not found

**Fix:**
```bash
pip install cx-Oracle --upgrade
```

### Issue: Port 5000 already in use

**Fix:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill it (replace XXXX with PID)
taskkill /PID XXXX /F

# Or change port in app.py
```

### Issue: Port 3000 already in use

**Fix:**
```bash
set PORT=3001
npm start
```

---

## Running Again Later

Next time you want to use the system:

**Terminal 1 (Backend):**
```bash
cd "C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\backend"
venv\Scripts\activate
python app.py
```

**Terminal 2 (Frontend):**
```bash
cd "C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\frontend"
npm start
```

Oracle Database and SQL Developer should start automatically (if set to auto-start).

---

## Stopping the System

When done:

1. In backend terminal: Press `Ctrl + C`
2. In frontend terminal: Press `Ctrl + C`
3. Close terminals

---

## Summary of URLs

| Component | URL |
|-----------|-----|
| **Frontend** | http://localhost:3000 |
| **Backend API** | http://localhost:5000 |
| **API Students** | http://localhost:5000/api/students |
| **Oracle Database** | localhost:1521 |
| **SQL Developer** | Desktop application |

---

## Key Credentials

```
Oracle System User: system
Oracle Password: oracle123 (or what you set)
Service Name: XE
Port: 1521
```

---

## File Locations

```
Backend: C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\backend
Frontend: C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\frontend
Database Script: oracle_database_setup.sql (in root folder)
```

---

## Documentation Files to Read

1. **QUICK_REFERENCE.md** - One page cheat sheet
2. **ORACLE_SETUP_GUIDE.md** - Detailed Oracle setup
3. **MYSQL_VS_ORACLE.md** - Comparison if migrating from MySQL
4. **README.md** - Full documentation

---

## Next Steps

✅ System is fully functional!

- Modify form to add more fields
- Create more courses
- Add more students
- Deploy to production
- Customize styling
- Add user authentication

---

## Support

If you get stuck:
1. Check QUICK_REFERENCE.md
2. See ORACLE_SETUP_GUIDE.md troubleshooting section
3. Verify Oracle service is running (Services.msc)
4. Check Flask is running (should see "Running on http://0.0.0.0:5000")
5. Ensure npm install completed successfully

---

**🎉 Congratulations! Your Student Enrollment System with Oracle is Ready! 🎉**

Time to complete: **~20 minutes**

