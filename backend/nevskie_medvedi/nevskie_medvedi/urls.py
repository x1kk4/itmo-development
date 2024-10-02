from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from coach.views import CoachViewSet, EventViewSet, SessionViewSet
from client.views import ClientViewSet, ChildViewSet

router = DefaultRouter()
router.register(r'coaches', CoachViewSet)
router.register(r'sessions', SessionViewSet)
router.register(r'events', EventViewSet)
router.register(r'clients', ClientViewSet)
router.register(r'children', ChildViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
