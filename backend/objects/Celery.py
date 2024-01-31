import os
from dotenv import load_dotenv
from celery import Celery

load_dotenv()
broker = os.getenv("REDIS_URL")
include=[
    'backend.workers.ton_transaction_worker',
    'backend.workers.jetton_transaction_worker'
]
# Инициализация основного приложения Celery
celery = Celery('tonproject', broker=broker, include=include)

# Настройки для каждой очереди
celery.conf.task_queues = {
    'create_transaction_ton': {
        'exchange': 'create_transaction_ton',
        'routing_key': 'create_transaction_ton',
    },
    'create_transaction_jetton': {
        'exchange': 'create_transaction_jetton',
        'routing_key': 'create_transaction_jetton',
    },
}

# Настройки маршрутизации, чтобы указать какие задачи идут в какую очередь
celery.conf.task_routes = {
    'tonproject.tasks.create_transaction_ton': {'queue': 'create_transaction_ton'},
    'tonproject.tasks.create_transaction_jetton': {'queue': 'create_transaction_jetton'},
}