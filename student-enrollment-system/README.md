# Student Enrollment System

A comprehensive online student enrollment system built with React (frontend), Python Flask (backend), and Oracle database.

## Project Structure

```
student-enrollment-system/
├── backend/
│   ├── app.py                 # Flask application and API endpoints
│   ├── models.py              # Database models (SQLAlchemy)
│   ├── config.py              # Configuration settings
│   ├── requirements.txt        # Python dependencies
│   └── .env                   # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── services/          # API service calls
│   │   ├── styles/            # CSS stylesheets
│   │   ├── App.jsx            # Main app component
│   │   └── index.jsx          # React entry point
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── package.json           # Node dependencies
│   └── .env                   # Environment variables
└── database_setup.sql         # MySQL database initialization script
```

## Features

- **Student Enrollment**: Register new students with complete information
- **Student Management**: View, update, and delete student records
- **Course Management**: Manage available courses and capacity
- **Enrollment Management**: Enroll students in courses, track grades
- **Database Integration**: Persistent storage with MySQL
- **RESTful API**: Complete API endpoints for all operations
- **Responsive UI**: Modern, user-friendly interface

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Python 3.8+** - [Download](https://www.python.org/downloads/)
2. **Node.js 14+** - [Download](https://nodejs.org/)
3. **Oracle Database** - [Download](https://www.oracle.com/database/technologies/xe-downloads.html) (Express Edition)
4. **Oracle SQL Developer** - [Download](https://www.oracle.com/tools/downloads/sqldev-downloads.html)
5. **Git** (optional) - [Download](https://git-scm.com/)

## Step-by-Step Installation & Running Guide

### Step 1: Database Setup
Oracle SQL Developer**
   - Connection Name: Enter a name (e.g., "SystemDB")
   - Username: system
   - Password: your_oracle_password
   - Connection Type: Basic
   - Hostname: localhost
   - Port: 1521
   - Service Name: XE
   - Click "Save" then "Connect"

2. **Run the Database Setup Script**
   - In SQL Developer, open: `oracle_database_setup.sql`
   - Press **Ctrl+Enter** or click Execute button
   - Wait for completion

3. **Verify Database Creation**
   ```sql
   SELECT table_name FROM user_tables 
   WHERE table_name IN ('STUDENTS', 'COURSES', 'ENROLLMENTS');
   ```
   You should see 3 tables listedW TABLES;
   ```

### Step 2: Backend Setup (Python Flask)

1. **Navigate to Backend Directory**
   ```bash
   cd "C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\backend"
   ```

2. **Create a Virtual Environment**
   ```bash
   python -m venv venv
   ```

3. **Activate Virtual Environment**
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install Python Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure Database Connection**
   - Edit the `.env` file and update the DATABASE_URL:
     ```
     DATABASE_URL=oracle+cx_oracle://system:your_password@localhost:1521/?service_name=XE
     ```
   - Replace `your_password` with your Oracle system password

6. **Run the Flask Application**
   ```bash
   python app.py
   ```
   
   You should see output like:
   ```
   * Running on http://0.0.0.0:5000
   * Debug mode: on
   ```

**Backend is now running at**: `http://localhost:5000`

### Step 3: Frontend Setup (React)

1. **Open a New Terminal/Command Prompt**

2. **Navigate to Frontend Directory**
   ```bash
   cd "C:\Users\92300\Downloads\DBS PROJECT\student-enrollment-system\frontend"
   ```

3. **Install Node Dependencies**
   ```bash
   npm install
   ```

4. **Configure API Endpoint (Optional)**
   - Create a `.env` file in the frontend directory:
     ```
     REACT_APP_API_URL=http://localhost:5000/api
     ```

5. **Start the React Development Server**
   ```bash
   npm start
   ```
   
   The application will automatically open in your browser at:
   **Frontend URL**: `http://localhost:3000`

## API Endpoints

### Student Endpoints
- `GET /api/students` - Get all students
- `GET /api/students/<id>` - Get specific student
- `POST /api/students` - Create new student
- `PUT /api/students/<id>` - Update student
- `DELETE /api/students/<id>` - Delete student

### Course Endpoints
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course

### Enrollment Endpoints
- `GET /api/enrollments` - Get all enrollments
- `POST /api/enrollments` - Enroll student in course
- `DELETE /api/enrollments/<id>` - Drop course
- `GET /api/students/<id>/courses` - Get courses for a student

## Usage

1. **Access the Application**
   - Open your browser and go to `http://localhost:3000`

2. **Enroll a Student**
   - Click on "Enroll Student" tab
   - Fill in all the required information
   - Click "Enroll Student" button

3. **View Enrolled Students**
   - Click on "View Students" tab
   - See list of all enrolled students
   - Delete students if needed

## Troubleshooting

### Database Connection Error
- Ensure Oracle Database is running (check Services: OracleServiceXE)
- Verify the DATABASE_URL in `.env` file matches your Oracle setup
- Check Oracle listener is running on port 1521
- See [ORACLE_SETUP_GUIDE.md](ORACLE_SETUP_GUIDE.md) for detailed troubleshooting

### Port Already in Use
- Flask: Change port in `app.py` → `app.run(port=5001)`
- React: Set port via environment → `set PORT=3001` then `npm start`

### Module Not Found Error (Python)
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt` again

### npm install Error
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

### CORS Error
- Ensure Flask-CORS is installed and enabled
- Check that the API_BASE_URL in frontend matches the backend URL

## Default Credentials

- **Oracle System User**: `system`
- **Oracle Default Password**: Set during installation
- **Oracle Service Name**: `XE`
- **Oracle Port**: `1521`

## Technologies Used

### Backend
- Flask 2.3.0
- SQLAlchemy 3.0.5
- MySQL Connector/Python 8.0.33
- Flask-CORS 4.0.0

### Frontend
- React 18.2.0
- Axios 1.4.0
- React Router 6.11.0

### Database
- MySQL 8.0+

## Demo Data

Sample courses are pre-loaded in the database:
- CS101, CS102, CS201 (Computer Science courses)
- MATH101, MATH102 (Mathematics courses)
- BUS101, BUS201 (Business courses)
- ENG101 (English course)

## Future Enhancements

- User authentication and authorization
- Grade management system
- Course schedule and classroom assignment
- Payment processing
- Email notifications
- Advanced reporting and analytics
- Student transcript generation
- Mobile app version

## License

This project is open source and available for educational purposes.

## Support

For issues or questions, please check the troubleshooting section or review the code comments.

---

**Happy Learning!** 🎓
