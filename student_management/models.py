from django.db import models

class Course(models.Model): # course table
    # increments id by default
    course_name = models.CharField(max_length=100)
    college = models.CharField(max_length=100)

    def __str__(self):
        return self.course_name

class Student(models.Model): # student table
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    age = models.IntegerField()
    city = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class StudentRecord(models.Model): # student records table
    student = models.ForeignKey(Student, on_delete=models.CASCADE) # gets the student ID, first name, and last name
    course = models.ForeignKey(Course, on_delete=models.CASCADE) # gets the course of the student
    year_level = models.IntegerField(default=1) 
    enrollment_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.last_name} - {self.course.course_name} ({self.year_level})"







