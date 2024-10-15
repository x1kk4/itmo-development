from django.contrib import admin
from .models import Coach, TrainingSession

# 注册 Coach 模型
admin.site.register(Coach)

# 注册 TrainingSession 模型
admin.site.register(TrainingSession)