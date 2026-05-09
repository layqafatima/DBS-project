# 🗄️ Oracle Database Setup & Configuration Guide

## Prerequisites

Before setting up the Oracle database for the Student Enrollment System, ensure you have:

1. **Oracle Database Installed**
   - Oracle Database 21c Express Edition or higher
   - Download: https://www.oracle.com/database/technologies/xe-downloads.html

2. **Oracle SQL Developer Installed**
   - Download: https://www.oracle.com/tools/downloads/sqldev-downloads.html

3. **Windows 10/11 or Linux/Mac**
   - Supported operating systems

---

## Step 1: Oracle Database Installation (Windows)

### Download & Install

1. Go to https://www.oracle.com/database/technologies/xe-downloads.html
2. Click "Download" for your OS (Windows)
3. Accept license terms
4. Download the ZIP file

### Installation Process

1. Extract the ZIP file to a folder
2. Navigate to the extracted folder
3. Run `setup.exe`
4. Follow the installer:
   - Accept License Agreement
   - Choose Installation Location
   - **Important**: Set password for SYS and SYSTEM accounts
   - Verify settings
   - Click Install

### Post-Installation

1. **Start Oracle Services**
   - Press `Win + R`
   - Type `Services.msc`
   - Look for "OracleServiceXE" service
   - Right-click → Properties → Set Startup type to "Automatic"
   - Click "Start" button

2. **Verify Installation**
   - Open Command Prompt
   - Run: `sqlplus system/password@XE`
   - If connected successfully, type `exit`

---

## Step 2: Oracle SQL Developer Setup

### Download & Install

1. Download from https://www.oracle.com/tools/downloads/sqldev-downloads.html
2. Extract to a folder (or run installer)
3. Run `sqldeveloper.exe`
4. First launch will take a moment to initialize

### Create Database Connection

1. In SQL Developer, click the green **+** icon (New Database Connection)
2. Fill in the details:
   - **Connection Name**: `SystemDB`
   - **Username**: `system`
   - **Password**: (What you set during Oracle installation)
   - **Connection Type**: `Basic`
   - **Hostname**: `localhost`
   - **Port**: `1521`
   - **Service Name**: `XE`
3. Click **Save**
4. Click **Connect** to test the connection

---

## Step 3: Create Student Enrollment Schema

### Method 1: Using SQL Developer (Recommended)

1. In SQL Developer, with SystemDB connection open:
2. Click **File** → **Open**
3. Navigate to: `C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\oracle_database_setup.sql`
4. Click **Open**
5. Press **Ctrl+Enter** or click the green Execute button
6. Wait for completion (check for success messages)

### Method 2: Using SQL*Plus Command Line

```bash
# Open Command Prompt
cd "C:\Oracle\xe\app\oracle\product\21c\dbhomeXE\bin"

# Connect to database
sqlplus system/password@XE

# Execute setup script
@"C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\oracle_database_setup.sql"

# Exit
exit
```

### Method 3: Copy-Paste in SQL Developer

1. Open `oracle_database_setup.sql` in a text editor
2. Copy all content
3. In SQL Developer, click **File** → **New** → **SQL File**
4. Paste the content
5. Press **Ctrl+Enter** to execute all

---

## Step 4: Verify Schema Creation

### Verify Tables

In SQL Developer, run:
```sql
SELECT table_name FROM user_tables 
WHERE table_name IN ('STUDENTS', 'COURSES', 'ENROLLMENTS');
```

**Expected Output:**
```
TABLE_NAME
-----------
STUDENTS
COURSES
ENROLLMENTS
```

### Verify Sequences

```sql
SELECT sequence_name FROM user_sequences 
WHERE sequence_name IN ('STUDENTS_SEQ', 'COURSES_SEQ', 'ENROLLMENTS_SEQ');
```

**Expected Output:**
```
SEQUENCE_NAME
--------------
STUDENTS_SEQ
COURSES_SEQ
ENROLLMENTS_SEQ
```

### Verify Sample Data

```sql
SELECT COUNT(*) as course_count FROM courses;
```

**Expected Output:** `8` (8 courses pre-loaded)

---

## Step 5: Configure Flask Backend Connection

### Edit .env File

In `backend/.env`, update DATABASE_URL:

```
FLASK_ENV=development
FLASK_APP=app.py
DATABASE_URL=oracle+cx_oracle://system:YOUR_PASSWORD@localhost:1521/?service_name=XE
```

Replace `YOUR_PASSWORD` with your Oracle system password set during installation.

### Connection String Breakdown

```
oracle+cx_oracle://system:password@localhost:1521/?service_name=XE
│      │           │      │       │        │    │              │
│      │           │      │       │        │    │              └─ Service name (XE for Express Edition)
│      │           │      │       │        │    └─ Port number
│      │           │      │       │        └─ Hostname/IP
│      │           │      │       └─ Password
│      │           │      └─ Username
│      │           └─ Oracle dialect for SQLAlchemy
│      └─ cx_Oracle driver name
└─ Database type (Oracle)
```

---

## Troubleshooting

### Problem: "ORA-12514: TNS:listener does not currently know of service requested"

**Solution:**
1. Verify Oracle is running (check Services.msc)
2. Try connection string with SID instead:
   ```
   oracle+cx_oracle://system:password@localhost:1521/XE
   ```
3. Or verify Service Name is correct (usually "XE" for Express Edition)

### Problem: "ORA-01017: invalid username/password; logon denied"

**Solution:**
1. Verify username is `system` or `sysdba`
2. Verify password matches what you set during installation
3. Reset password if forgotten:
   ```bash
   sqlplus / as sysdba
   ALTER USER system IDENTIFIED BY newpassword;
   ```

### Problem: "TNS:could not resolve the connect identifier specified"

**Solution:**
1. Verify hostname is `localhost` (not 127.0.0.1 or machine name)
2. Verify port is `1521` (default for Oracle)
3. Verify Service Name is `XE` (for Express Edition)

### Problem: Cannot connect to Oracle from SQL Developer

**Solution:**
1. Ensure OracleServiceXE is running in Services.msc
2. Check firewall allows port 1521
3. Try connection with hostname `localhost` instead of IP address
4. Restart SQL Developer

### Problem: "cx-Oracle.DatabaseError" in Flask

**Solution:**
1. Ensure cx_Oracle is installed: `pip install cx-Oracle`
2. Verify Oracle drivers are installed (happens with cx-Oracle)
3. Check DATABASE_URL in .env file
4. Ensure Oracle service is running

---

## Common SQL Operations

### View All Tables
```sql
SELECT table_name FROM user_tables;
```

### View Table Structure
```sql
DESC students;
DESC courses;
DESC enrollments;
```

### View Table Data
```sql
SELECT * FROM students;
SELECT * FROM courses;
SELECT * FROM enrollments;
```

### Count Records
```sql
SELECT 'students' as table_name, COUNT(*) as row_count FROM students
UNION ALL
SELECT 'courses', COUNT(*) FROM courses
UNION ALL
SELECT 'enrollments', COUNT(*) FROM enrollments;
```

### Clear All Data
```sql
DELETE FROM enrollments;
DELETE FROM students;
COMMIT;
```

### Reset Sequences
```sql
DROP SEQUENCE students_seq;
DROP SEQUENCE courses_seq;
DROP SEQUENCE enrollments_seq;

CREATE SEQUENCE students_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE courses_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE enrollments_seq START WITH 1 INCREMENT BY 1;

COMMIT;
```

---

## Managing Oracle Service

### Start Oracle Service

**Windows Services GUI:**
- Press `Win + R`
- Type `Services.msc`
- Find `OracleServiceXE`
- Right-click → Start

**Command Prompt:**
```bash
net start OracleServiceXE
```

### Stop Oracle Service

**Command Prompt:**
```bash
net stop OracleServiceXE
```

### Check Oracle Status

```bash
# Using Services.msc
Services.msc

# Using Command Prompt
sc query OracleServiceXE
```

---

## Backup & Recovery

### Backup Database

```bash
# Using exp utility (older method)
exp system/password@XE file=backup.dmp full=y

# Using expdp (newer method - requires installed database tools)
expdp system/password@XE dumpfile=backup.dmp full=y
```

### Restore Database

```bash
# Using imp utility
imp system/password@XE file=backup.dmp full=y

# Using impdp utility
impdp system/password@XE dumpfile=backup.dmp full=y
```

---

## Performance Tips

### Enable Query Optimization

```sql
-- Create indexes for frequently queried columns
CREATE INDEX idx_students_email ON students(email);
CREATE INDEX idx_students_program ON students(program);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);
```

### Monitor Performance

```sql
-- Check table sizes
SELECT table_name, ROUND(num_rows * avg_row_len / 1024 / 1024, 2) AS size_mb
FROM user_tables;

-- Check query execution
EXPLAIN PLAN FOR SELECT * FROM students;
SELECT PLAN_TABLE_OUTPUT FROM TABLE(DBMS_XPLAN.DISPLAY);
```

---

## Additional Resources

- **Oracle Documentation**: https://docs.oracle.com/en/database/
- **SQL Developer Guide**: https://www.oracle.com/tools/sqldev/
- **Oracle Express Edition**: https://www.oracle.com/database/technologies/xe.html
- **cx-Oracle Documentation**: https://cx-oracle.readthedocs.io/

---

## Next Steps

1. Verify database setup with provided queries
2. Update Flask `.env` file with Oracle credentials
3. Install Python dependencies: `pip install -r requirements.txt`
4. Start Flask backend: `python app.py`
5. Start React frontend: `npm start`
6. Test application

---

**Oracle setup is complete! Ready to connect Flask backend.**

