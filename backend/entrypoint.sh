#!/bin/sh

# Run migrations
python3 manage.py migrate
python3 manage.py populate_coaches
python3 manage.py populate_clients

# Start the application
exec gunicorn nevskie_medvedi.wsgi:application --bind 0.0.0.0:8000