from dotenv import load_dotenv

from TonTools import *

from backend.objects.Ton.Ton import Ton
from backend.objects.Ton.TonClient import client
from backend.logs.logger import Logger


class TonWallet():

    def __init__(self):
        load_dotenv()
        self.logger = Logger(name="ton_wallet").get_logger()
        self.ton = Ton()
        self.client = client
        self.wallet = Wallet(mnemonics=self.ton.base_wallet_mnemonics, provider=self.client, version='v4r2')

    async def client_init(self):
        await self.client.init_tonlib()

    async def create_ton_transaction(self, to_address: str, amount: float):
        response = await self.wallet.transfer_ton(destination_address=to_address, amount=amount, message='JOPA')
        self.logger.info(f"Ton: {response}")

    async def wallet_balance(self):
        response = await self.wallet.get_balance()
        self.logger.info(f"balance: {response}")
