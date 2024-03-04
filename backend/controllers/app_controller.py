import qrcode
from PIL import Image
from io import BytesIO

from ..logs.logger import Logger

from ..models.user import User
from backend.repositories.user_repository import UserRepository as user_repository
from backend.repositories.transaction_repository import TransactionRepository as transaction_repository
from ..utils.jwt_util import JWTUtil


class AppController:
    def __init__(self):
        self.logger = Logger(name="controller.app").get_logger()

    def get_user_with_tg_id(self, tg_id: int):
        user = user_repository().get_user_with_tg_id(tg_id)
        balance = user_repository().get_user_balance(user)
        token = JWTUtil().encode_user_jwt(int(user.tg_id))
        self.logger.info(f"User: {user}\n"
                         f"Balance: {balance.balance}")
        return {
            "user_id": user.id,
            "tg_id": user.tg_id,
            "np_id": user.np_id,
            "username": user.username,
            "user_balance": balance.balance,
            "token": token,
        }

    def get_user_history(self, user_id: int, page: int, per_page: int):
        transactions_page = transaction_repository().get_transaction_by_user_id(user_id, page, per_page)
        self.logger.info(f"Transactions: {transactions_page}\n")
        result = []
        for transaction in transactions_page:
            result.append(
                {
                    "payment_id": str(transaction.payment_id),
                    "payment_status": transaction.payment_status,
                    "type": transaction.type,
                    "amount": transaction.amount,
                    "symbol": transaction.symbol,
                    "date": transaction.updated_at.strftime("%d.%m")
                }
            )
        return {
            'page': page + 1,
            'result': result
        }

    def generate_qr(self, text: str):
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_H,
            box_size=10,
            border=2,
        )
        qr.add_data(text)
        qr.make(fit=True)
        img = qr.make_image(fill_color='#000000', back_color='#EBD369')

        img_byte_arr = BytesIO()
        img.save(img_byte_arr)
        img_byte_arr.seek(0)
        return img_byte_arr
