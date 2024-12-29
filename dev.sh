#!/bin/bash

#! останавливаю и убиваю все запущенные контейнеры и удаляю локальную бд
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
rm -rf data-base-hotel
#! убери

# Запуск Docker Compose
docker compose -f docker-compose.dev.yaml -p hotel up -d

# Проверяем, существует ли контейнер MongoDB
if ! docker ps -a --format '{{.Names}}' | grep -q "^mongodb$"; then
    echo "Error: MongoDB container 'mongodb' not found."
    exit 1
fi

# Дождаться инициализации MongoDB на основе пинга
echo "Waiting for MongoDB to finish initialization..."

MAX_RETRIES=60  # Таймаут: 60 попыток
RETRY_COUNT=0
DELAY=5  # Интервал ожидания между проверками (в секундах)

while ! docker exec mongodb mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null 2>&1; do
    if [ "$RETRY_COUNT" -ge "$MAX_RETRIES" ]; then
        echo "Error: MongoDB initialization timed out after $((MAX_RETRIES * DELAY)) seconds. Exiting."
        exit 1
    fi
    echo "MongoDB is still initializing... $(($MAX_RETRIES - $RETRY_COUNT)) retries remaining"
    RETRY_COUNT=$((RETRY_COUNT + 1))
    sleep $DELAY
done

echo "MongoDB is initialized!"

# Проверяем наличие файла .env
if [ ! -f .env ]; then
    echo "Error: .env file not found."
    exit 1
fi

# Загружаем переменные из .env
set -o allexport
source .env
set +o allexport

# Проверяем наличие всех переменных
if [ -z "$MONGO_ROOT_USER" ] || [ -z "$MONGO_ROOT_PASSWORD" ] || [ -z "$MONGO_HOTELS_USER" ] || [ -z "$MONGO_HOTELS_PASSWORD" ]; then
    echo "Error: One or more required environment variables are missing. Check your .env file."
    exit 1
fi

# Проверяем наличие файла mongo-init.js
if [ ! -f mongo-init.js ]; then
    echo "Error: mongo-init.js file not found."
    exit 1
fi

# Обработка файла mongo-init.js и подстановка паролей и юзеров из .env
echo "Processing mongo-init.js with environment variables..."
TEMP_FILE=$(mktemp)
sed -e "s/__MONGO_ROOT_USER__/${MONGO_ROOT_USER}/g" \
    -e "s/__MONGO_ROOT_PASSWORD__/${MONGO_ROOT_PASSWORD}/g" \
    -e "s/__MONGO_HOTELS_USER__/${MONGO_HOTELS_USER}/g" \
    -e "s/__MONGO_HOTELS_PASSWORD__/${MONGO_HOTELS_PASSWORD}/g" \
    mongo-init.js > mongo-init-processed.js

# Выполняем скрипт в MongoDB
echo "Executing mongo-init-processed.js..."
docker exec -i mongodb mongosh < mongo-init-processed.js

# хз, удаляю тест базу, чтобы супостат не смог зайти
#docker exec -it mongodb-dev mongosh --quiet --eval "db.getSiblingDB('test').dropDatabase()"

# Удаляем временный файл
echo "Removing processed temporary file..."
rm -f mongo-init-processed.js

# Таймер, если существует скрипт, то запуск (нужно чтобы бек успел поключиться к монго)
#if [ -f timer.sh ]; then
   #./timer.sh
#fi

sleep 10
# Вывод логов с разделителями
echo "================ BACKEND LOGS ================"
docker logs server | head -n 20 || echo "Error fetching logs for MongoDB."
echo "=============================================="

echo "================ FRONTEND LOGS ================"
docker logs client | head -n 20 || echo "Error fetching logs for MongoDB."
echo "=============================================="

echo "================ MONGODB LOGS ================="
docker logs mongodb | head -n 6 || echo "Error fetching logs for MongoDB."
echo "=============================================="

# Завершение скрипта
echo "Initialization completed successfully!"

# ToDo: добавь cron для бекапа mongo