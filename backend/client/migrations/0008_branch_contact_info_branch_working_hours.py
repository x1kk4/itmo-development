# Generated by Django 5.1.1 on 2024-10-16 18:02

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("client", "0007_remove_branch_latitude_remove_branch_longitude_and_more"),
    ]

    operations = [
        migrations.AddField(
            model_name="branch",
            name="contact_info",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="branch",
            name="working_hours",
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
