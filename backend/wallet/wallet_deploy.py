import asyncio
import os
import requests
from pathlib import Path
from pytonlib import TonlibClient
from tonsdk.contract.wallet import Wallets, WalletVersionEnum

async def main():
    try:
        wallet_file = input("\033[32mEnter the name of your wallet in the wallets folder \033[0m\033[33m (example: new_wallet_testnet.txt)\033[0m\033[32m:\033[0m ")

        with open('./wallets/'+wallet_file, 'r') as file:
            for line in file:
                if line.startswith('mnemonics ='):
                    # Строка содержит список мнемоник, обработаем ее
                    mnemonics_str = line.split('=', 1)[1].strip()  # Получаем часть после равно и удаляем пробелы
                    mnemonics = eval(mnemonics_str)  # Используем eval для превращения строки в список
                elif line.startswith('address ='):
                    # Строка содержит адрес, обработаем ее
                    address = line.split('=', 1)[1].strip().strip("'")
                elif line.startswith('is_testnet ='):
                    # Строка содержит информацию о тестнете
                    is_testnet_value = line.split('=', 1)[1].strip()
                    is_testnet = eval(is_testnet_value)  # Превращаем строку в значение True или False

        print("Mnemonics:", mnemonics)
        print("Address:", address)
        print("Is testnet:", is_testnet)
        print('')
    except Exception as e:
        print('\033[91mThis file was not found or it doesn`t have wallet structure\033[0m')
        exit()
    try:
        mnemonics, pub_k, priv_k, wallet = Wallets.from_mnemonics(mnemonics=mnemonics, version=WalletVersionEnum.v4r2, workchain=0)

        url = 'https://ton.org/testnet-global.config.json' if is_testnet else 'https://ton.org/global-config.json'

        config = requests.get(url).json()

        keystore_dir = '/tmp/ton_keystore'
        Path(keystore_dir).mkdir(parents=True, exist_ok=True)

        client = TonlibClient(ls_index=14, config=config, keystore=keystore_dir, tonlib_timeout=60)

        await client.init()

        query = wallet.create_init_external_message()

        deploy_message = query['message'].to_boc(False)

        await client.raw_send_message(deploy_message)
    except Exception as e:
        print(f"\033[91mYour wallet has already been initialized or has insufficient balance\033[0m\n")
        print(e)



if __name__ == '__main__':
    asyncio.get_event_loop().run_until_complete(main())