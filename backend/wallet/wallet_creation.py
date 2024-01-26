import asyncio
import os
import requests
from pathlib import Path
from pytonlib import TonlibClient
from tonsdk.contract.wallet import Wallets, WalletVersionEnum


def input_net():
    user_input_str = input("\033[32mEnter kind of ton net \033[0m(1 - mainnet| 0 - testnet): ")
    if user_input_str == "0":
        is_testnet = True
    elif user_input_str == "1":
        is_testnet = False
    else:
        print("Invalid\n")
        is_testnet = input_net()
    return is_testnet


def main():
    is_testnet = input_net()
    print(f"\033[32mIs testnet:\033[0m {is_testnet}\n")
    mnemonics, pub_k, priv_k, wallet = Wallets.create(version=WalletVersionEnum.v4r2, workchain=0)
    wallet_address = wallet.address.to_string(True, True, True, True) if is_testnet else wallet.address.to_string(True, True, True, False)
    file_path = f"wallet/wallets/new_wallet_testnet.txt" if is_testnet else f"wallet/wallets/new_wallet_mainnet.txt"
    # Создаем каталог, если он не существует
    os.makedirs(os.path.dirname(file_path), exist_ok=True)

    # Инициализируем счетчик и путь к файлу
    counter = 0
    new_file_path = file_path

    # Проверяем, существует ли файл, и ищем свободное имя, добавляя "(1)", "(2)", и так далее.
    while os.path.isfile(new_file_path):
        counter += 1
        base, extension = os.path.splitext(file_path)
        new_file_path = f"{base}({counter}){extension}"

    # Запись данных в файл
    with open(new_file_path, 'w') as file:
        file.write(f"mnemonics = {mnemonics}\n")
        file.write(f"address = '{wallet_address}'\n")
        file.write(f"is_testnet = {is_testnet}\n")

    print(f"\033[32mYour wallet: \033[0m{new_file_path}\n"
          f"\033[32mYour wallet address: \033[0m{wallet_address}\n"
          f"\033[33mNow you need to top up your wallet balance and run the next command:\033[0m "
          f"python3 wallet_deploy.py")


if __name__ == "__main__":
    main()

# from tonsdk.contract.wallet import Wallets, WalletVersionEnum
#
# mnemonics = ['level', 'wire', 'work', 'suit', 'cement', 'cause', 'drive', 'knee', 'aim', 'adjust', 'diamond', 'east',
#              'garment', 'demise', 'else', 'turtle', 'bus', 'wrestle', 'fuel', 'exhaust', 'tonight', 'key', 'expand',
#              'zero']
# # tonkeeper_mnemonics = ["scatter", "leaf", "banner", "fat", "local", "machine", "wasp", "employ", "sand", "submit", "panda", "suggest", "awesome", "issue", "magic", "clown", "doctor", "soap", "excite", "sense", "reason", "mountain", "protect", "burden"]
# mnemonics, pub_k, priv_k, wallet = Wallets.from_mnemonics(mnemonics=mnemonics, version=WalletVersionEnum.v4r2,
#                                                           workchain=0)
#
# wallet_address = wallet.address.to_string(True, True, True, True)
#
# if __name__ == '__main__':
#     print(mnemonics)
#     print(wallet.address.to_string(True, True, True, True))
#
# import asyncio
#
# from pytonlib import TonlibClient
# from wallet_creation import wallet, wallet_address
# from tonsdk.utils import to_nano
#
# import requests
# from pathlib import Path
#
#
# async def get_seqno(client: TonlibClient, address: str):
#     data = await client.raw_run_method(method='seqno', stack_data=[], address=wallet_address)
#     return int(data['stack'][0][1], 16)
#
#
# async def main():
#     url = 'https://ton.org/testnet-global.config.json'
#
#     config = requests.get(url).json()
#
#     keystore_dir = '/tmp/ton_keystore'
#     Path(keystore_dir).mkdir(parents=True, exist_ok=True)
#
#     client = TonlibClient(ls_index=14, config=config, keystore=keystore_dir, tonlib_timeout=60)
#     print(wallet.address.to_string(True, True, True, True))
#
#     await client.init()
#
#     query = wallet.create_init_external_message()
#
#     deploy_message = query['message'].to_boc(False)
#
#     # print(deploy_message)
#
#     # await client.raw_send_message(deploy_message)
#
#     seqno = await get_seqno(client, wallet_address)
#
#     print(seqno)
#
#     # kQAke8HNprvmfFnZPbIH6SW7Ubi4dgQYGs9BcDpu__cuL6BB - base_wallet_address (?)
#
#     transfer_query = wallet.create_transfer_message(to_addr='0QAke8HNprvmfFnZPbIH6SW7Ubi4dgQYGs9BcDpu__cuL_2E',
#                                                     amount=to_nano(0.03, 'ton'), seqno=seqno, payload='Works?')
#
#     transfer_message = transfer_query['message'].to_boc(False)
#
#     await client.raw_send_message(transfer_message)
#
#
# if __name__ == '__main__':
#     asyncio.get_event_loop().run_until_complete(main())
