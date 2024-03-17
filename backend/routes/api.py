import asyncio
import json
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import JSONResponse, StreamingResponse

from ..logs.logger import Logger
from ..controllers.telegram_controller import TelegramController as telegram_controller
from ..controllers.app_controller import AppController as app_controller
from ..controllers.nowpayments_controller import NowPaymentsController as nowpayments_controller
from ..controllers.game_controller import GameController as game_controller
from ..middleware.TokenMiddleware import TokenMiddleware
from ..repositories.user_repository import UserRepository
# from ..utils.jwt_util import JWTUtil

# from ..controllers.ton_controller import TonController as ton_controller

router = APIRouter()
logger = Logger(name="routes.api").get_logger()
# ton_controller = ton_controller()
telegram_controller = telegram_controller()
app_controller = app_controller()
nowpayments_controller = nowpayments_controller()


# async def ton_websocket_subscribe():
#     await ton_controller.websocket_subscribe()


@router.post("/telegram/webhook")
async def telegram_webhook(request: Request):
    try:
        data = await request.json()
        formatted_json = json.dumps(data, indent=4, ensure_ascii=False, sort_keys=True)
        logger.info(f"Received:\n{formatted_json}")
        await telegram_controller.distribution(data, nowpayments_controller)
        return {"ok": "200"}
    except Exception as e:
        print(e)


@router.get("/app/user")
async def app_user_get(request: Request):
    try:
        tg_id = int(request.query_params.get('tg_id'))
        logger.info(f"Requested user: {tg_id}")
        data = app_controller.get_user_with_tg_id(tg_id=tg_id)
        return JSONResponse(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/app/get_history")
async def app_get_history(request: Request):
    try:
        TokenMiddleware().authenticate(request)
        user_id = int(request.query_params.get('user_id'))
        page = int(request.query_params.get('page', 0))
        per_page = int(request.query_params.get('per_page'))
        logger.info(f"Requested user history: {user_id}")
        data = app_controller.get_user_history(user_id=user_id, page=page, per_page=per_page)
        return JSONResponse(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/app/generate_qr")
async def generate_qr(request: Request):
    try:
        text = str(request.query_params.get('text'))
        logger.info(f"Requested qr code generate: {text}")
        img_stream = app_controller.generate_qr(text=text)
        response = StreamingResponse(img_stream, media_type="image/png")
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/app/game")
async def game(request: Request):
    try:
        tg_id = TokenMiddleware().authenticate(request)
        user = UserRepository().get_user_with_tg_id(tg_id)
        logger.info(f"Game for tg_id: {tg_id}")
        data = await request.json()
        game_result = game_controller(data['rows']).get_game_result(data)
        # if game_result['result'] < 0:
        #     await asyncio.create_task(nowpayments_controller.write_off_to_main(-game_result['result'], user.np_id))
        # if game_result['result'] > 0:
        #     await asyncio.create_task(nowpayments_controller.deposit_from_main(game_result['result'], user.np_id))
        return JSONResponse(game_result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/np/get_balance")
async def get_balance(request: Request):
    try:
        np_id = str(request.query_params.get('np_id'))
        logger.info(f"Requested symbol payment info: {np_id}")
        data = await nowpayments_controller.get_user_balance(np_id=np_id)
    except Exception as e:
        data = {"error": str(e)}
    return JSONResponse(data)


@router.get("/np/min_payment")
async def min_payment(request: Request):
    try:
        TokenMiddleware().authenticate(request)
        symbol = str(request.query_params.get('symbol'))
        logger.info(f"Requested symbol payment info: {symbol}")
        data = await nowpayments_controller.get_min_payment(symbol=symbol)
        return JSONResponse(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/np/create_payment_page")
async def pay_page(request: Request):
    try:
        np_id = int(request.query_params.get('np_id'))
        amount = float(request.query_params.get('amount'))
        currency_to = str(request.query_params.get('currency_to'))
        currency_from = str(request.query_params.get('currency_from'))
        logger.info(f"Requested payment:\n"
                    f"NP id: {np_id}\n"
                    f"amount: {amount}\n"
                    f"currency_to: {currency_to}\n"
                    f"currency_from: {currency_from}")
        data = await nowpayments_controller.get_pay_page(
            np_id=np_id,
            amount=amount,
            currency_from=currency_from)
        return JSONResponse(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/np/create_payout")
async def create_payout(request: Request):
    try:
        data = await request.json()
        formatted_json = json.dumps(data, indent=4, ensure_ascii=False, sort_keys=True)
        logger.info(f"Create payout:\n{formatted_json}")
        await nowpayments_controller.create_payout_transfer(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/np/payment_status")
async def payment_status(request: Request):
    try:
        data = await request.json()
        formatted_json = json.dumps(data, indent=4, ensure_ascii=False, sort_keys=True)
        logger.info(f"Received payment status:\n{formatted_json}")
        await nowpayments_controller.update_payment_status(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/np/payout_status")
async def payout_status(request: Request):
    try:
        data = await request.json()
        formatted_json = json.dumps(data, indent=4, ensure_ascii=False, sort_keys=True)
        logger.info(f"Received payout status:\n{formatted_json}")
        await nowpayments_controller.update_payout_status(data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/np/pay_from_main")
async def pay_from_main(request: Request):
    try:
        np_id = str(request.query_params.get('np_id'))
        amount = float(request.query_params.get('amount'))
        logger.info(f"Received payout from main to sub:\n"
                    f"sub_id: {np_id}\n"
                    f"amount: {amount}")
        await nowpayments_controller.pay_from_main(np_id, amount)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#
# @router.get("/ton/wallet_info")
# async def ton_wallet_info():
#     logger.info(f"Requested: Base account info")
#     await ton_controller.base_wallet_info()
#     return {"ok": "200"}
#
#
# @router.get("/ton/ton_transactions")
# async def ton_transactions_info():
#     logger.info(f"Requested: transactions")
#     await ton_controller.ton_transactions()
#     return {"ok": "200"}
#
#
# @router.get("/ton/jetton_transactions")
# async def ton_transactions_info():
#     logger.info(f"Requested: transactions")
#     await ton_controller.jetton_transactions()
#     return {"ok": "200"}
#
#
# @router.get("/ton/jettons")
# async def ton_transactions_info():
#     logger.info(f"Requested: jetton")
#     await ton_controller.jetton()
#     return {"ok": "200"}
#
#
# @router.get("/ton/create_transaction_ton")
# async def create_transaction_ton():
#     logger.info(f"Requested: creating transaction ton")
#     await ton_controller.create_transaction_ton()
#     return {"ok": "200"}
#
#
# @router.get("/ton/create_transaction_jetton")
# async def create_transaction_jetton():
#     logger.info(f"Requested: creating transaction jetton")
#     await ton_controller.create_transaction_jetton()
#     return {"ok": "200"}
#
#
# @router.get("/ton/wallet_balance")
# async def ton_transactions_info():
#     logger.info(f"Requested: wallet balance")
#     await ton_controller.wallet_balance()
#     return {"ok": "200"}
