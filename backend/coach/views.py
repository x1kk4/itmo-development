from rest_framework import viewsets
from coach.models import Coach, Session, Event, TrainingSession, Branch
from coach.serializers import CoachSerializer, SessionSerializer, EventSerializer, TrainingSessionSerializer, BranchSerializer

class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

class CoachViewSet(viewsets.ModelViewSet):
    queryset = Coach.objects.all()
    serializer_class = CoachSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

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
