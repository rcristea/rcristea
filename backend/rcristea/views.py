from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TodoSerializer
from .models import Todo

# Create your views here.

class TodoView(viewsets.ModelViewSet):
    # viewsets base class provides implementation from CRUD operations
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()