import qrcode
from PIL import Image
from io import BytesIO

from ..logs.logger import Logger

from ..models.user import User
from backend.repositories.user_repository import UserRepository as user_repository


class AppController:
    def __init__(self):
        self.logger = Logger(name="app_controller").get_logger()

    def get_user_with_tg_id(self, tg_id: int):
        user = user_repository().get_user_with_tg_id(tg_id)
        balance = user_repository().get_user_balance(user)
        self.logger.info(f"User: {user}\n"
                         f"Balance: {balance.balance}")
        return {
            "user_id": user.id,
            "tg_id": user.tg_id,
            "np_id": user.np_id,
            "username": user.username,
            "user_balance": balance.balance
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
