DOCKER_COMPOSE_DEV = docker-compose -f docker-compose.dev.yml
DOCKER_COMPOSE_PROD = docker-compose -f docker-compose.prod.yml
FRONTEND_DIR = frontend

# Цель по умолчанию
all: dev

# Сборка и запуск для разработки
dev:
	rm -rf ./backend/static/*
	cp -R ./frontend/dist/* ./backend/static/
	cp -R ./frontend/documentation ./backend/static/
	$(DOCKER_COMPOSE_DEV) up --force-recreate

# Сборка и запуск для продакшн
prod:
	cd $(FRONTEND_DIR) && npm run build
	cd ..
	rm -rf ./backend/static/*
	cp -R ./frontend/dist/* ./backend/static/
	$(DOCKER_COMPOSE_PROD) up

# Сборка для разработки
build_dev:
	$(DOCKER_COMPOSE_DEV) build
	rm -rf ./backend/static/*
	cp -R ./frontend/dist/* ./backend/static/
	cp -R ./frontend/documentation ./backend/static/
	$(DOCKER_COMPOSE_DEV) up --force-recreate

# Сборка для продакшн
build_prod:
	$(DOCKER_COMPOSE_PROD) build
	cd $(FRONTEND_DIR) && npm run build
	cd ..
	rm -rf ./backend/static/*
	cp -R ./frontend/dist/* ./backend/static/
	$(DOCKER_COMPOSE_PROD) up

# Чистка для разработки
clean_dev:
	$(DOCKER_COMPOSE_DEV) down

# Чистка для продакшн
clean_prod:
	$(DOCKER_COMPOSE_PROD) down