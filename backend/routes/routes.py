import os
from dotenv import load_dotenv
from fastapi import APIRouter
from starlette.responses import FileResponse

from ..logs.logger import Logger

router = APIRouter()
logger = Logger(name="routes.routes").get_logger()

load_dotenv()
base_dir = os.getenv("BASE_DIR")


@router.get("/", response_class=FileResponse)
async def index():
    logger.info(f"Requested: Main page")
    return (base_dir + "/static/index.html")


@router.get("/game/documentation", response_class=FileResponse)
async def index():
    logger.info(f"Requested: Game documentation")
    return (base_dir + "/static/documentation/index.html")

