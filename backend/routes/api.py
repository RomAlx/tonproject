import json
from fastapi import APIRouter, Request

from ..logs.logger import Logger
from ..controllers.telegram_controller import TelegramController as telegram_controller
from ..controllers.ton_controller import TonController as ton_controller

router = APIRouter()
logger = Logger(name="api").get_logger()
ton_controller = ton_controller()
telegram_controller = telegram_controller()


async def ton_websocket_subscribe():
    await ton_controller.websocket_subscribe()


@router.post("/telegram/webhook")
async def telegram_webhook(request: Request):
    data = await request.json()
    formatted_json = json.dumps(data, indent=4, ensure_ascii=False, sort_keys=True)
    logger.info(f"Received:\n{formatted_json}")
    await telegram_controller.distribution(data)
    return {"ok": "200"}


@router.get("/ton/wallet_info")
async def ton_wallet_info():
    logger.info(f"Requested: Base account info")
    await ton_controller.base_wallet_info()
    return {"ok": "200"}


@router.get("/ton/ton_transactions")
async def ton_transactions_info():
    logger.info(f"Requested: transactions")
    await ton_controller.ton_transactions()
    return {"ok": "200"}


@router.get("/ton/jetton_transactions")
async def ton_transactions_info():
    logger.info(f"Requested: transactions")
    await ton_controller.jetton_transactions()
    return {"ok": "200"}


@router.get("/ton/jettons")
async def ton_transactions_info():
    logger.info(f"Requested: jetton")
    await ton_controller.jetton()
    return {"ok": "200"}


@router.get("/ton/create_transaction")
async def ton_transactions_info():
    logger.info(f"Requested: creating transaction")
    await ton_controller.create_transaction()
    return {"ok": "200"}

@router.get("/ton/wallet_balance")
async def ton_transactions_info():
    logger.info(f"Requested: wallet balance")
    await ton_controller.wallet_balance()
    return {"ok": "200"}
