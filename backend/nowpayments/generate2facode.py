import pyotp

# Ваш секретный ключ, который вы получили от NowPayments
secret = 'FRJDUSBZMIVCUZKJ'
totp = pyotp.TOTP(secret)
print(totp.now())

#553394553658