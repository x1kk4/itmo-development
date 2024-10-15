from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Client, Child, Branch
from .serializers import ClientSerializer, ChildSerializer, BranchSerializer
from django.db.models import Q

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ChildViewSet(viewsets.ModelViewSet):
    queryset = Child.objects.all()
    serializer_class = ChildSerializer

    @action(detail=True, methods=['get'])
    def children(self, request, pk=None):
        client = self.get_object()
        children = client.children.all()
        serializer = ChildSerializer(children, many=True)
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
