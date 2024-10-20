# coach/views.py
from rest_framework import viewsets
from coach.models import Coach, TrainingSession
from coach.serializers import CoachSerializer, TrainingSessionSerializer

class CoachViewSet(viewsets.ModelViewSet):
    queryset = Coach.objects.all()
    serializer_class = CoachSerializer

class TrainingSessionViewSet(viewsets.ModelViewSet):
    queryset = TrainingSession.objects.all()
    serializer_class = TrainingSessionSerializer


from django.http import HttpResponse

def home(request):
    message = """
    <h1>Welcome to the API</h1>
    <p>Please visit <a href='/api/v1/swagger/'>Swagger documentation</a> to explore the API.</p>
    """
    return HttpResponse(message)
from rest_framework import viewsets
from coach.models import Coach, TrainingSession
from coach.serializers import CoachSerializer, TrainingSessionSerializer

class CoachViewSet(viewsets.ModelViewSet):
    queryset = Coach.objects.all()
    serializer_class = CoachSerializer

class TrainingSessionViewSet(viewsets.ModelViewSet):
    queryset = TrainingSession.objects.all()
    serializer_class = TrainingSessionSerializer


from django.http import HttpResponse

def home(request):
    message = """
    <h1>Welcome to the API</h1>
    <p>Please visit <a href='/api/v1/swagger/'>Swagger documentation</a> to explore the API.</p>
    """
    return HttpResponse(message)

from django.db.models import Q

class TrainingSessionViewSet(viewsets.ModelViewSet):
    queryset = TrainingSession.objects.all()
    serializer_class = TrainingSessionSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        coach_id = self.request.query_params.get('coach_id')
        child_ids = self.request.query_params.getlist('child_ids')  # 获取多个child_ids
        if coach_id:
            queryset = queryset.filter(coach_id=coach_id)
        if child_ids:
            queryset = queryset.filter(attendees__id__in=child_ids)
        return queryset
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from coach.views import TrainingSessionViewSet

router = DefaultRouter()
router.register(r'training_sessions', TrainingSessionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
