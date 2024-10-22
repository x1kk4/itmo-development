# Generated by Django 5.1.1 on 2024-10-21 21:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0010_remove_client_subscription'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscription',
            name='client',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='subscription', to='client.client'),
        ),
    ]