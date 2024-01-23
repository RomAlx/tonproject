import os
import json
from dotenv import load_dotenv

from ..objects.Ton import Ton
from ..logs.Logger import Logger

from pytonapi.utils import nano_to_amount


class TonController:
    def __init__(self):
        load_dotenv()
        self.ton = Ton()
        self.tonapi = self.ton.tonapi
        self.base_wallet = os.getenv("WALLET")
        self.jetton_address = os.getenv("JETTON_ADDRESS")
        self.logger = Logger(name="ton").get_logger()
        self.logger.info(f"Base wallet: {self.base_wallet}\n")
        self.logger.info(f"Jetton address: {self.jetton_address}\n")
        self.vlados_wallet = "0QAWL5AfiNBl6NE35H4pXmAs7ttn-Ig7XA4CNptF3F1MdOAa"

    async def base_wallet_info(self):
        wallet_info = await self.tonapi.accounts.get_info(self.base_wallet)
        self.logger.info(
            f"Base account: {json.dumps(json.loads(wallet_info.json()), indent=4, ensure_ascii=False, sort_keys=True)}\n"
        )

    async def ton_transactions(self):
        response = await self.tonapi.blockchain.get_account_transactions(account_id=self.base_wallet)
        sender_address = await self.tonapi.accounts.parse_address(self.vlados_wallet)
        self.logger.info(f"sender address: {sender_address.raw_form}")
        i = 1
        for transaction in response.transactions:
            try:
                if sender_address.raw_form == transaction.in_msg.source.address.to_raw():
                    #self.logger.info(f"transaction: {json.dumps(json.loads(transaction.json()), indent=4, ensure_ascii=False, sort_keys=True)}\n")
                    self.logger.info(f"\nTransaction 'in' (TON) {i}:\n"
                                     f"Account: {sender_address.raw_form}\n"
                                     f"Destination address: {transaction.in_msg.destination.address}\n"
                                     f"Block: {transaction.block}\n"
                                     f"Value in TON: {nano_to_amount(transaction.in_msg.value)}\n")
                    i = i + 1
            except Exception as e:
                continue

    async def jetton_transactions(self):
        response = await self.tonapi.blockchain.get_account_transactions(account_id=self.base_wallet)
        sender_address = await self.tonapi.accounts.parse_address(self.vlados_wallet)
        self.logger.info(f"sender address: {sender_address.raw_form}")
        jetton_address = await self.tonapi.accounts.parse_address(self.jetton_address)
        self.logger.info(f"jetton address: {jetton_address.raw_form}")
        i = 1
        for transaction in response.transactions:
            if transaction.in_msg.decoded_op_name == "jetton_notify":
                if sender_address.raw_form == transaction.in_msg.decoded_body['sender']:
                    #self.logger.info(f"transaction: {json.dumps(json.loads(transaction.json()), indent=4, ensure_ascii=False, sort_keys=True)}\n")
                    self.logger.info(f"\nTransaction 'in' (JETTON) {i}:\n"
                                     f"Account: {sender_address.raw_form}\n"
                                     f"Destination address: {transaction.in_msg.destination.address}\n"
                                     f"Block: {transaction.block}\n"
                                     f"Value: {transaction.in_msg.decoded_body['amount']}\n")
                    i = i + 1

    async def jetton(self):
        jetton = await self.tonapi.jettons.get_info(self.jetton_address)
        self.logger.info(
            f"Jetttons: {json.dumps(json.loads(jetton.json()), indent=4, ensure_ascii=False, sort_keys=True)}")
