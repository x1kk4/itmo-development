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