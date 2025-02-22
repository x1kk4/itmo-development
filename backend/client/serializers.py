# client/serializers.py
from rest_framework import serializers
from .models import Client, Child, Branch, Subscription

class SubscriptionSerializer(serializers.ModelSerializer):
    client = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all())

    class Meta:
        model = Subscription
        fields = ['id', 'client', 'session_count']

class ClientSerializer(serializers.ModelSerializer):
    children = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    subscription = serializers.PrimaryKeyRelatedField(read_only=True, allow_null=True)
    
    class Meta:
        model = Client
        fields = ['id', 'children', 'name', 'username', 'contact_info', 'subscription']

class ChildSerializer(serializers.ModelSerializer):
    branch = serializers.PrimaryKeyRelatedField(queryset=Branch.objects.all())
    
    class Meta:
        model = Child
        fields = '__all__'

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['id', 'name', 'location', 'working_hours', 'contact_info', 'image']




