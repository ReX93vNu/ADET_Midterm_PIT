from django.contrib import admin
from .models import Student # Import your model [cite: 14]

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    # This fulfills the "View all students" and "ORDER BY" requirements [cite: 5, 30]
    list_display = ('student_number', 'first_name', 'last_name', 'course', 'year_level') 
    
    # This fulfills the "Search student by name" requirement [cite: 8, 29]
    search_fields = ('first_name', 'last_name', 'student_number') 
    
    # This fulfills the "Filter by course" requirement [cite: 9, 66]
    list_filter = ('course',)
