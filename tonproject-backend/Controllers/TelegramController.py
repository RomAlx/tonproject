import os
from dotenv import load_dotenv
from telegram.ext import Application, CommandHandler, MessageHandler
from telegram import Bot, Update
from queue import Queue


class TelegramController:
    def __init__(self):
        load_dotenv()
        self.queue = Queue()
        self.token = os.getenv('TELEGRAM_BOT_API_TOKEN')
        self.webhook = os.getenv('PROJECT_URL') + '/api/telegram/webhook'
        self.application = Application.builder().token(self.token).updater(None).build()

    async def set_webhook(self):
        await self.application.bot.deleteWebhook()
        await self.application.bot.set_webhook(url=self.webhook, allowed_updates=Update.ALL_TYPES)
