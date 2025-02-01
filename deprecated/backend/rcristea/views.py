from django.conf import settings
from django.core.mail import send_mail
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import TodoSerializer, ContactSerializer
from .models import Todo

# Create your views here.
class TodoView(viewsets.ModelViewSet):
    # viewsets base class provides implementation from CRUD operations
    serializer_class = TodoSerializer
    queryset = Todo.objects.all()

class ContactView(APIView):
    def post(self, request):
        serialize = ContactSerializer(request.data)

        name = request.data.get('name', None)
        email = request.data.get('email', None)
        message = request.data.get('message', None)

        send_mail(
            '%s sent a message from the portfolio website.' % name,
            'Email: %s \nMessage: \n%s' % (email, message),
            settings.EMAIL_HOST_USER,
            [settings.EMAIL_HOST_USER],
            fail_silently=False,
        )

        return Response(serialize.data, status=status.HTTP_201_CREATED)

