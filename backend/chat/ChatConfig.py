import os
from dotenv import load_dotenv
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, ReplyKeyboardMarkup, KeyboardButton, WebAppInfo


class Chat:
    def __init__(self):
        load_dotenv()
        self.base_dir = os.getenv('BASE_DIR')
        self.web_app_url = os.getenv('PROJECT_URL')
        self.web_app_info = WebAppInfo(self.web_app_url)
        self.start_message = (f'***🎮 Добро пожаловать! 🚀***\n\n'
                              f'Привет, азартный искатель приключений! Я - волшебная дверь в увлекательный мир игры, где каждый '
                              f'ваш шаг может приносить не только радость от захватывающего геймплея, но и реальную криптовалюту kakayato! 💰✨\n\n'

                              f'***Что вас ждет?***\n\n'

                              f'___🎲 Игровые задания, испытания и захватывающие квесты.___\n'
                              f'___🏆 Реальные вознаграждения в виде криптовалюты kakayato!___\n'
                              f'___👥 Соревнования с другими игроками и большое игровое сообщество.___\n\n'

                              f'***Чтобы начать:***\n\n'

                              f'___1️⃣ Отправьте /start, чтобы я мог провести вас через начальные настройки.___\n'
                              f'___2️⃣ Используйте команду /play для входа в игру и начала заработка.\n___'
                              f'___3️⃣ Хотите узнать больше? Введите /help для списка команд и возможностей.___\n\n'

                              f'Так что зачем ждать? Начните играть и зарабатывать прямо сейчас! 💎\n'
                              f'___Помните, чем больше вы играете, тем больше шансов заработать криптовалюту kakayato.___\n'
                              f'***Итак, вперед к приключениям!***')
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
