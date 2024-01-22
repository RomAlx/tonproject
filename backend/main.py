import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from .routes.routes import router as routes
from .routes.api import router as api

from .objects.Telegram import Telegram

app = FastAPI()
tg = Telegram()

load_dotenv()
base_dir = os.getenv("BASE_DIR")

app.include_router(routes)
app.include_router(api, prefix="/api")

app.mount("/", StaticFiles(directory=(base_dir+"/static"), html=True), name="static")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешает все источники
    allow_credentials=True,
    allow_methods=["*"],  # Разрешает все методы
    allow_headers=["*"],  # Разрешает все заголовки
)




@app.on_event("startup")
async def startup_event():
    await tg.set_webhook()
