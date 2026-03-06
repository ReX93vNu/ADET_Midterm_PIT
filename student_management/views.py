from rest_framework import viewsets, filters
from .models import Student
from .serializers import StudentSerializer

class StudentViewSet(viewsets.ModelViewSet):
    # SELECT all students & ORDER BY last_name ASC [cite: 25, 30]
    queryset = Student.objects.all().order_by('last_name') 
    serializer_class = StudentSerializer

    # SEARCH using LIKE (Handles "Search student by name") [cite: 8, 29]
    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name', 'last_name']