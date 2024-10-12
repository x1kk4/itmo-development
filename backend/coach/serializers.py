from rest_framework import serializers
from coach.models import Coach, Session, Event, TrainingSession, Branch

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = '__all__'

class CoachSerializer(serializers.ModelSerializer):
    events = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='event-detail'
    )
    sessions = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='session-detail'  
    )
    training_sessions = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='training-session-detail' 
    )

    class Meta:
        model = Coach
        fields = ['id', 'name', 'login', 'password', 'salary', 'events', 'sessions', 'training_sessions']

class EventSerializer(serializers.ModelSerializer):
    coach = serializers.ReadOnlyField(source='coach.name')

    class Meta:
        model = Event
        fields = '__all__'

class SessionSerializer(serializers.ModelSerializer):
    coach = serializers.ReadOnlyField(source='coach.name') 

    class Meta:
        model = Session
        fields = '__all__'

class TrainingSessionSerializer(serializers.ModelSerializer):
    attendees = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'  
    )

    class Meta:
        model = TrainingSession
        fields = '__all__'
