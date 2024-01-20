import json
from fastapi import APIRouter, Request
from ..Logs.Logger import Logger
from ..Controllers.TelegramController import TelegramController

router = APIRouter()
logger = Logger(name="Routes").get_logger()


@router.get("/")
async def root():
    return {"HELLO": "WORLD!"}


@router.post("/api/telegram/webhook")
async def telegram_webhook(request: Request):
    data = await request.json()
    formatted_json = json.dumps(data, indent=4, ensure_ascii=False, sort_keys=True)
    logger.info(f"Received:\n{formatted_json}")
    await TelegramController().distribution(data)
    return {"ok": "200"}
