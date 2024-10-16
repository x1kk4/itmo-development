from rest_framework import serializers
from coach.models import Coach, TrainingSession
from client.models import Child
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
        queryset=Child.objects.all(),
        slug_field='name',
        required=False  
    )

    class Meta:
        model = TrainingSession
        fields = '__all__'
