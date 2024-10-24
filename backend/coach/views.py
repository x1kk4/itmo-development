from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Q
from django.core.exceptions import ValidationError
from django.http import HttpResponse
import json

from coach.models import Coach, TrainingSession
from coach.serializers import CoachSerializer, TrainingSessionSerializer

class CoachViewSet(viewsets.ModelViewSet):
    queryset = Coach.objects.all()
    serializer_class = CoachSerializer

class TrainingSessionViewSet(viewsets.ModelViewSet):
    queryset = TrainingSession.objects.all()
    serializer_class = TrainingSessionSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        coach_id = self.request.query_params.get('coach_id')
        child_ids = self.request.query_params.getlist('child_ids')
        if coach_id:
            queryset = queryset.filter(coach_id=coach_id)
        if child_ids:
            queryset = queryset.filter(attendees__id__in=child_ids)
        return queryset

    @action(methods=['put'], detail=False, url_path='batch-retrieve')
    def batch_retrieve(self, request):
        try:
            data = json.loads(request.body)
            ids = data.get('ids', [])
            if not isinstance(ids, list) or not all(isinstance(id, int) for id in ids):
                raise ValidationError("ids must be a list of integers")
        except (json.JSONDecodeError, ValidationError) as e:
            return Response({'error': str(e)}, status=400)

        sessions = self.queryset.filter(id__in=ids)
        serializer = self.get_serializer(sessions, many=True)
        return Response(serializer.data)

def home(request):
    message = """
    <h1>Welcome to the API</h1>
    <p>Please visit <a href='/api/v1/swagger/'>Swagger documentation</a> to explore the API.</p>
    """
    return HttpResponse(message)
