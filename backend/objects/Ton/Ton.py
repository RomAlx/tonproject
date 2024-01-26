import os
import json
from dotenv import load_dotenv
# from pytonapi import AsyncTonapi


class Ton():
    def __init__(self):
        load_dotenv()
        self.api_key = os.getenv('TON_API_KEY')
        self.is_testnet = os.getenv('IS_TESTNET')
        # self.tonapi = AsyncTonapi(api_key=self.api_key, is_testnet=self.is_testnet)
        self.base_wallet = os.getenv("WALLET")
        self.base_wallet_mnemonics = json.loads(os.getenv("MNEMONICS"))
        self.jetton_address = os.getenv("JETTON_ADDRESS")
        self.test_wallet = "0QCqlx9DisV8e66lJqW051QKiUWNwShgnSiMlO2XuSULo7is"
