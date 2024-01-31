import os
import json
import requests
from pathlib import Path
from dotenv import load_dotenv

from tonsdk.contract.wallet import Wallets, WalletVersionEnum
from tonsdk.contract.token.ft import JettonWallet
from tonsdk.utils import Address, to_nano
from pytonlib import TonlibClient

from pytonapi import AsyncTonapi

from backend.logs.logger import Logger


class TonWallet():

    def __init__(self):
        load_dotenv()
        self.api_key = os.getenv('TON_API_KEY')
        self.is_testnet = os.getenv('IS_TESTNET')
        self.base_wallet_address = os.getenv("WALLET")
        self.base_wallet_mnemonics = json.loads(os.getenv("MNEMONICS"))
        self.jetton_address = os.getenv("JETTON_ADDRESS")

        self.jetton_address_for_transactions = "kQCLl2EJs_pxjmw-bSsjgJYLQJadqbIIzrrN8EBLZIOLuqqi"
        self.test_wallet = "0QCqlx9DisV8e66lJqW051QKiUWNwShgnSiMlO2XuSULo7is"

        self.tonapi = AsyncTonapi(api_key=self.api_key, is_testnet=self.is_testnet)
        self.tonapi.websocket_url = os.getenv("TON_WEBSOCKET_URL")

        self.mnemonics, self.pub_k, self.priv_k, self.wallet = Wallets.from_mnemonics(
            mnemonics=self.base_wallet_mnemonics, version=WalletVersionEnum.v4r2, workchain=0)
        self.url = 'https://ton.org/testnet-global.config.json' if self.is_testnet else 'https://ton.org/global-config.json'
        self.config = requests.get(self.url).json()
        self.keystore_dir = '/tmp/ton_keystore'
        Path(self.keystore_dir).mkdir(parents=True, exist_ok=True)
        self.client = TonlibClient(ls_index=0, config=self.config, keystore=self.keystore_dir, tonlib_timeout=60)

    async def get_seqno(self, client: TonlibClient, address: str):
        data = await client.raw_run_method(method='seqno', stack_data=[], address=address)
        return int(data['stack'][0][1], 16)

    async def create_transaction_ton(self, amount: float, address: str, logger: Logger):
        try:
            await self.client.init()
            seqno = await self.get_seqno(self.client, self.base_wallet_address)
            transfer_query = self.wallet.create_transfer_message(
                to_addr=address,
                amount=to_nano(amount, 'ton'),
                seqno=seqno,
                payload='Tonproject'
            )
            transfer_message = transfer_query['message'].to_boc(False)
            await self.client.raw_send_message(transfer_message)
            logger.info(f"Ton transaction done")
        except Exception as e:
            logger.warn(f"Something went wrong: {e}")

    async def create_transaction_jetton(self, amount: float, address: str, logger: Logger):
        try:
            body = JettonWallet().create_transfer_body(
                to_address=Address(address),
                jetton_amount=to_nano(float(amount), 'ton'),
            )
            await self.client.init()
            seqno = await self.get_seqno(self.client, self.base_wallet_address)
            transfer_query = self.wallet.create_transfer_message(
                to_addr=self.jetton_address_for_transactions,
                amount=to_nano(0.01, 'ton'),
                seqno=seqno,
                payload=body
            )
            transfer_message = transfer_query['message'].to_boc(False)
            await self.client.raw_send_message(transfer_message)
            logger.info(f"Jetton transaction done")
        except Exception as e:
            logger.warn(f"Something went wrong: {e}")
