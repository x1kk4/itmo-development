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
    branches_data = [
        {"name": "1-й Верхний пер., 2", "address": "60.054826, 30.379982", "image": "https://avatars.mds.yandex.net/get-altay/5477999/2a0000017e526c9245e91979cfbc367b9d5d/L_height"},
        {"name": "ш. Революции, 84АБ", "address": "59.963156, 30.457883", "image": "https://avatars.mds.yandex.net/get-altay/5448678/2a0000017d380ed520715939ff36c2a5efe0/L_height"},
        {"name": "просп. Динамо, 44", "address": "59.968079, 30.265652", "image": "https://avatars.mds.yandex.net/get-altay/10963815/2a0000018dead45e5a04d663321f14562b45/L_height"},
        {"name": "пер. Челиева, 13В", "addressn": "59.889178, 30.477655", "image": "https://avatars.mds.yandex.net/get-altay/4379646/2a00000190cb6179799826ed4c580adb913f/L_height"},
        {"name": "Приморский просп., 50Б", "address": "59.982533, 30.240089", "image": "https://avatars.mds.yandex.net/get-altay/9686455/2a00000189a2fa6c49f764512aaa17124c26/L_height"},
        {"name": "Екатерининский просп., 3, корп. 2", "address": "59.977877, 30.438937", "image": "https://avatars.mds.yandex.net/get-altay/10350441/2a0000018deac27e8026e3f662553769062a/L_height"},
        {"name": "Петергофское ш., 5, корп. 3", "address": "59.848521, 30.204504", "image": "https://avatars.mds.yandex.net/get-altay/10834132/2a0000018e0a843651a42e001100b8511f9b/L_height"},
        {"name": "Афонская ул., 5", "address": "60.018014, 30.305678", "image": "https://avatars.mds.yandex.net/get-altay/4699294/2a0000017b7c7706e33656bd36104e221904/L_height"}
    ]
    for data in branch_data:
        branch, created = Branch.objects.get_or_create(name=data['name'], defaults=data)
        if created:
            print(f'Created branch: {branch.name}')
        else:
            print(f'Branch already exists: {branch.name}')

if __name__ == '__main__':
    create_branches()


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
    #levels = ["Beginner", "Intermediate", "Advanced"]
    for parent in parents:
        #for level in levels:
        Child.objects.create(
            name=f"Ребёнок {parent.name}",
            age=random.randint(5, 18),
            #group_level=level,
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
