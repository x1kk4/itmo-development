# Generated by Django 5.1.1 on 2024-10-16 17:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("client", "0006_branch_image_branch_latitude_branch_longitude"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="branch",
            name="latitude",
        ),
        migrations.RemoveField(
            model_name="branch",
            name="longitude",
        ),
        migrations.RemoveField(
            model_name="client",
            name="branches",
        ),
        migrations.AddField(
            model_name="child",
            name="branch",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                to="client.branch",
            ),
        ),
    ]