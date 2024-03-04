from fastapi import HTTPException

from backend.utils.jwt_util import JWTUtil


class TokenMiddleware():
    @staticmethod
    def authenticate(request):
        token = request.headers.get('X-AUTH')
        if not token:
            raise HTTPException(status_code=400, detail="X-AUTH header is missing")

        try:
            payload = JWTUtil().decode_user_jwt(token)
            tg_id = payload.get('tg_id')
            if not tg_id:
                raise HTTPException(status_code=400, detail="tg_id is missing in the token")
        except Exception as e:
            raise HTTPException(status_code=400, detail=str(e))
        return int(payload.get('tg_id'))