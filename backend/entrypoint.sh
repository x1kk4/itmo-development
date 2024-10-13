#!/bin/sh

# Run migrations
python3 manage.py migrate

# Start the application
exec gunicorn nevskie_medvedi.wsgi:application --bind 0.0.0.0:8000