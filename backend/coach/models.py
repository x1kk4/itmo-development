from django.db import models
from client.models import Child, Subscription, Branch

class Coach(models.Model):
    name = models.CharField(max_length=100)
    login = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)

class Session(models.Model):
    coach = models.ForeignKey(Coach, related_name='sessions', on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    group_level = models.CharField(max_length=50)

class Event(models.Model):
    name = models.CharField(max_length=200)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    coach = models.ForeignKey(Coach, related_name='events', on_delete=models.CASCADE)

class TrainingSession(models.Model):
    coach = models.ForeignKey(Coach, related_name='training_sessions', on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    attendees = models.ManyToManyField(Child, related_name='training_sessions')
    branch = models.ForeignKey(Branch, related_name='training_sessions', on_delete=models.CASCADE)


    def end_session(self):
        for child in self.attendees.all():
            subscription = Subscription.objects.get(client=child.parent)
            subscription.session_count -= 1
            subscription.save()
