#client/views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Client, Child, Branch, Subscription
from .serializers import ClientSerializer, ChildSerializer, BranchSerializer, SubscriptionSerializer
from django.db.models import Q
from django.core.exceptions import ValidationError
import json

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ChildViewSet(viewsets.ModelViewSet):
    queryset = Child.objects.all()
    serializer_class = ChildSerializer

    @action(methods=['put'], detail=False, url_path='batch-retrieve')
    def batch_retrieve(self, request):
        try:
            # Попробуй проанализировать данные JSON из тела запроса.
            data = json.loads(request.body)
            ids = data.get('ids', [])
            if not isinstance(ids, list) or not all(isinstance(id, int) for id in ids):
                raise ValidationError("ids must be a list of integers")
        except (json.JSONDecodeError, ValidationError) as e:
            return Response({'error': str(e)}, status=400)

        
        children = self.queryset.filter(id__in=ids)
        serializer = self.get_serializer(children, many=True)
        return Response(serializer.data)

class ClientSearchViewSet(viewsets.ViewSet):
    def list(self, request):
        query = request.query_params.get('query')
        clients = Client.objects.filter(Q(name__icontains=query) | Q(contact_info__icontains=query))
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)

class BranchViewSet(viewsets.ModelViewSet):
    queryset = Branch.objects.all()
    serializer_class = BranchSerializer

class SubsciptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
