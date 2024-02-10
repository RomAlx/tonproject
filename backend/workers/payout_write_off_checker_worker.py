import asyncio

from backend.objects.Celery import celery
from backend.logs.logger import Logger

from backend.models.transaction import Transaction

from backend.repositories.transaction_repository import TransactionRepository

logger = Logger(name="payout_write_off_checker").get_logger()


@celery.task(queue='payout_write_off_checker')
def check_write_off(transaction_id: int, payout_address: str):
    from backend.controllers.nowpayments_controller import NowPaymentsController
    transaction = TransactionRepository.get_transaction_by_id(transaction_id)
    np_c = NowPaymentsController()
    asyncio.get_event_loop().run_until_complete(np_c.get_transfer(transaction, payout_address))