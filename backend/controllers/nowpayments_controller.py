import os
from dotenv import load_dotenv
import asyncio
import json
import requests
import time
from ..logs.logger import Logger

from backend.models.transaction import Transaction
from backend.models.balance import Balance
from backend.models.user import User

from backend.utils.otp import generate_2fa_code

from backend.repositories.transaction_repository import TransactionRepository
from backend.repositories.user_repository import UserRepository

from backend.workers.payout_write_off_checker_worker import check_write_off


class NowPaymentsController:
    def __init__(self):
        self.logger = self.logger = Logger(name="controller.nowpayments").get_logger()
        self.app_url = os.getenv("PROJECT_URL")
        self.url = "https://api.nowpayments.io/v1/"
        self.id = "4575191795"
        self.secret = os.getenv("NOWPAYMENTS_SECRET")
        self.api_key = os.getenv("NOWPAYMENTS_API_KEY")
        self.secret_2fa = os.getenv("NOWPAYMENTS_SECRET_2FA")
        #self.secret_2fa = 'FRJDUSBZMIVCUZKJ'
        self.main_symbol = 'ton'

    def auth(self):
        payload = json.dumps({
            "email": "ton.project@yandex.ru",
            "password": "TonProject1488"
        })
        headers = {
            'Content-Type': 'application/json'
        }

        response = requests.request("POST", self.url + 'auth', headers=headers, data=payload)
        return response.json()['token']
        # self.logger.info(f"Token: {response.json()['token']}")

    async def verify_payout(self, batch_id):
        token = self.auth()
        payload = json.dumps({
            "verification_code": generate_2fa_code(self.secret_2fa)
        })
        headers = {
            'x-api-key': self.api_key,
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }

        response = requests.request("POST", self.url + f'payout/{str(batch_id)}/verify', headers=headers, data=payload)

        self.logger.info(f'Verified payout: {response.text}')

    async def create_new_user(self, tg_id):
        token = self.auth()
        payload = json.dumps(
            {
                "name": str(tg_id)
            }
        )
        headers = {
            "Authorization": f'Bearer {token}',
            "Content-Type": 'application/json'
        }

        response = requests.request("POST", self.url + 'sub-partner/balance', headers=headers, data=payload)
        np_id = response.json()['result']['id']
        self.logger.info(f"New user added:\n "
                         f"tg_id: {tg_id}\n"
                         f"np_id: {np_id}")
        return np_id

    async def get_user_balance(self, np_id):
        token = self.auth()
        payload = {}
        headers = {
            "Authorization": f'Bearer {token}',
            "Content-Type": 'application/json',
            "x-api-key": self.api_key
        }
        response = requests.request(
            "GET",
            self.url + 'sub-partner/balance/' + str(np_id),
            headers=headers,
            data=payload)
        user = UserRepository.get_user_with_np_id(np_id=np_id)
        UserRepository.update_users_balance(user, response.json()['result']['balances']['ton']['amount'])
        return {
            "user_balance": UserRepository.get_user_balance(user).balance
        }

    async def get_min_payment(self, symbol: str):
        payload = {
            'currency_from': symbol,
            'currency_to': self.main_symbol,
            'fiat_equivalent': 'usd',
            'is_fee_paid_by_user': True,
        }
        headers = {
            'x-api-key': self.api_key
        }
        # self.logger.info(json.dumps(payload, indent=4, ensure_ascii=False, sort_keys=True))
        # response = requests.request("GET",
        #                             url="https://api.nowpayments.io/v1/min-amount?currency_from=eth&currency_to=trx&fiat_equivalent=usd&is_fee_paid_by_user=False",
        #                             headers=headers, data={})
        response = requests.request("GET",
                                    url=self.url + "min-amount",
                                    headers=headers, params=payload)
        self.logger.info(json.dumps(response.json(), indent=4, ensure_ascii=False, sort_keys=True))
        return response.json()

    async def get_pay_page(self, np_id: int, amount: float, currency_from: str):
        payload = json.dumps({
            'currency': currency_from,
            'amount': amount,
            'sub_partner_id': str(np_id),
            'is_fee_paid_by_user': True,
            "ipn_callback_url": self.app_url + '/api/np/payment_status'
        })
        headers = {
            'x-api-key': self.api_key,
            'Content-Type': 'application/json'
        }
        response = requests.request("POST",
                                    url=self.url + 'sub-partner/payment',
                                    headers=headers,
                                    data=payload)
        self.logger.info(json.dumps(response.json(), indent=4, ensure_ascii=False, sort_keys=True))
        response = response.json()
        data = {
            'np_id': np_id,
            'type': 'deposit',
            'amount': response['result']['amount_received'],
            'symbol': 'Ton',
            'payment_id': response['result']['payment_id'],
            'payment_status': response['result']['payment_status']
        }
        TransactionRepository().create_transaction(data=data)
        data = {
            'pay_address': response['result']['pay_address'],
            'amount_received': response['result']['amount_received']
        }
        return data

    def is_address_valid(self, address: str):
        payload = json.dumps({
            "address": address,
            "currency": "ton",
            "extra_id": None
        })
        headers = {
            'x-api-key': self.api_key,
            'Content-Type': 'application/json'
        }
        response = requests.request("POST",
                                    url=self.url + 'payout/validate-address',
                                    headers=headers,
                                    data=payload
                                    )
        if response.text == 'OK':
            return True
        return False

    async def write_off_to_main(self, amount: float, np_id: int):
        token = self.auth()
        payload = json.dumps({
            "amount": amount,
            "currency": "ton",
            "sub_partner_id": str(np_id)
        })
        headers = {
            "Authorization": f'Bearer {token}',
            'x-api-key': self.api_key,
            'Content-Type': 'application/json'
        }
        response = requests.request("POST",
                                    url=self.url + 'sub-partner/write-off',
                                    headers=headers,
                                    data=payload
                                    )
        return response.json()

    async def create_payout_transfer(self, data):
        if self.is_address_valid(data['payout_address']):
            user = UserRepository().get_user(data['user_id'])
            response = await self.write_off_to_main(data['payout_amount'], user.np_id)
            self.logger.info(json.dumps(response, indent=4, ensure_ascii=False, sort_keys=True))
            data_for_transaction = {
                'np_id': user.np_id,
                'type': 'transfer_to',
                'amount': response['result']['amount'],
                'symbol': 'Ton',
                'payment_id': response['result']['id'],
                'payment_status': response['result']['status']
            }
            transaction = TransactionRepository().create_transaction(data=data_for_transaction)
            await asyncio.create_task(self.get_transfer(transaction, str(data['payout_address'])))
            return {'status': 'Transfer initiated'}
        return {'error': 'Address isn`t valid'}

    async def get_transfer(self, transaction: Transaction, payout_address, attempt = 0):
        token = self.auth()
        payload = {}
        headers = {
            "Authorization": f'Bearer {token}'
        }
        response = requests.request("GET",
                                    url=self.url + 'sub-partner/transfers',
                                    headers=headers,
                                    params=payload
                                    )
        transfers = response.json()['result']
        is_find = False
        for transfer in transfers:
            if transfer['id'] == str(transaction.payment_id):
                is_find = True
                self.logger.info(json.dumps(transfer, indent=4, ensure_ascii=False, sort_keys=True))
                transaction.payment_status = transfer['status']
                TransactionRepository.update_transaction(transaction=transaction)
                if transaction.payment_status == 'REJECTED':
                    return transaction
                if transaction.payment_status != 'FINISHED':
                    time.sleep(10)
                    await self.get_transfer(transaction, payout_address)
                else:
                    await self.create_payout(transaction=transaction, payout_address=payout_address)
        if not is_find and attempt < 5:
            await self.get_transfer(transaction, payout_address, (attempt+1))
        else:
            return transaction

    async def create_payout(self, transaction: Transaction, payout_address: str):
        token = self.auth()
        payload = json.dumps({
            "withdrawals": [
                {
                    "address": payout_address,
                    "currency": "ton",
                    "amount": transaction.amount,
                    "ipn_callback_url": self.app_url + '/api/np/payout_status'
                }
            ]
        })
        headers = {
            'x-api-key': self.api_key,
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {token}'
        }
        response = requests.request("POST", self.url + 'payout', headers=headers, data=payload)
        response = response.json()
        self.logger.info(json.dumps(response, indent=4, ensure_ascii=False, sort_keys=True))
        batch_id = response['id']
        data = {
            'user_id': transaction.user_id,
            'type': 'withdraw',
            'amount': response['withdrawals'][0]['amount'],
            'symbol': 'Ton',
            'payment_id': response['withdrawals'][0]['id'],
            'payment_status': response['withdrawals'][0]['status']
        }
        TransactionRepository().create_transaction(data=data)
        await self.verify_payout(batch_id=batch_id)

    async def update_payment_status(self, data: dict):
        transaction = TransactionRepository().update_payment(payment=data)
        if transaction.payment_status == 'finished':
            user = transaction.user
            balance_amount = await self.get_user_balance(user.np_id)
            UserRepository().update_users_balance(user, balance_amount['user_balance'])

    async def update_payout_status(self, data: dict):
        transaction = TransactionRepository().update_payout(payout=data)
        if transaction.payment_status == 'FINISHED':
            user = transaction.user
            balance_amount = await self.get_user_balance(user.np_id)
            UserRepository().update_users_balance(user, balance_amount['user_balance'])

    async def pay_from_main(self, np_id, amount):
        token = self.auth()
        payload = json.dumps({
            "currency": "ton",
            "amount": amount,
            "sub_partner_id": str(np_id),
        })
        headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }

        response = requests.request("POST", self.url + 'sub-partner/deposit', headers=headers, data=payload)

        self.logger.info(response.text)
