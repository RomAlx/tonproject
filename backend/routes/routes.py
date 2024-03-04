import os
from dotenv import load_dotenv
from fastapi import APIRouter, Request, Header
from starlette.responses import FileResponse

from ..logs.logger import Logger
from fastapi.templating import Jinja2Templates
from ..utils.jwt_util import JWTUtil

router = APIRouter()
logger = Logger(name="routes.routes").get_logger()

load_dotenv()
base_dir = os.getenv("BASE_DIR")

templates = Jinja2Templates(directory=(base_dir + "/static/game"))


@router.get("/", response_class=FileResponse)
async def index():
    logger.info(f"Requested: Main page")
    return (base_dir + "/static/index.html")
#
#
# @router.get("/game", response_class=FileResponse)
# async def index(tg_id: str, request: Request):
#     logger.info(f"Requested: Game page")
#     context = {"request": request, "token": JWTUtil().encode_user_jwt(int(tg_id))}
#     return templates.TemplateResponse("index.html", context)
#
#
# @router.get("/game/documentation", response_class=FileResponse)
# async def index():
#     logger.info(f"Requested: Game documentation")
#     return (base_dir + "/static/documentation/index.html")
