from rest_framework import viewsets
from .models import Coach, Session
from .serializers import CoachSerializer, SessionSerializer

class CoachViewSet(viewsets.ModelViewSet):
    queryset = Coach.objects.all()
    serializer_class = CoachSerializer

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer

from rest_framework import viewsets
from .models import Coach, Event, Session
from .serializers import CoachSerializer, EventSerializer, SessionSerializer

class CoachViewSet(viewsets.ModelViewSet):
    queryset = Coach.objects.all()
    serializer_class = CoachSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class SessionViewSet(viewsets.ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer
