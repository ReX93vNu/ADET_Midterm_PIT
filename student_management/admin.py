from django.contrib import admin
from .models import Student, Course, StudentRecord

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('id', 'first_name', 'last_name', 'age', 'city')
    search_fields = ('first_name', 'last_name')

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('id', 'course_name', 'college')

@admin.register(StudentRecord)
class StudentRecordAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'course', 'year_level', 'enrollment_date')
    list_filter = ('course', 'year_level') 
