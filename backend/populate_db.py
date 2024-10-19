import os
import django
from django.db import IntegrityError

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "nevskie_medvedi.settings")
django.setup()

from client.models import Client, Branch, Child
from coach.models import Coach, TrainingSession

def create_branches():
    branches_data = [
        {"name": "1-й Верхний пер., 2", "location": "60.054826, 30.379982", "image": "https://avatars.mds.yandex.net/get-altay/5477999/2a0000017e526c9245e91979cfbc367b9d5d/L_height"},
        {"name": "ш. Революции, 84АБ", "location": "59.963156, 30.457883", "image": "https://avatars.mds.yandex.net/get-altay/5448678/2a0000017d380ed520715939ff36c2a5efe0/L_height"},
        {"name": "просп. Динамо, 44", "location": "59.968079, 30.265652", "image": "https://avatars.mds.yandex.net/get-altay/10963815/2a0000018dead45e5a04d663321f14562b45/L_height"},
        {"name": "пер. Челиева, 13В", "location": "59.889178, 30.477655", "image": "https://avatars.mds.yandex.net/get-altay/4379646/2a00000190cb6179799826ed4c580adb913f/L_height"},
        {"name": "Приморский просп., 50Б", "location": "59.982533, 30.240089", "image": "https://avatars.mds.yandex.net/get-altay/9686455/2a00000189a2fa6c49f764512aaa17124c26/L_height"},
        {"name": "Екатерининский просп., 3, корп. 2", "location": "59.977877, 30.438937", "image": "https://avatars.mds.yandex.net/get-altay/10350441/2a0000018deac27e8026e3f662553769062a/L_height"},
        {"name": "Петергофское ш., 5, корп. 3", "location": "59.848521, 30.204504", "image": "https://avatars.mds.yandex.net/get-altay/10834132/2a0000018e0a843651a42e001100b8511f9b/L_height"},
        {"name": "Афонская ул., 5", "location": "60.018014, 30.305678", "image": "https://avatars.mds.yandex.net/get-altay/4699294/2a0000017b7c7706e33656bd36104e221904/L_height"}
    ]
    
    for data in branches_data:
        try:
            branch, created = Branch.objects.update_or_create(
                name=data['name'],
                defaults=data
            )
            if created:
                print(f"Created new branch: {branch.name}")
            else:
                print(f"Updated existing branch: {branch.name}")
        except IntegrityError as e:
            print(f"Error with branch {data['name']}: {e}")


def create_clients():
    client_data = [
        {"name": "Альберт Жмышенко", "username": "albert_old", "password": "complexpassword123", "contact_info": "john.doe@example.com"},
        {"name": "Виталий Цаль", "username": "homelander", "password": "complexpassword456", "contact_info": "jane.smithers@example.com"},
        {"name": "Елена Головач", "username": "Мама Лена", "password": "complexpassword789", "contact_info": "alice.johnsonson@example.com"}
    ]
    
    for data in client_data:
        try:
            client, created = Client.objects.update_or_create(
                username=data['username'],
                defaults=data
            )
            if created:
                print(f"Created new client: {client.username}")
            else:
                print(f"Updated existing client: {client.username}")
        except IntegrityError as e:
            print(f"Error with client {data['username']}: {e}")


def create_children():
    children_data = [
        {"name": "Валерий Жмышенко", "age": 14, "group_level": "Advanced", "parent_id": 1},
        {"name": "Петр Цаль", "age": 10, "group_level": "Intermediate", "parent_id": 2},
        {"name": "Леонид Головач", "age": 7, "group_level": "Beginner", "parent_id": 3}
    ]

    for data in children_data:
        try:
            child, created = Child.objects.update_or_create(
                name=data['name'],
                parent_id=data['parent_id'],
                defaults=data
            )
            if created:
                print(f"Created new child: {child.name}")
            else:
                print(f"Updated existing child: {child.name}")
        except IntegrityError as e:
            print(f"Error with child {data['name']}: {e}")


def create_coaches_and_sessions():
    coach_data = [
        {"name": "Михаил", "login": "michael123", "password": "securepassword1", "salary": 50000.00},
        {"name": "Анна", "login": "anna456", "password": "securepassword2", "salary": 52000.00},
        {"name": "Семён", "login": "semen789", "password": "securepassword3", "salary": 53000.00},
        {"name": "Алексей", "login": "leha1337", "password": "securepassword1", "salary": 50000.00},
        {"name": "Петр", "login": "peter_griffin", "password": "securepassword2", "salary": 52000.00},
        {"name": "Альберт", "login": "albert_coach", "password": "securepassword3", "salary": 53000.00},
        {"name": "Виктория", "login": "vikus", "password": "securepassword1", "salary": 50000.00},
        {"name": "Владислав", "login": "vlad)", "password": "securepassword2", "salary": 52000.00},
    ]

    for data in coach_data:
        try:
            coach, created = Coach.objects.update_or_create(
                login=data['login'],
                defaults=data
            )
            if created:
                print(f"Created new coach: {coach.name}")
            else:
                print(f"Updated existing coach: {coach.name}")
        except IntegrityError as e:
            print(f"Error with coach {data['login']}: {e}")

    training_sessions_data = [
        {"date": "2024-10-21", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 1, "branch_id": 1, "group_level": "Beginner"},
        {"date": "2024-10-21", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 2, "branch_id": 2, "group_level": "Intermediate"},
        {"date": "2024-10-21", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 3, "branch_id": 3, "group_level": "Advanced"},
        {"date": "2024-10-21", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 4, "branch_id": 4, "group_level": "Intermediate"},
        {"date": "2024-10-21", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 5, "branch_id": 5, "group_level": "Advanced"},
        {"date": "2024-10-21", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 6, "branch_id": 6, "group_level": "Beginner"},
        {"date": "2024-10-21", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 7, "branch_id": 7, "group_level": "Advanced"},
        {"date": "2024-10-21", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 8, "branch_id": 8, "group_level": "Beginner"},

        {"date": "2024-10-21", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 1, "branch_id": 1, "group_level": "Intermediate"},
        {"date": "2024-10-21", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 2, "branch_id": 2, "group_level": "Advanced"},
        {"date": "2024-10-21", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 3, "branch_id": 3, "group_level": "Beginner"},
        {"date": "2024-10-21", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 4, "branch_id": 4, "group_level": "Advanced"},
        {"date": "2024-10-21", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 5, "branch_id": 5, "group_level": "Beginner"},
        {"date": "2024-10-21", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 6, "branch_id": 6, "group_level": "Intermediate"},
        {"date": "2024-10-21", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 7, "branch_id": 7, "group_level": "Beginner"},
        {"date": "2024-10-21", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 8, "branch_id": 8, "group_level": "Advanced"},

        {"date": "2024-10-21", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 1, "branch_id": 1, "group_level": "Advanced"},
        {"date": "2024-10-21", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 2, "branch_id": 2, "group_level": "Beginner"},
        {"date": "2024-10-21", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 3, "branch_id": 3, "group_level": "Intermediate"},
        {"date": "2024-10-21", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 4, "branch_id": 4, "group_level": "Beginner"},
        {"date": "2024-10-21", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 5, "branch_id": 5, "group_level": "Intermediate"},
        {"date": "2024-10-21", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 6, "branch_id": 6, "group_level": "Advanced"},
        {"date": "2024-10-21", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 7, "branch_id": 7, "group_level": "Intermediate"},
        {"date": "2024-10-21", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 8, "branch_id": 8, "group_level": "Beginner"},

        {"date": "2024-10-22", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 1, "branch_id": 1, "group_level": "Intermediate"},
        {"date": "2024-10-22", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 2, "branch_id": 2, "group_level": "Advanced"},
        {"date": "2024-10-22", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 3, "branch_id": 3, "group_level": "Beginner"},
        {"date": "2024-10-22", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 4, "branch_id": 4, "group_level": "Advanced"},
        {"date": "2024-10-22", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 5, "branch_id": 5, "group_level": "Beginner"},
        {"date": "2024-10-22", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 6, "branch_id": 6, "group_level": "Intermediate"},
        {"date": "2024-10-22", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 7, "branch_id": 7, "group_level": "Advanced"},
        {"date": "2024-10-22", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 8, "branch_id": 8, "group_level": "Beginner"},

        {"date": "2024-10-22", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 1, "branch_id": 1, "group_level": "Advanced"},
        {"date": "2024-10-22", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 2, "branch_id": 2, "group_level": "Beginner"},
        {"date": "2024-10-22", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 3, "branch_id": 3, "group_level": "Intermediate"},
        {"date": "2024-10-22", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 4, "branch_id": 4, "group_level": "Beginner"},
        {"date": "2024-10-22", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 5, "branch_id": 5, "group_level": "Advanced"},
        {"date": "2024-10-22", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 6, "branch_id": 6, "group_level": "Beginner"},
        {"date": "2024-10-22", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 7, "branch_id": 7, "group_level": "Intermediate"},
        {"date": "2024-10-22", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 8, "branch_id": 8, "group_level": "Advanced"},

        {"date": "2024-10-22", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 1, "branch_id": 1, "group_level": "Beginner"},
        {"date": "2024-10-22", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 2, "branch_id": 2, "group_level": "Intermediate"},
        {"date": "2024-10-22", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 3, "branch_id": 3, "group_level": "Advanced"},
        {"date": "2024-10-22", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 4, "branch_id": 4, "group_level": "Intermediate"},
        {"date": "2024-10-22", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 5, "branch_id": 5, "group_level": "Beginner"},
        {"date": "2024-10-22", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 6, "branch_id": 6, "group_level": "Advanced"},
        {"date": "2024-10-22", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 7, "branch_id": 7, "group_level": "Beginner"},
        {"date": "2024-10-22", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 8, "branch_id": 8, "group_level": "Intermediate"},

        {"date": "2024-10-23", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 1, "branch_id": 1, "group_level": "Advanced"},
        {"date": "2024-10-23", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 2, "branch_id": 2, "group_level": "Beginner"},
        {"date": "2024-10-23", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 3, "branch_id": 3, "group_level": "Intermediate"},
        {"date": "2024-10-23", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 4, "branch_id": 4, "group_level": "Beginner"},
        {"date": "2024-10-23", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 5, "branch_id": 5, "group_level": "Advanced"},
        {"date": "2024-10-23", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 6, "branch_id": 6, "group_level": "Intermediate"},
        {"date": "2024-10-23", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 7, "branch_id": 7, "group_level": "Advanced"},
        {"date": "2024-10-23", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 8, "branch_id": 8, "group_level": "Beginner"},

        {"date": "2024-10-23", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 1, "branch_id": 1, "group_level": "Beginner"},
        {"date": "2024-10-23", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 2, "branch_id": 2, "group_level": "Advanced"},
        {"date": "2024-10-23", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 3, "branch_id": 3, "group_level": "Beginner"},
        {"date": "2024-10-23", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 4, "branch_id": 4, "group_level": "Advanced"},
        {"date": "2024-10-23", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 5, "branch_id": 5, "group_level": "Intermediate"},
        {"date": "2024-10-23", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 6, "branch_id": 6, "group_level": "Beginner"},
        {"date": "2024-10-23", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 7, "branch_id": 7, "group_level": "Intermediate"},
        {"date": "2024-10-23", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 8, "branch_id": 8, "group_level": "Advanced"},

        {"date": "2024-10-23", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 1, "branch_id": 1, "group_level": "Intermediate"},
        {"date": "2024-10-23", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 2, "branch_id": 2, "group_level": "Beginner"},
        {"date": "2024-10-23", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 3, "branch_id": 3, "group_level": "Advanced"},
        {"date": "2024-10-23", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 4, "branch_id": 4, "group_level": "Intermediate"},
        {"date": "2024-10-23", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 5, "branch_id": 5, "group_level": "Beginner"},
        {"date": "2024-10-23", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 6, "branch_id": 6, "group_level": "Advanced"},
        {"date": "2024-10-23", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 7, "branch_id": 7, "group_level": "Beginner"},
        {"date": "2024-10-23", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 8, "branch_id": 8, "group_level": "Intermediate"},

        {"date": "2024-10-24", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 1, "branch_id": 1, "group_level": "Beginner"},
        {"date": "2024-10-24", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 2, "branch_id": 2, "group_level": "Advanced"},
        {"date": "2024-10-24", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 3, "branch_id": 3, "group_level": "Intermediate"},
        {"date": "2024-10-24", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 4, "branch_id": 4, "group_level": "Advanced"},
        {"date": "2024-10-24", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 5, "branch_id": 5, "group_level": "Beginner"},
        {"date": "2024-10-24", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 6, "branch_id": 6, "group_level": "Intermediate"},
        {"date": "2024-10-24", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 7, "branch_id": 7, "group_level": "Advanced"},
        {"date": "2024-10-24", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 8, "branch_id": 8, "group_level": "Beginner"},

        {"date": "2024-10-24", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 1, "branch_id": 1, "group_level": "Advanced"},
        {"date": "2024-10-24", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 2, "branch_id": 2, "group_level": "Intermediate"},
        {"date": "2024-10-24", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 3, "branch_id": 3, "group_level": "Beginner"},
        {"date": "2024-10-24", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 4, "branch_id": 4, "group_level": "Intermediate"},
        {"date": "2024-10-24", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 5, "branch_id": 5, "group_level": "Advanced"},
        {"date": "2024-10-24", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 6, "branch_id": 6, "group_level": "Beginner"},
        {"date": "2024-10-24", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 7, "branch_id": 7, "group_level": "Intermediate"},
        {"date": "2024-10-24", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 8, "branch_id": 8, "group_level": "Advanced"},

        {"date": "2024-10-24", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 1, "branch_id": 1, "group_level": "Intermediate"},
        {"date": "2024-10-24", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 2, "branch_id": 2, "group_level": "Beginner"},
        {"date": "2024-10-24", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 3, "branch_id": 3, "group_level": "Advanced"},
        {"date": "2024-10-24", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 4, "branch_id": 4, "group_level": "Beginner"},
        {"date": "2024-10-24", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 5, "branch_id": 5, "group_level": "Intermediate"},
        {"date": "2024-10-24", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 6, "branch_id": 6, "group_level": "Advanced"},
        {"date": "2024-10-24", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 7, "branch_id": 7, "group_level": "Beginner"},
        {"date": "2024-10-24", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 8, "branch_id": 8, "group_level": "Intermediate"},

        {"date": "2024-10-25", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 1, "branch_id": 1, "group_level": "Advanced"},
        {"date": "2024-10-25", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 2, "branch_id": 2, "group_level": "Beginner"},
        {"date": "2024-10-25", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 3, "branch_id": 3, "group_level": "Intermediate"},
        {"date": "2024-10-25", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 4, "branch_id": 4, "group_level": "Advanced"},
        {"date": "2024-10-25", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 5, "branch_id": 5, "group_level": "Beginner"},
        {"date": "2024-10-25", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 6, "branch_id": 6, "group_level": "Intermediate"},
        {"date": "2024-10-25", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 7, "branch_id": 7, "group_level": "Advanced"},
        {"date": "2024-10-25", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 8, "branch_id": 8, "group_level": "Beginner"},

        {"date": "2024-10-25", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 1, "branch_id": 1, "group_level": "Intermediate"},
        {"date": "2024-10-25", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 2, "branch_id": 2, "group_level": "Advanced"},
        {"date": "2024-10-25", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 3, "branch_id": 3, "group_level": "Beginner"},
        {"date": "2024-10-25", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 4, "branch_id": 4, "group_level": "Intermediate"},
        {"date": "2024-10-25", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 5, "branch_id": 5, "group_level": "Advanced"},
        {"date": "2024-10-25", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 6, "branch_id": 6, "group_level": "Beginner"},
        {"date": "2024-10-25", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 7, "branch_id": 7, "group_level": "Intermediate"},
        {"date": "2024-10-25", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 8, "branch_id": 8, "group_level": "Advanced"},

        {"date": "2024-10-25", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 1, "branch_id": 1, "group_level": "Beginner"},
        {"date": "2024-10-25", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 2, "branch_id": 2, "group_level": "Intermediate"},
        {"date": "2024-10-25", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 3, "branch_id": 3, "group_level": "Advanced"},
        {"date": "2024-10-25", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 4, "branch_id": 4, "group_level": "Beginner"},
        {"date": "2024-10-25", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 5, "branch_id": 5, "group_level": "Intermediate"},
        {"date": "2024-10-25", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 6, "branch_id": 6, "group_level": "Advanced"},
        {"date": "2024-10-25", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 7, "branch_id": 7, "group_level": "Beginner"},
        {"date": "2024-10-25", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 8, "branch_id": 8, "group_level": "Intermediate"},

        {"date": "2024-10-28", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 1, "branch_id": 1, "group_level": "Advanced"},
        {"date": "2024-10-28", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 2, "branch_id": 2, "group_level": "Beginner"},
        {"date": "2024-10-28", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 3, "branch_id": 3, "group_level": "Intermediate"},
        {"date": "2024-10-28", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 4, "branch_id": 4, "group_level": "Advanced"},
        {"date": "2024-10-28", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 5, "branch_id": 5, "group_level": "Beginner"},
        {"date": "2024-10-28", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 6, "branch_id": 6, "group_level": "Intermediate"},
        {"date": "2024-10-28", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 7, "branch_id": 7, "group_level": "Advanced"},
        {"date": "2024-10-28", "start_time": "15:00:00", "end_time": "16:30:00", "coach_id": 8, "branch_id": 8, "group_level": "Beginner"},

        {"date": "2024-10-28", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 1, "branch_id": 1, "group_level": "Intermediate"},
        {"date": "2024-10-28", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 2, "branch_id": 2, "group_level": "Advanced"},
        {"date": "2024-10-28", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 3, "branch_id": 3, "group_level": "Beginner"},
        {"date": "2024-10-28", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 4, "branch_id": 4, "group_level": "Intermediate"},
        {"date": "2024-10-28", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 5, "branch_id": 5, "group_level": "Advanced"},
        {"date": "2024-10-28", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 6, "branch_id": 6, "group_level": "Beginner"},
        {"date": "2024-10-28", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 7, "branch_id": 7, "group_level": "Intermediate"},
        {"date": "2024-10-28", "start_time": "16:40:00", "end_time": "18:10:00", "coach_id": 8, "branch_id": 8, "group_level": "Advanced"},

        {"date": "2024-10-28", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 1, "branch_id": 1, "group_level": "Beginner"},
        {"date": "2024-10-28", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 2, "branch_id": 2, "group_level": "Intermediate"},
        {"date": "2024-10-28", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 3, "branch_id": 3, "group_level": "Advanced"},
        {"date": "2024-10-28", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 4, "branch_id": 4, "group_level": "Beginner"},
        {"date": "2024-10-28", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 5, "branch_id": 5, "group_level": "Intermediate"},
        {"date": "2024-10-28", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 6, "branch_id": 6, "group_level": "Advanced"},
        {"date": "2024-10-28", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 7, "branch_id": 7, "group_level": "Beginner"},
        {"date": "2024-10-28", "start_time": "18:20:00", "end_time": "19:50:00", "coach_id": 8, "branch_id": 8, "group_level": "Intermediate"}

    ]

    for data in training_sessions_data:
        try:
            session, created = TrainingSession.objects.update_or_create(
                date=data['date'],
                start_time=data['start_time'],
                coach_id=data['coach_id'],
                branch_id=data['branch_id'],
                defaults=data
            )
            if created:
                print(f"Created new training session: {session.date} {session.start_time} at branch {session.branch_id}")
            else:
                print(f"Updated existing training session: {session.date} {session.start_time} at branch {session.branch_id}")
        except IntegrityError as e:
            print(f"Error with training session {data['date']} {data['start_time']} at branch {data['branch_id']}: {e}")


if __name__ == '__main__':
    create_branches()
    create_clients()
    create_children()
    create_coaches_and_sessions()
