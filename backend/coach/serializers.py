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
        view_name='event-detail'  # 确保这个视图名称匹配你的URL名称。
    )
    sessions = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='session-detail'  # 同上，确保匹配。
    )
    training_sessions = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='training-session-detail'  # 添加对训练会话的引用。
    )

    class Meta:
        model = Coach
        fields = ['id', 'name', 'login', 'password', 'salary', 'events', 'sessions', 'training_sessions']

class EventSerializer(serializers.ModelSerializer):
    coach = serializers.ReadOnlyField(source='coach.name')  # 显示教练的名字而不是ID。

    class Meta:
        model = Event
        fields = '__all__'

class SessionSerializer(serializers.ModelSerializer):
    coach = serializers.ReadOnlyField(source='coach.name')  # 同上，显示教练名字。

    class Meta:
        model = Session
        fields = '__all__'

class TrainingSessionSerializer(serializers.ModelSerializer):
    attendees = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'  # 假设 Children 模型有名字字段。
    )

    class Meta:
        model = TrainingSession
        fields = '__all__'
