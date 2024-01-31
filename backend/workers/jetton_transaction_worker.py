import asyncio

from backend.objects.Celery import celery
from backend.objects.TonWallet import TonWallet
from backend.logs.logger import Logger

ton_wallet = TonWallet()
logger = Logger(name="create_transaction_jetton").get_logger()


@celery.task(queue='create_transaction_jetton')
def create_transaction_jetton(amount: float, address: str):
    asyncio.get_event_loop().run_until_complete(ton_wallet.create_transaction_jetton(amount, address, logger))