import os
from dotenv import load_dotenv
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, ReplyKeyboardMarkup, KeyboardButton, WebAppInfo


class Chat:
    def __init__(self):
        load_dotenv()
        self.base_dir = os.getenv('BASE_DIR')
        self.web_app_url = os.getenv('PROJECT_URL') + '/#/'
        self.web_app_info = WebAppInfo(self.web_app_url)
        self.start_message = f'***🎮 Добро пожаловать! 🚀***\n\n'
        self.start_image = '/chat/img/start_img.jpg'
        self.default = 'I do not understand'

    def start_keyboard(self) -> InlineKeyboardMarkup:
        keyboard = [
            [InlineKeyboardButton(text="Open Game", web_app=self.web_app_info)]
        ]
        return InlineKeyboardMarkup(keyboard)

    def default_keyboard(self) -> ReplyKeyboardMarkup:
        keyboard = [
            [KeyboardButton(text="Кнопка 1"), KeyboardButton(text="Кнопка 2")],
            [KeyboardButton(text="Кнопка 3")]
        ]
        return ReplyKeyboardMarkup(keyboard, resize_keyboard=True, one_time_keyboard=True)
