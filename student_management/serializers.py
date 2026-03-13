from rest_framework import serializers
from .models import Student, Course, StudentRecord

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class StudentRecordSerializer(serializers.ModelSerializer):
    student_id = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.all(), source='student'
    )
    course_id = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(), source='course'
    )

    class Meta:
        model = StudentRecord
        fields = ['id', 'student', 'student_id', 'course', 'course_id', 'year_level', 'enrollment_date']
        depth = 1