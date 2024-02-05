import json
import requests
from ..logs.logger import Logger


class NowPaymentsController:
    def __init__(self):
        self.logger = self.logger = Logger(name="nowpayments_controller").get_logger()
        self.url = "https://api.nowpayments.io/v1/"

    def auth(self):
        payload = json.dumps({
            "email": "ton.project@yandex.ru",
            "password": "TonProject1488"
        })
        headers = {
            'Content-Type': 'application/json'
        }

        response = requests.request("POST", self.url+'auth', headers=headers, data=payload)
        return response.json()['token']
        # self.logger.info(f"Token: {response.json()['token']}")

    def create_new_user(self, tg_id):
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

        response = requests.request("POST", self.url+'sub-partner/balance', headers=headers, data=payload)
        np_id = response.json()['result']['id']
        self.logger.info(f"New user added:\n "
                         f"tg_id: {tg_id}\n"
                         f"np_id: {np_id}")
        return np_id
