import os
import json
from dotenv import load_dotenv
from pytonapi.utils import nano_to_amount
from pytonapi.schema.events import TransactionEventData

from ..logs.Logger import Logger
from ..objects.Ton import Ton


class TonController:
    def __init__(self):
        load_dotenv()
        self.ton = Ton()
        self.tonapi = self.ton.tonapi
        self.tonapi.websocket_url = os.getenv("TON_WEBSOCKET_URL")
        self.logger = Logger(name="ton_controller").get_logger()
        self.logger.info(f"Base wallet: {self.ton.base_wallet}")
        self.logger.info(f"Jetton address: {self.ton.jetton_address}")

    async def websocket_subscribe(self):
        await self.tonapi.websocket.subscribe_to_transactions([self.ton.base_wallet], self.get_event)

    async def get_event(self, event: TransactionEventData) -> None:
        # self.logger.info(
        #     f"Event:\n"
        #     f"{json.dumps(json.loads(event.json()), indent=4, ensure_ascii=False, sort_keys=True)}"
        # )
        try:
            jetton_transaction = await self.tonapi.jettons.get_jetton_transfer_event(event.tx_hash)
            # self.logger.info(
            #     f"jetton_transaction:\n"
            #     f"{json.dumps(json.loads(jetton_transaction.json()), indent=4, ensure_ascii=False, sort_keys=True)}\n"
            # )
            is_jetton_transfer = False
            for action in jetton_transaction.actions:
                if action.JettonTransfer:
                    is_jetton_transfer = True
                    transaction_id = jetton_transaction.event_id
                    source_address = action.JettonTransfer.sender.address.to_raw()
                    destination_address = action.JettonTransfer.recipient.address.to_raw()
                    jetton_symbol = action.JettonTransfer.jetton.symbol
                    amount = action.JettonTransfer.amount
                    break

            if is_jetton_transfer:
                self.logger.info(f"\nTransaction ({jetton_symbol}):\n"
                                 f"Transaction id: {transaction_id}\n"
                                 f"Sender address: {source_address}\n"
                                 f"Recipient address: {destination_address}\n"
                                 f"Amount: {amount} {jetton_symbol}\n")
        except Exception as e:
            self.logger.warn(
                f"jetton_transaction error: not a jetton transaction\n"
            )
        try:
            ton_transaction = await self.tonapi.blockchain.get_transaction_data(event.tx_hash)
            # self.logger.info(
            #     f"ton_transaction:\n"
            #     f"{json.dumps(json.loads(ton_transaction.json()), indent=4, ensure_ascii=False, sort_keys=True)}\n"
            # )
            if ton_transaction.in_msg.source:
                sender_address = ton_transaction.in_msg.source.address.to_raw()
                recipient_adress = ton_transaction.in_msg.destination.address.to_raw()
                amount = ton_transaction.in_msg.value
            else:
                sender_address = ton_transaction.out_msgs[0].source.address.to_raw()
                recipient_adress = ton_transaction.out_msgs[0].destination.address.to_raw()
                amount = ton_transaction.out_msgs[0].value
            self.logger.info(f"\nTransaction (TON):\n"
                             f"Hash: {ton_transaction.hash}\n"
                             f"Sender address: {sender_address}\n"
                             f"Recipient address: {recipient_adress}\n"  
                             f"Amount: {amount}\n"
                             f"Amount in TON: {nano_to_amount(amount)}\n")
        except Exception as e:
            self.logger.warn(
                f"ton_transaction error: not a ton transaction\n"
            )

    async def base_wallet_info(self):
        wallet_info = await self.tonapi.accounts.get_info(self.ton.base_wallet)
        self.logger.info(
            f"Base account: {json.dumps(json.loads(wallet_info.json()), indent=4, ensure_ascii=False, sort_keys=True)}\n"
        )

    async def ton_transactions(self):
        response = await self.tonapi.blockchain.get_account_transactions(account_id=self.ton.base_wallet)
        sender_address = await self.tonapi.accounts.parse_address(self.ton.test_wallet)
        self.logger.info(f"sender address: {sender_address.raw_form}")
        i = 1
        for transaction in response.transactions:
            try:
                if sender_address.raw_form == transaction.in_msg.source.address.to_raw():
                    # self.logger.info(f"transaction: {json.dumps(json.loads(transaction.json()), indent=4, ensure_ascii=False, sort_keys=True)}\n")
                    self.logger.info(f"\nTransaction 'in' (TON) {i}:\n"
                                     f"Account: {sender_address.raw_form}\n"
                                     f"Destination address: {transaction.in_msg.destination.address}\n"
                                     f"Block: {transaction.block}\n"
                                     f"Value in TON: {nano_to_amount(transaction.in_msg.value)}\n")
                    i = i + 1
            except Exception as e:
                continue

    async def jetton_transactions(self):
        response = await self.tonapi.blockchain.get_account_transactions(account_id=self.ton.base_wallet)
        sender_address = await self.tonapi.accounts.parse_address(self.ton.test_wallet)
        self.logger.info(f"sender address: {sender_address.raw_form}")
        jetton_address = await self.tonapi.accounts.parse_address(self.ton.jetton_address)
        self.logger.info(f"jetton address: {jetton_address.raw_form}")
        i = 1
        for transaction in response.transactions:
            if transaction.in_msg.decoded_op_name == "jetton_notify":
                try:
                    event = await self.tonapi.jettons.get_jetton_transfer_event(transaction.hash)
                    self.logger.info(
                        f"transaction:\n"
                        f" {json.dumps(json.loads(event.json()), indent=4, ensure_ascii=False, sort_keys=True)}\n"
                    )
                    i = i + 1
                except Exception as e:
                    continue

    async def jetton(self):
        jetton = await self.tonapi.jettons.get_info(self.ton.jetton_address)
        self.logger.info(
            f"Jetttons:\n"
            f" {json.dumps(json.loads(jetton.json()), indent=4, ensure_ascii=False, sort_keys=True)}"
        )
