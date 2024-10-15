from rest_framework import serializers
from coach.models import Coach, TrainingSession

class CoachSerializer(serializers.ModelSerializer):
    training_sessions = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='training-session-detail' 
    )

    class Meta:
        model = Coach
        fields = ['id', 'name', 'login', 'password', 'salary', 'training_sessions']

class TrainingSessionSerializer(serializers.ModelSerializer):
    attendees = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'  
    )

    class Meta:
        model = TrainingSession
        fields = '__all__'
