# client/serializers.py
from rest_framework import serializers
from .models import Client, Child, Branch, Subscription

class ClientSerializer(serializers.ModelSerializer):
    children = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    
    class Meta:
        model = Client
        fields = ['id', 'children', 'name', 'username', 'contact_info', 'subscription']
        depth = 1
        # fields = '__all__'

class ChildSerializer(serializers.ModelSerializer):
    branch = serializers.PrimaryKeyRelatedField(queryset=Branch.objects.all())
    
    class Meta:
        model = Child
        fields = '__all__'

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['id', 'name', 'location', 'working_hours', 'contact_info', 'image']

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'


