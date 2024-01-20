import asyncio

from fastapi import FastAPI
from .Routes.Routes import router as items_router

from .Objects.Telegram import Telegram

app = FastAPI()

tg = Telegram()

app.include_router(items_router)


@app.on_event("startup")
async def startup_event():
    await tg.set_webhook()
