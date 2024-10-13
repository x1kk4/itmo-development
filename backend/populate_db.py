import os
import django
from datetime import datetime, date, timedelta, time
import random
from django.db import IntegrityError  # 正确的导入位置

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "nevskie_medvedi.settings")
django.setup()

from client.models import Client, Branch, Child
from coach.models import Coach, TrainingSession



def create_branches():
    branch_names = ["Downtown Complex", "Uptown Facility", "Midtown Hub"]
    branch_locations = ["123 Main St", "456 Elm St", "789 Pine St"]
    branches = []
    for name, location in zip(branch_names, branch_locations):
        branch, created = Branch.objects.get_or_create(name=name, location=location)
        branches.append(branch)
    return branches


def create_clients(branches):
    client_data = [
        {"name": "Johnathan Doe", "username": "john_doe_123", "password": "complexpassword123", "contact_info": "john.doe@example.com"},
        {"name": "Jane Smithers", "username": "jane_smithers_456", "password": "complexpassword456", "contact_info": "jane.smithers@example.com"},
        {"name": "Alice Johnsonson", "username": "alice_johnsonson_789", "password": "complexpassword789", "contact_info": "alice.johnsonson@example.com"}
    ]
    for data in client_data:
        try:
            client, created = Client.objects.get_or_create(
                username=data['username'],
                defaults=data
            )
            if created:
                client.branches.set(branches)
        except IntegrityError:
            print(f"Client with username {data['username']} already exists.")


def create_children():
    parents = Client.objects.all()
    levels = ["Beginner", "Intermediate", "Advanced"]
    for parent in parents:
        for level in levels:
            Child.objects.create(
                name=f"{parent.name}'s Child - {level}",
                age=random.randint(5, 18),
                group_level=level,
                parent=parent
            )


def create_coaches_and_sessions():
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

if __name__ == '__main__':
    branches = create_branches()
    create_clients(branches)
    create_children()
    create_coaches_and_sessions()
