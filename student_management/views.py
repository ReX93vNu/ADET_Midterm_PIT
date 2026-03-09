# class StudentViewSet(viewsets.mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet, mixins.DestroyModelMixin): #CRUD using built in django class

from rest_framework import viewsets, filters, mixins
from .models import Student, Course, StudentRecord
from .serializers import StudentSerializer, CourseSerializer, StudentRecordSerializer

class StudentViewSet(viewsets.mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet, mixins.DestroyModelMixin): # for demonstration purposes. (viewsets.ModelViewSet) is better if you need all CRUD
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class StudentRecordViewSet(viewsets.ModelViewSet):
    queryset = StudentRecord.objects.all().order_by('student__last_name')
    serializer_class = StudentRecordSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['student__first_name', 'student__last_name', 'course__course_name'] 