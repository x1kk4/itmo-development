# client/models.py

from django.db import models

class Branch(models.Model):
    # Model field definitions
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    class Meta:
        app_label = 'client'  


class Client(models.Model):
    name = models.CharField(max_length=100)
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    contact_info = models.CharField(max_length=150)
    branches = models.ManyToManyField('Branch', related_name='clients')

class Child(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    group_level = models.CharField(max_length=50)
    parent = models.ForeignKey(Client, related_name='children', on_delete=models.CASCADE)
