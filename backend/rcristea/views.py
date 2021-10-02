from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import TodoSerializer, ContactSerializer
from .models import Todo, Contact

# Create your views here.

class TodoView(viewsets.ModelViewSet):
    # viewsets base class provides implementation from CRUD operations
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

class ContactView(viewsets.ModelViewSet):
    serializer_class = ContactSerializer
    queryset = Contact.objects.all()

    def postResponse(request):
        return HttpResponse('Contact Test')
