import secrets
import string

# Определите желаемую длину токена
token_length = 64

# Набор символов, которые будут использоваться для создания токена
characters = string.ascii_letters + string.digits  # Содержит A-Z, a-z, 0-9

# Генерация случайной строки
random_token = ''.join(secrets.choice(characters) for i in range(token_length))

print(random_token)