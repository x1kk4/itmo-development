from django.contrib import admin
from .models import Coach, TrainingSession, Event, Branch

# 注册 Coach 模型
admin.site.register(Coach)

# 注册 TrainingSession 模型
admin.site.register(TrainingSession)

# 注册 Event 模型
admin.site.register(Event)

# 注册 Branch 模型
admin.site.register(Branch)
