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
        Branch.objects.create(**data)


def create_clients():
    client_data = [
        {"name": "Альберт Жмышенко", "username": "albert_old", "password": "complexpassword123", "contact_info": "john.doe@example.com"},
        {"name": "Виталий Цаль", "username": "homelander", "password": "complexpassword456", "contact_info": "jane.smithers@example.com"},
        {"name": "Елена Головач", "username": "Мама Лена", "password": "complexpassword789", "contact_info": "alice.johnsonson@example.com"}
    ]
    
    for data in client_data:
        Client.objects.create(**data)


def create_children():
    children_data = [
        {"name": "Валерий Жмышенко", "age": 14, "group_level": "Advanced", "parent_id": 1},
        {"name": "Петр Цаль", "age": 10, "group_level": "Intermediate", "parent_id": 2},
        {"name": "Леонид Головач", "age": 7, "group_level": "Beginner", "parent_id": 3}
    ]

    for data in children_data:
        try:
            Child.objects.create(**data)
        except IntegrityError as e:
            print(f"Error creating child: {e}")


def create_coaches_and_sessions():
    coach_data = [
        {"name": "Михаил", "login": "michael123", "password": "securepassword1", "salary": 50000.00},
        {"name": "Анна", "login": "anna456", "password": "securepassword2", "salary": 52000.00},
        {"name": "Семён", "login": "semen789", "password": "securepassword3", "salary": 53000.00}
    ]

    for data in coach_data:
        try:
            Coach.objects.create(**data)
        except IntegrityError as e:
            print(f"Error creating coach: {e}")

    training_sessions_data = [
        {"date": "2024-10-18", "start_time": "09:30:00", "end_time": "10:30:00", "coach_id": 1, "branch_id": 3},
        {"date": "2024-10-19", "start_time": "14:00:00", "end_time": "15:00:00", "coach_id": 2, "branch_id": 5},
        {"date": "2024-10-20", "start_time": "11:15:00", "end_time": "12:15:00", "coach_id": 3, "branch_id": 1},
        {"date": "2024-10-21", "start_time": "16:45:00", "end_time": "17:45:00", "coach_id": 1, "branch_id": 7},
        {"date": "2024-10-22", "start_time": "08:00:00", "end_time": "09:00:00", "coach_id": 2, "branch_id": 2},
        {"date": "2024-10-23", "start_time": "13:30:00", "end_time": "14:30:00", "coach_id": 3, "branch_id": 6},
        {"date": "2024-10-24", "start_time": "10:00:00", "end_time": "11:00:00", "coach_id": 1, "branch_id": 4},
        {"date": "2024-10-25", "start_time": "17:15:00", "end_time": "18:15:00", "coach_id": 2, "branch_id": 8},
        {"date": "2024-10-26", "start_time": "12:45:00", "end_time": "13:45:00", "coach_id": 3, "branch_id": 1},
        {"date": "2024-10-27", "start_time": "15:30:00", "end_time": "16:30:00", "coach_id": 1, "branch_id": 5},
        {"date": "2024-10-28", "start_time": "09:00:00", "end_time": "10:00:00", "coach_id": 2, "branch_id": 3},
        {"date": "2024-10-29", "start_time": "18:00:00", "end_time": "19:00:00", "coach_id": 3, "branch_id": 7},
        {"date": "2024-10-30", "start_time": "11:45:00", "end_time": "12:45:00", "coach_id": 1, "branch_id": 2},
        {"date": "2024-10-31", "start_time": "14:30:00", "end_time": "15:30:00", "coach_id": 2, "branch_id": 6},
        {"date": "2024-10-18", "start_time": "16:15:00", "end_time": "17:15:00", "coach_id": 3, "branch_id": 4},
        {"date": "2024-10-19", "start_time": "08:30:00", "end_time": "09:30:00", "coach_id": 1, "branch_id": 8},
        {"date": "2024-10-20", "start_time": "13:00:00", "end_time": "14:00:00", "coach_id": 2, "branch_id": 1},
        {"date": "2024-10-21", "start_time": "10:45:00", "end_time": "11:45:00", "coach_id": 3, "branch_id": 5},
        {"date": "2024-10-22", "start_time": "17:30:00", "end_time": "18:30:00", "coach_id": 1, "branch_id": 3},
        {"date": "2024-10-23", "start_time": "09:15:00", "end_time": "10:15:00", "coach_id": 2, "branch_id": 7},
        {"date": "2024-10-24", "start_time": "12:30:00", "end_time": "13:30:00", "coach_id": 3, "branch_id": 2},
        {"date": "2024-10-25", "start_time": "15:45:00", "end_time": "16:45:00", "coach_id": 1, "branch_id": 6},
        {"date": "2024-10-26", "start_time": "08:45:00", "end_time": "09:45:00", "coach_id": 2, "branch_id": 4},
        {"date": "2024-10-27", "start_time": "11:00:00", "end_time": "12:00:00", "coach_id": 3, "branch_id": 8},
        {"date": "2024-10-28", "start_time": "14:15:00", "end_time": "15:15:00", "coach_id": 1, "branch_id": 1},
        {"date": "2024-10-29", "start_time": "17:30:00", "end_time": "18:30:00", "coach_id": 2, "branch_id": 5},
        {"date": "2024-10-30", "start_time": "10:30:00", "end_time": "11:30:00", "coach_id": 3, "branch_id": 3},
        {"date": "2024-10-31", "start_time": "13:45:00", "end_time": "14:45:00", "coach_id": 1, "branch_id": 7},
        {"date": "2024-10-18", "start_time": "16:00:00", "end_time": "17:00:00", "coach_id": 2, "branch_id": 2},
        {"date": "2024-10-19", "start_time": "19:00:00", "end_time": "20:00:00", "coach_id": 3, "branch_id": 6}
    ]

    for data in training_sessions_data:
        try:
            TrainingSession.objects.create(**data)
        except IntegrityError as e:
            print(f"Error creating training session: {e}")


if __name__ == '__main__':
    create_branches()
    create_clients()
    create_children()
    create_coaches_and_sessions()
