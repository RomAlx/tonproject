import json
from fastapi import APIRouter, Request

from ..logs.Logger import Logger
from ..controllers.TelegramController import TelegramController
from ..controllers.TonController import TonController

router = APIRouter()
logger = Logger(name="api").get_logger()


@router.post("/telegram/webhook")
async def telegram_webhook(request: Request):
    data = await request.json()
    formatted_json = json.dumps(data, indent=4, ensure_ascii=False, sort_keys=True)
    logger.info(f"Received:\n{formatted_json}")
    await TelegramController().distribution(data)
    return {"ok": "200"}


@router.get("/ton/wallet_info")
async def ton_wallet_info():
    logger.info(f"Requested: Base account info")
    await TonController().base_wallet_info()
    return {"ok": "200"}