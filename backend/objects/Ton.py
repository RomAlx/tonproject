import os
from dotenv import load_dotenv
from pytonapi import AsyncTonapi


class Ton():
    def __init__(self):
        load_dotenv()
        self.api_key = os.getenv('TON_API_KEY')
        self.tonapi = AsyncTonapi(api_key=self.api_key, is_testnet=True)
