# Используем официальный образ Python как базовый
FROM python:3.9

ARG PROJECT_URL
ENV PROJECT_URL=${PROJECT_URL}
ARG IS_TESTNET
ENV IS_TESTNET=${IS_TESTNET}
ARG TON_API_KEY
ENV TON_API_KEY=${TON_API_KEY}
ARG WALLET
ENV WALLET=${WALLET}
ARG JETTON_ADDRESS
ENV JETTON_ADDRESS=${JETTON_ADDRESS}
ARG TON_WEBSOCKET_URL
ENV TON_WEBSOCKET_URL=${TON_WEBSOCKET_URL}
ENV PYTHONPATH="${PYTHONPATH}:/var/www"

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /var/www

# Копируем файлы зависимостей и устанавливаем их
COPY requirements.txt .
RUN pip install -r requirements.txt

# Копируем остальные файлы проекта в рабочую директорию
COPY . .

RUN pip install ./libs/python-telegram-bot-master

# Указываем порт, на котором будет работать приложение
EXPOSE 8000

# Запускаем приложение FastAPI с помощью Uvicorn
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]