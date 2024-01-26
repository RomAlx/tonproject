import asyncio
import requests
import os
from dotenv import load_dotenv
from TonTools import *


async def init(client):
    await client.init_tonlib()


load_dotenv()
url = 'https://ton.org/testnet-global.config.json' if os.getenv("IS_TESTNET") else 'https://ton.org/global-config.json'
config = requests.get(url).json()
client = LsClient(ls_index=2, default_timeout=20)
asyncio.create_task(init(client))
