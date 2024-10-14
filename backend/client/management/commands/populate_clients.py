from django.core.management.base import BaseCommand
from client.models import Client, Branch, Child
import random

class Command(BaseCommand):
    help = 'Populates the database with initial data for clients and children.'

    def handle(self, *args, **options):
        branches = self.create_branches()
        self.create_clients(branches)
        self.create_children()

    def create_branches(self):
        branch_names = ["Downtown Complex", "Uptown Facility", "Midtown Hub"]
        branch_locations = ["123 Main St", "456 Elm St", "789 Pine St"]
        branches = []
        for name, location in zip(branch_names, branch_locations):
            branch, created = Branch.objects.get_or_create(name=name, location=location)
            branches.append(branch)
        return branches

    def create_clients(self, branches):
        client_data = [
            {"name": "Johnathan Doe", "username": "john_doe_123", "password": "complexpassword123", "contact_info": "john.doe@example.com"},
            {"name": "Jane Smithers", "username": "jane_smithers_456", "password": "complexpassword456", "contact_info": "jane.smithers@example.com"},
            {"name": "Alice Johnsonson", "username": "alice_johnsonson_789", "password": "complexpassword789", "contact_info": "alice.johnsonson@example.com"}
        ]
        for data in client_data:
            client, created = Client.objects.get_or_create(
                username=data['username'],
                defaults=data
            )
            if created:
                client.branches.set(branches)

    def create_children(self):
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
