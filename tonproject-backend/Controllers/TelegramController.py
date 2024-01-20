from ..Objects.Telegram import Telegram
from ..Logs.Logger import Logger
from ..Messages.TelegramMessages import Messages

class TelegramController:
    def __init__(self):
        self.tg = Telegram()
        self.bot = self.tg.bot
        self.texts = Messages()
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

    async def commands(self, update):
        if update.message.text == "/start":
            await self.tg.bot.send_message(update.message.chat_id, self.texts.start.format(update.message.from_user.first_name))

    async def messages(self, update):
        await self.tg.bot.send_message(update.message.chat_id, self.texts.default)