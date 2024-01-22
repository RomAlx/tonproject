import os
import json
from dotenv import load_dotenv

from ..objects.Ton import Ton
from ..logs.Logger import Logger


class TonController:
    def __init__(self):
        load_dotenv()
        self.ton = Ton()
        self.tonapi = self.ton.tonapi
        self.base_wallet = os.getenv("WALLET")
        self.logger = Logger(name="ton").get_logger()
        self.logger.info(f"Wallet: {self.base_wallet}\n")

    async def base_wallet_info(self):
        account = await self.tonapi.accounts.get_info(account_id=self.base_wallet)
        jettons = await self.tonapi.accounts.get_jettons_balances(account_id=self.base_wallet)
        jettons = json.loads(jettons.json())
        self.logger.info(f"Base wallet info: {account.address.to_userfriendly()}\n"
                         f"Balance TON: {account.balance.to_amount()}\n"
                         f"Jettons: {json.dumps(jettons, indent=4, ensure_ascii=False, sort_keys=True)}")
