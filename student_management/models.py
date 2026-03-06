from django.db import models

class Student(models.Model):
    student_number = models.CharField(max_length=20, unique=True) # [cite: 16]
    first_name = models.CharField(max_length=100) # [cite: 17]
    last_name = models.CharField(max_length=100) # [cite: 18]
    course = models.CharField(max_length=100) # [cite: 19]
    year_level = models.IntegerField() # [cite: 20]
    created_at = models.DateTimeField(auto_now_add=True) # [cite: 21]

    class Meta:
        ordering = ['last_name'] # [cite: 30]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
