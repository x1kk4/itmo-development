# Generated by Django 5.1.1 on 2024-10-02 10:19

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("client", "0002_client_child"),
    ]

    operations = [
        migrations.CreateModel(
            name="Branch",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                ("location", models.CharField(max_length=200)),
            ],
        ),
        migrations.RemoveField(
            model_name="session",
            name="coach",
        ),
        migrations.AddField(
            model_name="client",
            name="branches",
            field=models.ManyToManyField(related_name="clients", to="client.branch"),
        ),
        migrations.DeleteModel(
            name="Coach",
        ),
        migrations.DeleteModel(
            name="Session",
        ),
    ]
