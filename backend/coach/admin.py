from django.contrib import admin
from .models import Coach, TrainingSession

#  Coach
admin.site.register(Coach)

# admin.py
admin.site.register(TrainingSession)
from .models import Subscription
admin.site.register(Subscription)  
