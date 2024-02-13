from telegram import Update, ReplyKeyboardRemove
from telegram.constants import ParseMode

from ..controllers.nowpayments_controller import NowPaymentsController

from backend.repositories.user_repository import UserRepository as user_repository

from ..objects.Telegram import Telegram
from ..logs.logger import Logger
from ..chat.chat_config import Chat


class TelegramController:
    def __init__(self):
        self.logger = Logger(name="controller.telegram").get_logger()
        self.chat = Chat()
        self.tg = Telegram()
        self.bot = self.tg.bot

    async def distribution(self, data, np_c):
        self.np_c = np_c
        update = self.tg.create_update(data=data)
        if update.message:
            if update.message.entities:
                for entity in update.message.entities:
                    if entity.type == "bot_command":
                        self.logger.info(
                            f"user id - {update.message.from_user.id} username - {update.message.from_user.first_name} bot command - {update.message.text}")
                        await self.commands(update=update)
            else:
                self.logger.info(f"user id - {update.message.from_user.id} recieved message: {update.message.text}")
                await self.messages(update=update)

        if update.callback_query:
            await self.callback(update=update)

    async def remove_keyboard(self, update: Update, type: str):
        if type == 'callback':
            try:
                await self.bot.edit_message_reply_markup(
                    chat_id=update.callback_query.message.chat_id,
                    message_id=update.callback_query.message.message_id,
                    reply_markup=None
                )
            except Exception as e:
                self.logger.warn('There is no reply markup for delete')
        elif type == 'message':
            try:
                await self.bot.edit_message_reply_markup(
                    chat_id=update.message.chat_id,
                    message_id=update.message.message_id,
                    reply_markup=ReplyKeyboardRemove()
                )
            except Exception as e:
                self.logger.warn('There is no reply markup for delete')

    async def commands(self, update):
        await self.remove_keyboard(update, 'message')
        if update.message.text == "/start":
            user = user_repository.create_user(tg_id=update.message.from_user.id,
                                               username=update.message.from_user.first_name)
            if not user.np_id:
                user.np_id = await  self.np_c.create_new_user(user.tg_id)
                user_repository.update_user(user)
            self.logger.info(f'User: {user}')
            await self.tg.bot.send_photo(
                chat_id=update.message.chat_id,
                photo=open((self.chat.base_dir + self.chat.start_image), "rb"),
                caption=self.chat.start_message,
                parse_mode=ParseMode.MARKDOWN,
                reply_markup=self.chat.start_keyboard()
            )

    async def messages(self, update):
        await self.remove_keyboard(update, 'message')
        await self.tg.bot.send_message(
            chat_id=update.message.chat_id,
            text=self.chat.default,
            reply_markup=self.chat.default_keyboard()
        )

    async def callback(self, update):
        await self.remove_keyboard(update, 'callback')
        if update.callback_query.data == "game":
            await self.tg.bot.send_message(
                chat_id=update.callback_query.message.chat_id,
                text='wait',
                reply_markup=self.chat.start_keyboard()
            )
        elif update.callback_query.data == "not game":
            await self.tg.bot.send_message(
                chat_id=update.callback_query.message.chat_id,
                text='there is no games',
                reply_markup=self.chat.start_keyboard()
            )
