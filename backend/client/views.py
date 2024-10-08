from rest_framework import viewsets
from .models import Client, Child
from .serializers import ClientSerializer, ChildSerializer
from rest_framework.response import Response

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ChildViewSet(viewsets.ModelViewSet):
    queryset = Child.objects.all()
    serializer_class = ChildSerializer
# views.py in client app
from django.db.models import Q

class ClientSearchViewSet(viewsets.ViewSet):
    def list(self, request):
        query = request.query_params.get('query')
        clients = Client.objects.filter(Q(name__icontains=query) | Q(contact_info__icontains=query))
        serializer = ClientSerializer(clients, many=True)
        return Response(serializer.data)
