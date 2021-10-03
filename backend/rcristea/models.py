from django.db import models

# Create your models here.

class Todo(models.Model):
  title = models.CharField(max_length=120)
  description = models.TextField()
  completed = models.BooleanField(default=False)

  def __str__(self):
    return self.title

class Contact(models.Model):
  name = models.CharField(max_length=120)
  email = models.EmailField()
  message = models.TextField()

  def __str__(self):
      return self.email

