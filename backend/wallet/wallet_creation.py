import os
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
