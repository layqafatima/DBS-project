# 📚 Project File Guide & Purpose Reference

## 🎯 Start Here

Choose based on your needs:

1. **New to this project?** → Read [README.md](README.md)
2. **Windows user?** → Read [WINDOWS_SETUP_GUIDE.md](WINDOWS_SETUP_GUIDE.md)
3. **In a hurry?** → Read [QUICK_START.md](QUICK_START.md)
4. **Want API details?** → Read [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
5. **Understand architecture?** → Read [ARCHITECTURE.md](ARCHITECTURE.md)

---

## 📁 Backend Files

### Core Application Files

#### `backend/app.py` - Main Flask Application
- **Purpose**: Contains Flask app initialization and all API endpoints
- **Key Routes**:
  - `/` - Health check endpoint
  - `/api/students/*` - Student CRUD operations
  - `/api/courses/*` - Course management
  - `/api/enrollments/*` - Enrollment management
- **Lines**: ~400+
- **Dependencies**: Flask, SQLAlchemy, mysql-connector
- **Important**: All business logic is here

#### `backend/models.py` - Database Models
- **Purpose**: Defines SQLAlchemy ORM models for database tables
- **Classes**:
  - `Student` - Student information
  - `Course` - Course details
  - `Enrollment` - Junction table for M:M relationship
- **Contains**: Model definitions with relationships and serialization methods
- **Important**: Each model has a `to_dict()` method for JSON responses

#### `backend/config.py` - Configuration Management
- **Purpose**: Manages different configurations (dev, prod, test)
- **Classes**:
  - `DevelopmentConfig` - Debug enabled, local database
  - `ProductionConfig` - Production settings
  - `TestingConfig` - Testing with SQLite
- **Usage**: Loaded based on FLASK_ENV variable

#### `backend/requirements.txt` - Python Dependencies
- **Purpose**: Lists all required Python packages
- **Contents**:
  - Flask==2.3.0
  - Flask-CORS==4.0.0
  - Flask-SQLAlchemy==3.0.5
  - mysql-connector-python==8.0.33
  - python-dotenv==1.0.0
- **Usage**: `pip install -r requirements.txt`

#### `backend/.env` - Environment Variables
- **Purpose**: Stores configuration not to be committed to version control
- **Variables**:
  - `FLASK_ENV` - Development/Production
  - `FLASK_APP` - Entry point file
  - `DATABASE_URL` - MySQL connection string
- **Important**: Edit this with your MySQL password

---

## 📁 Frontend Files

### Component Files (React)

#### `frontend/src/components/EnrollmentForm.jsx`
- **Purpose**: Form component for enrolling new students
- **Features**:
  - Input validation
  - Form state management
  - Error/success messaging
  - Auto-reset after submission
- **Lines**: ~150
- **Uses**: Axios to call API, React hooks for state

#### `frontend/src/components/StudentList.jsx`
- **Purpose**: Displays table of enrolled students
- **Features**:
  - Fetches students on mount
  - Delete functionality
  - Loading/error states
  - Responsive table
- **Lines**: ~60
- **Uses**: Axios API calls, useEffect hook

### Main App Files

#### `frontend/src/App.jsx`
- **Purpose**: Main app container and navigation
- **Features**:
  - Tab navigation between views
  - Conditional rendering
  - App layout
- **Lines**: ~40
- **Structure**: Header, Main, Footer

#### `frontend/src/index.jsx`
- **Purpose**: React entry point
- **Creates**: Root React element and mounts to DOM
- **Important**: This is where React rendering starts

### Service Files

#### `frontend/src/services/api.js`
- **Purpose**: Centralized API communication
- **Functions**:
  - `getStudents()` - Fetch all students
  - `createStudent()` - Create new student
  - `updateStudent()` - Modify student
  - `deleteStudent()` - Remove student
  - `getCourses()` - Fetch courses
  - `enrollStudent()` - Enroll in course
  - `deleteEnrollment()` - Drop course
- **Usage**: Imported in components, uses Axios

### Style Files

#### `frontend/src/styles/EnrollmentForm.css`
- **Purpose**: Styling for enrollment form
- **Includes**:
  - Form layout with CSS Grid
  - Input field styling
  - Button styles
  - Success/error message styling
  - Responsive media queries

#### `frontend/src/styles/StudentList.css`
- **Purpose**: Styling for student list table
- **Includes**:
  - Table styling
  - Responsive table wrapper
  - Delete button styling
  - Hover effects

#### `frontend/src/App.css`
- **Purpose**: Main app styling
- **Includes**:
  - Header styling
  - Navigation tabs
  - Layout structure
  - Footer styling

#### `frontend/src/index.css`
- **Purpose**: Global CSS resets and base styles
- **Includes**: Font settings, basic element styling

### Configuration Files

#### `frontend/package.json`
- **Purpose**: Node.js project metadata and dependencies
- **Scripts**:
  - `npm start` - Run development server
  - `npm build` - Create production build
  - `npm test` - Run tests
- **Contains**: All npm package dependencies

#### `frontend/public/index.html`
- **Purpose**: Base HTML file
- **Contains**: Root div where React app mounts
- **Important**: Loaded by npm-dev-server

#### `frontend/.env`
- **Purpose**: Frontend environment variables
- **Variables**:
  - `REACT_APP_API_URL` - Backend API URL
- **Note**: Must start with REACT_APP_ prefix

---

## 📊 Database Files

#### `database_setup.sql`
- **Purpose**: Complete database initialization script
- **Contains**:
  - Database creation
  - Table definitions with constraints
  - Indexes for performance
  - Sample data insertion (8 courses)
- **Usage**: Run in MySQL before starting backend
- **Lines**: ~100+

---

## 📖 Documentation Files

#### `README.md` - Main Documentation
- **Contains**:
  - Project overview
  - Features list
  - Prerequisites
  - Step-by-step installation
  - API endpoints overview
  - Troubleshooting section
- **Best for**: Complete understanding of project
- **Length**: ~400 lines

#### `QUICK_START.md` - Fast Setup Guide
- **Contains**:
  - 5-step setup process
  - Quick command reference
  - Common commands
  - Database management tips
- **Best for**: Getting started quickly
- **Time**: ~15 minutes

#### `WINDOWS_SETUP_GUIDE.md` - Windows Specific
- **Contains**:
  - Windows prerequisites installation
  - Step-by-step setup for Windows
  - Testing procedures
  - Windows troubleshooting
  - Windows commands reference
- **Best for**: Windows users
- **Very detailed**: Covers every step
- **Length**: ~500 lines

#### `API_DOCUMENTATION.md` - API Reference
- **Contains**:
  - All endpoint documentation
  - Request/response examples
  - Error codes explanation
  - cURL examples
  - Status codes reference
- **Best for**: Frontend developers, API consumers
- **Reference**: Complete API specification

#### `ARCHITECTURE.md` - System Design
- **Contains**:
  - System architecture diagram (ASCII)
  - Data flow diagram
  - Technology stack
  - Database schema relationships
  - Performance optimizations
  - Scalability notes
- **Best for**: Understanding system design
- **Visual**: Includes ASCII diagrams

#### `PROJECT_FILES_GUIDE.md` - This File
- **Purpose**: Reference for all files in project
- **Shows**: Purpose and contents of each file
- **Usage**: Quick lookup for file information

---

## 🛠️ Configuration Files

#### `.env` (Backend & Frontend)
- **Backend `.env`**: Database connection, Flask settings
- **Frontend `.env`**: API endpoint URL
- **Important**: Don't commit to version control (in .gitignore)

#### `.gitignore`
- **Purpose**: Tell Git which files to ignore
- **Ignores**:
  - Virtual environments (`venv/`)
  - Node modules (`node_modules/`)
  - Environment files (`.env`)
  - IDE folders (`.vscode/`, `.idea/`)
  - Compiled files (`__pycache__/`)
  - Logs and OS files

#### `package.json` (Root)
- **Purpose**: Project metadata and scripts
- **Contains**:
  - Project name and version
  - Scripts for setup and running
  - Project description
  - Keywords and author

---

## 📋 How to Use This Guide

### Finding a Specific File

1. **Looking for backend code?** → See Backend Files section
2. **Looking for React components?** → See Frontend/Component Files
3. **Looking for styles?** → See Frontend/Style Files
4. **Looking for API endpoints?** → See API_DOCUMENTATION.md

### Quick Lookups

| Need | File | Section |
|------|------|---------|
| How to run | QUICK_START.md | Step 1-5 |
| API endpoints | API_DOCUMENTATION.md | Base URL section |
| System design | ARCHITECTURE.md | Architecture Diagram |
| Backend logic | backend/app.py | Route definitions |
| Form handling | frontend/src/components/EnrollmentForm.jsx | State management |
| Database schema | database_setup.sql | CREATE TABLE statements |
| Environment setup | WINDOWS_SETUP_GUIDE.md | Prerequisites section |

---

## 📏 File Size Reference

| File | Type | Size | Complexity |
|------|------|------|------------|
| app.py | Backend | ~400 lines | High |
| models.py | Backend | ~150 lines | Medium |
| EnrollmentForm.jsx | Frontend | ~150 lines | Medium |
| StudentList.jsx | Frontend | ~60 lines | Low |
| database_setup.sql | Database | ~100 lines | Medium |
| README.md | Documentation | ~400 lines | Reference |
| WINDOWS_SETUP_GUIDE.md | Documentation | ~500 lines | Tutorial |

---

## 🔍 File Dependencies

```
app.py
  ├─ imports from models.py
  ├─ imports from config.py
  └─ uses mysql-connector

models.py
  └─ imports SQLAlchemy

EnrollmentForm.jsx
  ├─ imports api.js
  └─ uses React hooks

StudentList.jsx
  ├─ imports api.js
  └─ uses React hooks

api.js
  └─ uses Axios

database_setup.sql
  └─ creates tables for models.py
```

---

## 💡 Key Implementation Details

### Backend Validation (app.py)
- Email uniqueness check
- Required field validation
- Date format validation
- Course capacity checking

### Frontend Validation (EnrollmentForm.jsx)
- HTML5 input validation
- Form state management
- Error/success messaging
- Loading states

### Database Design (database_setup.sql)
- Foreign key constraints
- Unique constraints
- Indexes for performance
- Cascade delete rules

---

## 🚀 Common Modifications

### Adding a New Field to Students
1. Edit `database_setup.sql` - Add column
2. Edit `models.py` - Add to Student model
3. Edit `EnrollmentForm.jsx` - Add form input
4. Edit `StudentList.jsx` - Add to table display

### Adding a New API Endpoint
1. Edit `app.py` - Create route function
2. Edit `api.js` - Create API call function
3. Edit component - Call the new function

### Changing Database
1. Update DATABASE_URL in `.env`
2. Run `database_setup.sql` on new database
3. Restart backend

---

## 📝 Notes

- All files use UTF-8 encoding
- Python follows PEP 8 style guide
- JavaScript uses ES6+ syntax
- SQL follows MySQL syntax
- Documentation uses Markdown format

---

**Last Updated**: May 2, 2026

