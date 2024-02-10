import os
from dotenv import load_dotenv
from celery import Celery

load_dotenv()
broker = os.getenv("REDIS_URL")
include=[
    'backend.workers.payout_write_off_checker_worker'
]
# Инициализация основного приложения Celery
celery = Celery('tonproject', broker=broker, include=include)

# Настройки для каждой очереди
celery.conf.task_queues = {
    'payout_write_off_checker': {
        'exchange': 'payout_write_off_checker',
        'routing_key': 'payout_write_off_checker',
    },
}

# Настройки маршрутизации, чтобы указать какие задачи идут в какую очередь
celery.conf.task_routes = {
    'tonproject.tasks.payout_write_off_checker': {'queue': 'payout_write_off_checker'},
}