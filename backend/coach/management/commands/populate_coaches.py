from django.core.management.base import BaseCommand
from coach.models import Coach, TrainingSession
from datetime import datetime, date, timedelta, time
import random
from client.models import Child

class Command(BaseCommand):
    help = 'Populates the database with initial data for coaches and training sessions.'

    def handle(self, *args, **options):
        self.create_coaches_and_sessions()

    def create_coaches_and_sessions(self):
        coach_data = [
            {"name": "Coach Michael", "login": "mike123", "password": "securepassword1", "salary": 50000.00},
            {"name": "Coach Annabel", "login": "anna456", "password": "securepassword2", "salary": 52000.00},
            {"name": "Coach Samuel", "login": "sam789", "password": "securepassword3", "salary": 53000.00}
        ]
        coaches = []
        for data in coach_data:
            coach, created = Coach.objects.get_or_create(
                login=data['login'],
                defaults=data
            )
            coaches.append(coach)

        children = list(Child.objects.all())
        today = date.today()
        times = [time(9, 0), time(10, 30), time(12, 0)]

        for coach in coaches:
            for i in range(3):  # Three sessions per coach with different times
                session_date = today + timedelta(days=i)
                session_time_start = times[i]
                session_time_end = (datetime.combine(today, session_time_start) + timedelta(hours=1)).time()
                session = TrainingSession.objects.create(
                    coach=coach,
                    date=session_date,
                    start_time=session_time_start,
                    end_time=session_time_end
                )
                # Distribute children among sessions for diversity
                session.attendees.set(random.sample(children, min(3, len(children))))
