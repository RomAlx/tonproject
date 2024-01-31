import os
import json
from dotenv import load_dotenv

from pytonapi.schema.events import TransactionEventData
from pytonapi.utils import nano_to_amount, raw_to_userfriendly

from tonsdk.utils import Address

from ..logs.logger import Logger

from ..objects.TonWallet import TonWallet

from ..workers.ton_transaction_worker import create_transaction_ton
from ..workers.jetton_transaction_worker import create_transaction_jetton

from ..enums.transaction_type import TransactionType


class TonController:
    def __init__(self):
        load_dotenv()
        self.ton_wallet = TonWallet()
        self.tonapi = self.ton_wallet.tonapi
        self.logger = Logger(name="ton_controller").get_logger()
        self.logger.info(f"Base wallet: {self.ton_wallet.base_wallet_address}\n"
                         f"Jetton address: {self.ton_wallet.jetton_address}")

    async def websocket_subscribe(self):
        await self.tonapi.websocket.subscribe_to_transactions([self.ton_wallet.base_wallet_address], self.get_event)

    async def get_event(self, event: TransactionEventData) -> None:
        event_id = event.tx_hash
        ton_transaction = await self.tonapi.blockchain.get_transaction_data(event.tx_hash)
        self.logger.info(
            json.dumps(json.loads(ton_transaction.json()), indent=4, ensure_ascii=False, sort_keys=True))
        if ton_transaction.out_msgs:
            if ton_transaction.out_msgs[0].decoded_op_name == 'jetton_transfer':
                jetton_transaction = await self.tonapi.jettons.get_jetton_transfer_event(event_id)
                self.logger.info(
                   json.dumps(json.loads(jetton_transaction.json()), indent=4, ensure_ascii=False, sort_keys=True))
                for action in jetton_transaction.actions:
                    if action.JettonTransfer:
                        status = action.status
                        amount = nano_to_amount(int(action.JettonTransfer.amount))
                        recipient = action.JettonTransfer.recipient.address.to_userfriendly(is_bounceable=True)
                        sender = action.JettonTransfer.sender.address.to_userfriendly(is_bounceable=True)
                        symbol = action.JettonTransfer.jetton.symbol
                        type = TransactionType.jetton_out.value
                        self.logger.info(
                                         f"Jetton transfer ({type})\n"
                                         f"amount: {amount} {symbol}\n"
                                         f"recipient: {recipient}\n"
                                         f"sender: {sender}\n"
                                         f"event_id: {event_id}\n"
                                         f"status: {status}\n")
            elif ton_transaction.out_msgs[0].decoded_op_name == 'text_comment':
                # self.logger.info(
                #     json.dumps(json.loads(ton_transaction.json()), indent=4, ensure_ascii=False, sort_keys=True))
                amount = nano_to_amount(ton_transaction.out_msgs[0].value)
                recipient = ton_transaction.out_msgs[0].destination.address.to_userfriendly(is_bounceable=True)
                sender = ton_transaction.out_msgs[0].source.address.to_userfriendly(is_bounceable=True)
                symbol = 'ton'
                status = 'ok' if ton_transaction.success else 'error'
                type = TransactionType.ton_out.value
                event_id = event_id
                self.logger.info(
                    f"Ton transfer ({type})\n"
                    f"amount: {amount} {symbol}\n"
                    f"recipient: {recipient}\n"
                    f"sender: {sender}\n"
                    f"event_id: {event_id}\n"
                    f"status: {status}\n")
        else:
            if not ton_transaction.in_msg.decoded_op_name:
                # self.logger.info(
                # json.dumps(json.loads(ton_transaction.json()), indent=4, ensure_ascii=False, sort_keys=True))
                amount = nano_to_amount(ton_transaction.in_msg.value)
                recipient = ton_transaction.in_msg.destination.address.to_userfriendly(is_bounceable=True)
                sender = ton_transaction.in_msg.source.address.to_userfriendly(is_bounceable=True)
                symbol = 'ton'
                status = 'ok' if ton_transaction.success else 'error'
                type = TransactionType.ton_in.value
                event_id = event_id
                self.logger.info(
                    f"Ton transfer ({type})\n"
                    f"amount: {amount} {symbol}\n"
                    f"recipient: {recipient}\n"
                    f"sender: {sender}\n"
                    f"event_id: {event_id}\n"
                    f"status: {status}\n")
            elif ton_transaction.in_msg.decoded_op_name == "jetton_notify":
                jetton_transaction = await self.tonapi.jettons.get_jetton_transfer_event(event_id)
                # self.logger.info(
                #    json.dumps(json.loads(jetton_transaction.json()), indent=4, ensure_ascii=False, sort_keys=True))
                for action in jetton_transaction.actions:
                    if action.JettonTransfer:
                        status = action.status
                        amount = nano_to_amount(int(action.JettonTransfer.amount))
                        recipient = action.JettonTransfer.recipient.address.to_userfriendly(is_bounceable=True)
                        sender = action.JettonTransfer.sender.address.to_userfriendly(is_bounceable=True)
                        symbol = action.JettonTransfer.jetton.symbol
                        type = TransactionType.jetton_in.value
                        self.logger.info(
                            f"Jetton transfer ({type})\n"
                            f"amount: {amount} {symbol}\n"
                            f"recipient: {recipient}\n"
                            f"sender: {sender}\n"
                            f"event_id: {event_id}\n"
                            f"status: {status}\n")

    async def create_transaction_ton(self):
        amount = 0.03
        create_transaction_ton.delay(amount, self.ton_wallet.test_wallet)
        self.logger.info(f"Create transaction ton task enqueued\n"
                         f"Amount: {amount}\n"
                         f"Destination address: {self.ton_wallet.test_wallet}")

    async def create_transaction_jetton(self):
        amount = 10
        create_transaction_jetton.delay(amount, self.ton_wallet.test_wallet)
        self.logger.info(f"Create transaction jetton task enqueued\n"
                         f"Amount: {amount}\n"
                         f"Destination address: {self.ton_wallet.test_wallet}")

    async def wallet_balance(self):
        await self.ton_wallet.wallet_balance()

    async def base_wallet_info(self):
        # wallet_info = await self.tonapi.accounts.get_info(self.ton_wallet.base_wallet_address)
        wallet_info = await self.tonapi.accounts.get_info("UQC4zbT6bbWvnfjHFzfK7XZN9ko9Aakgtu_aYaliX75p45-e")
        self.logger.info(
            f"Base account: {json.dumps(json.loads(wallet_info.json()), indent=4, ensure_ascii=False, sort_keys=True)}\n"
        )
        address = wallet_info.address.to_userfriendly(is_bounceable=True)
        self.logger.info(f"address: {address}\n")
    #
    # async def ton_transactions(self):
    #     response = await self.tonapi.blockchain.get_account_transactions(account_id=self.ton_wallet.ton.base_wallet)
    #     sender_address = await self.tonapi.accounts.parse_address(self.ton_wallet.ton.test_wallet)
    #     self.logger.info(f"sender address: {sender_address.raw_form}")
    #     i = 1
    #     for transaction in response.transactions:
    #         try:
    #             if sender_address.raw_form == transaction.in_msg.source.address.to_raw():
    #                 # self.logger.info(f"transaction: {json.dumps(json.loads(transaction.json()), indent=4, ensure_ascii=False, sort_keys=True)}\n")
    #                 self.logger.info(f"\nTransaction 'in' (TON) {i}:\n"
    #                                  f"Account: {sender_address.raw_form}\n"
    #                                  f"Destination address: {transaction.in_msg.destination.address}\n"
    #                                  f"Block: {transaction.block}\n"
    #                                  f"Value in TON: {nano_to_amount(transaction.in_msg.value)}\n")
    #                 i = i + 1
    #         except Exception as e:
    #             continue
    #
    # async def jetton_transactions(self):
    #     response = await self.tonapi.blockchain.get_account_transactions(account_id=self.ton_wallet.ton.base_wallet)
    #     sender_address = await self.tonapi.accounts.parse_address(self.ton_wallet.ton.test_wallet)
    #     self.logger.info(f"sender address: {sender_address.raw_form}")
    #     jetton_address = await self.tonapi.accounts.parse_address(self.ton_wallet.ton.jetton_address)
    #     self.logger.info(f"jetton address: {jetton_address.raw_form}")
    #     i = 1
    #     for transaction in response.transactions:
    #         if transaction.in_msg.decoded_op_name == "jetton_notify":
    #             try:
    #                 event = await self.tonapi.jettons.get_jetton_transfer_event(transaction.hash)
    #                 self.logger.info(
    #                     f"transaction:\n"
    #                     f" {json.dumps(json.loads(event.json()), indent=4, ensure_ascii=False, sort_keys=True)}\n"
    #                 )
    #                 i = i + 1
    #             except Exception as e:
    #                 continue
    #

    async def jetton(self):
        jetton = await self.tonapi.jettons.get_info(self.ton_wallet.jetton_address)
        self.logger.info(
            f"Jetttons:\n"
            f" {json.dumps(json.loads(jetton.json()), indent=4, ensure_ascii=False, sort_keys=True)}"
        )
        self.logger.info(f"Jetton address: {jetton.metadata.address.to_userfriendly(is_bounceable=True)}")
