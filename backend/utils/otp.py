import pyotp


# Функция для генерации текущего 2FA кода.
def generate_2fa_code(secret_key):
    totp = pyotp.TOTP(secret_key)
    return totp.now()