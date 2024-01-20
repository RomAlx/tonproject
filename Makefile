DOCKER_COMPOSE_DEV = docker-compose -f docker-compose.dev.yml
DOCKER_COMPOSE_PROD = docker-compose -f docker-compose.prod.yml
FRONTEND_DIR = tonproject-frontend

# Цель по умолчанию
all: dev

# Сборка и запуск для разработки
dev: #build_dev
	rm -rf ./tonproject-backend/static/*
	cp -R ./tonproject-frontend/dist/* ./tonproject-backend/static/
	cp -R ./tonproject-frontend/documentation ./tonproject-backend/static/
	$(DOCKER_COMPOSE_DEV) up --force-recreate

# Сборка и запуск для продакшн
prod: build_prod
	cd $(FRONTEND_DIR) && npm run build
	cd ..
	rm -rf ./tonproject-backend/static/*
	cp -R ./tonproject-frontend/dist/* ./tonproject-backend/static/
	$(DOCKER_COMPOSE_PROD) up

# Сборка для разработки
build_dev:
	$(DOCKER_COMPOSE_DEV) build

# Сборка для продакшн
build_prod:
	$(DOCKER_COMPOSE_PROD) build

# Чистка для разработки
clean_dev:
	$(DOCKER_COMPOSE_DEV) down

# Чистка для продакшн
clean_prod:
	$(DOCKER_COMPOSE_PROD) down