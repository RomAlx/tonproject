import json
import os
from dotenv import load_dotenv
from fastapi import APIRouter, Request
from starlette.responses import FileResponse

from ..logs.Logger import Logger
from ..controllers.TelegramController import TelegramController

router = APIRouter()
logger = Logger(name="routes").get_logger()

load_dotenv()
base_dir = os.getenv("BASE_DIR")


@router.get("/", response_class=FileResponse)
async def index():
    return (base_dir + "/static/index.html")


@router.get("/game/documentation", response_class=FileResponse)
async def index():
    return (base_dir + "/static/documentation/index.html")


@router.post("/api/telegram/webhook")
async def telegram_webhook(request: Request):
    data = await request.json()
    formatted_json = json.dumps(data, indent=4, ensure_ascii=False, sort_keys=True)
    logger.info(f"Received:\n{formatted_json}")
    await TelegramController().distribution(data)
    return {"ok": "200"}
