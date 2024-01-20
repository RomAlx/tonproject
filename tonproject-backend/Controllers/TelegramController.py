from telegram.constants import ParseMode

from ..Objects.Telegram import Telegram
from ..Logs.Logger import Logger
from ..Chat.ChatConfig import Chat


class TelegramController:
    def __init__(self):
        self.tg = Telegram()
        self.bot = self.tg.bot
        self.chat = Chat()
        self.logger = Logger(name="Telegram").get_logger()

    async def distribution(self, data):
        update = self.tg.create_update(data=data)
        if update.message:
            if update.message.entities:
                for entity in update.message.entities:
                    if entity.type == "bot_command":
                        self.logger.info(f"user id - {update.message.from_user.id} bot command - {update.message.text}")
                        await self.commands(update=update)
            else:
                self.logger.info(f"user id - {update.message.from_user.id} recieved message: {update.message.text}")
                await self.messages(update=update)

        if update.callback_query:
            await self.callback(update=update)

    async def commands(self, update):
        if update.message.text == "/start":
            await self.tg.bot.send_photo(
                chat_id=update.message.chat_id,
                photo=open((self.chat.base_dir+self.chat.start_image), "rb"),
                caption=self.chat.start_message,
                parse_mode=ParseMode.MARKDOWN,
                reply_markup=self.chat.start_keyboard()
            )

    async def messages(self, update):
        await self.tg.bot.send_message(
            chat_id=update.message.chat_id,
            text=self.chat.default,
            reply_markup=self.chat.default_keyboard()
        )

    async def callback(self, update):
        await self.bot.edit_message_reply_markup(
            chat_id=update.callback_query.message.chat_id,
            message_id=update.callback_query.message.message_id,
            reply_markup=None
        )
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