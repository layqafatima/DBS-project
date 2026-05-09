import oracledb
oracledb.init_oracle_client(lib_dir=r"C:\oracle\instantclient\instantclient_23_0")

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from models import db, Student, Course, Enrollment
from config import config
import os

def create_app(config_name=None):
    """Application factory"""
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    
    with app.app_context():
        db.create_all()
    
    @app.route('/', methods=['GET'])
    def health_check():
        return jsonify({'status': 'API is running', 'timestamp': datetime.utcnow().isoformat()}), 200
    
    @app.route('/api/students', methods=['GET'])
    def get_students():
        try:
            students = Student.query.all()
            return jsonify([student.to_dict() for student in students]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/students/<int:student_id>', methods=['GET'])
    def get_student(student_id):
        try:
            student = Student.query.get(student_id)
            if not student:
                return jsonify({'error': 'Student not found'}), 404
            return jsonify(student.to_dict()), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/students', methods=['POST'])
    def create_student():
        try:
            data = request.get_json()
            
            required_fields = ['first_name', 'last_name', 'email', 'phone', 
                             'date_of_birth', 'gender', 'address', 'city', 
                             'state', 'postal_code', 'program']
            
            for field in required_fields:
                if field not in data or not data[field]:
                    return jsonify({'error': f'Missing required field: {field}'}), 400
            
            if Student.query.filter_by(email=data['email']).first():
                return jsonify({'error': 'Email already exists'}), 400
            
            student = Student(
                first_name=data['first_name'],
                last_name=data['last_name'],
                email=data['email'],
                phone=data['phone'],
                date_of_birth=datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date(),
                gender=data['gender'],
                address=data['address'],
                city=data['city'],
                state=data['state'],
                postal_code=data['postal_code'],
                program=data['program'],
                status=data.get('status', 'Active')
            )
            
            db.session.add(student)
            db.session.commit()
            
            return jsonify({
                'message': 'Student enrolled successfully',
                'student': student.to_dict()
            }), 201
        except ValueError as e:
            return jsonify({'error': f'Invalid date format: {str(e)}'}), 400
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/students/<int:student_id>', methods=['PUT'])
    def update_student(student_id):
        try:
            student = Student.query.get(student_id)
            if not student:
                return jsonify({'error': 'Student not found'}), 404
            
            data = request.get_json()
            
            if 'first_name' in data:
                student.first_name = data['first_name']
            if 'last_name' in data:
                student.last_name = data['last_name']
            if 'phone' in data:
                student.phone = data['phone']
            if 'address' in data:
                student.address = data['address']
            if 'city' in data:
                student.city = data['city']
            if 'state' in data:
                student.state = data['state']
            if 'postal_code' in data:
                student.postal_code = data['postal_code']
            if 'program' in data:
                student.program = data['program']
            if 'status' in data:
                student.status = data['status']
            
            db.session.commit()
            return jsonify({
                'message': 'Student updated successfully',
                'student': student.to_dict()
            }), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/students/<int:student_id>', methods=['DELETE'])
    def delete_student(student_id):
        try:
            student = Student.query.get(student_id)
            if not student:
                return jsonify({'error': 'Student not found'}), 404
            
            db.session.delete(student)
            db.session.commit()
            return jsonify({'message': 'Student deleted successfully'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/courses', methods=['GET'])
    def get_courses():
        try:
            courses = Course.query.all()
            return jsonify([course.to_dict() for course in courses]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/courses', methods=['POST'])
    def create_course():
        try:
            data = request.get_json()
            
            required_fields = ['course_code', 'course_name', 'credits', 'capacity']
            for field in required_fields:
                if field not in data or not data[field]:
                    return jsonify({'error': f'Missing required field: {field}'}), 400
            
            if Course.query.filter_by(course_code=data['course_code']).first():
                return jsonify({'error': 'Course code already exists'}), 400
            
            course = Course(
                course_code=data['course_code'],
                course_name=data['course_name'],
                description=data.get('description', ''),
                credits=data['credits'],
                capacity=data['capacity']
            )
            
            db.session.add(course)
            db.session.commit()
            
            return jsonify({
                'message': 'Course created successfully',
                'course': course.to_dict()
            }), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/enrollments', methods=['GET'])
    def get_enrollments():
        try:
            enrollments = Enrollment.query.all()
            return jsonify([enrollment.to_dict() for enrollment in enrollments]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/enrollments', methods=['POST'])
    def create_enrollment():
        try:
            data = request.get_json()
            
            if 'student_id' not in data or 'course_id' not in data:
                return jsonify({'error': 'Missing student_id or course_id'}), 400
            
            student = Student.query.get(data['student_id'])
            if not student:
                return jsonify({'error': 'Student not found'}), 404
            
            course = Course.query.get(data['course_id'])
            if not course:
                return jsonify({'error': 'Course not found'}), 404
            
            existing = Enrollment.query.filter_by(
                student_id=data['student_id'],
                course_id=data['course_id']
            ).first()
            if existing:
                return jsonify({'error': 'Student already enrolled in this course'}), 400
            
            enrolled_count = Enrollment.query.filter_by(course_id=data['course_id']).count()
            if enrolled_count >= course.capacity:
                return jsonify({'error': 'Course is at full capacity'}), 400
            
            enrollment = Enrollment(
                student_id=data['student_id'],
                course_id=data['course_id']
            )
            
            db.session.add(enrollment)
            db.session.commit()
            
            return jsonify({
                'message': 'Enrollment successful',
                'enrollment': enrollment.to_dict()
            }), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/enrollments/<int:enrollment_id>', methods=['DELETE'])
    def delete_enrollment(enrollment_id):
        try:
            enrollment = Enrollment.query.get(enrollment_id)
            if not enrollment:
                return jsonify({'error': 'Enrollment not found'}), 404
            
            db.session.delete(enrollment)
            db.session.commit()
            return jsonify({'message': 'Enrollment deleted successfully'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/students/<int:student_id>/courses', methods=['GET'])
    def get_student_courses(student_id):
        try:
            student = Student.query.get(student_id)
            if not student:
                return jsonify({'error': 'Student not found'}), 404
            
            enrollments = Enrollment.query.filter_by(student_id=student_id).all()
            return jsonify([enrollment.to_dict() for enrollment in enrollments]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Endpoint not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)