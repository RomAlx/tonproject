import jwt
import datetime


class JWTUtil:
    def __init__(self):
        self.secret_key = "ac32bcc471cef02a684855e3a4cf3d3d1ec149e64dc5478e2961d8f0534feba8"

    def encode_user_jwt(self, tg_id: int):
        payload = {
            "tg_id": tg_id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24),
            "iat": datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, self.secret_key, algorithm="HS256")

        return token

    def decode_user_jwt(self, token: str):
        token = token.replace('Bearer ', '', 1)
        data = jwt.decode(token, self.secret_key, algorithms=["HS256"])

        return data
