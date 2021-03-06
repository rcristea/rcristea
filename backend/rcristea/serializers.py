"""
    Serializers convert model instances to JSON so React can work with the data recieved.
"""

from rest_framework import serializers
from .models import Todo, Contact

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'title', 'description', 'completed')

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ('id', 'name', 'email', 'message')