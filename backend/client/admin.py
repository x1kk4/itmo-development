from django.contrib import admin
from .models import Client, Branch, Child

# 注册 Client 模型
admin.site.register(Client)

# 注册 Branch 模型
admin.site.register(Branch)

# 注册 Child 模型
admin.site.register(Child)
