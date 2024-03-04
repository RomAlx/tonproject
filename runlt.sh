#!/bin/bash
# Скрипт runlt.sh для создания туннеля ngrok с указанным пользователем субдоменом

# Указываем ваш субдомен для ngrok (префикс перед .ngrok.io)
SUBDOMAIN="tonproject"

# Указываем порт, который будет проксироваться через ngrok
PORT="80"

echo "Создание туннеля ngrok..."

# Запускаем ngrok с привязкой к субдомену
ngrok http --domain=ideally-apparent-newt.ngrok-free.app 80

#lt --port 80 --subdomain tonproject