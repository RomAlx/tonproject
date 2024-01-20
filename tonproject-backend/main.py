import asyncio

from fastapi import FastAPI
from .Routes.items import router as items_router

from .Controllers.TelegramController import TelegramController

app = FastAPI()

tg = TelegramController()

app.include_router(items_router)


@app.on_event("startup")
async def startup_event():
    await tg.set_webhook()
