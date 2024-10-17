from django.db import models
from client.models import Child, Subscription, Branch

class Coach(models.Model):
    name = models.CharField(max_length=100)
    login = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)

class TrainingSession(models.Model):
    coach = models.ForeignKey(Coach, related_name='training_sessions', on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    attendees = models.ManyToManyField(Child, related_name='training_sessions')
    branch = models.ForeignKey(Branch, related_name='training_sessions', on_delete=models.CASCADE)
    children_list = models.ManyToManyField(Child, related_name='children_list_training_sessions')


    def end_session(self):
        for child in self.attendees.all():
            subscription = Subscription.objects.get(client=child.parent)
            subscription.session_count -= 1
            subscription.save()
