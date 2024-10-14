FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt /app/

RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

EXPOSE 8000

ENV ENV_MODE="prod"
ENV DB_NAME="nevskie_medvedi"
ENV DB_USER="nevskie_user"
ENV DB_PASSWORD="secure_password"
ENV DB_HOST="10.0.1.6"
ENV DB_PORT="5432"

RUN python3 manage.py collectstatic

RUN chmod +x /app/entrypoint.sh

ENTRYPOINT ["/app/entrypoint.sh"]