from django.contrib import admin
from .models import Client, Branch, Child, Subscription
admin.site.register(Client)
admin.site.register(Branch)
admin.site.register(Child)
admin.site.register(Subscription)