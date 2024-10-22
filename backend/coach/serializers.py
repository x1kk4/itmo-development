#coach/serializers.py
from rest_framework import serializers
from coach.models import Coach, TrainingSession
from client.models import Child
class CoachSerializer(serializers.ModelSerializer):
    training_sessions = serializers.PrimaryKeyRelatedField(
        many=True,
        read_only=True,
         
    )

    class Meta:
        model = Coach
        fields = ['id', 'name', 'login', 'salary', 'training_sessions']

class TrainingSessionSerializer(serializers.ModelSerializer):
    attendees = serializers.SlugRelatedField(
        many=True,
        queryset=Child.objects.all(),
        slug_field='id',
        required=False  
    )

    children_list = serializers.SlugRelatedField(
        many=True,
        queryset=Child.objects.all(),
        slug_field='id',
        required=False  
    )

    class Meta:
        model = TrainingSession
        fields = '__all__'
