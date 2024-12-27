#!/bin/bash
rm -rf data-base-hotel
# Запуск Docker Compose
docker compose -f docker-compose.dev.yml -p hotel up -d

# Проверяем, существует ли контейнер MongoDB
if ! docker ps -a --format '{{.Names}}' | grep -q "^mongodb-dev$"; then
    echo "Error: MongoDB container 'mongodb-dev' not found."
    exit 1
fi

# Дождаться инициализации MongoDB
echo "Waiting for MongoDB to finish initialization..."
sleep 5
MAX_RETRIES=60  # Таймаут: 60 попыток
RETRY_COUNT=0
DELAY=5  # Интервал ожидания между проверками (в секундах)

while ! docker exec mongodb-dev mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null 2>&1; do
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
if [ -z "$MONGO_HOTELS_WRITE_USER" ] || [ -z "$MONGO_HOTELS_WRITE_PASSWORD" ] || [ -z "$MONGO_HOTELS_READ_USER" ] || [ -z "$MONGO_HOTELS_READ_PASSWORD" ] || [ -z "$MONGO_USERS_WRITE_USER" ] || [ -z "$MONGO_USERS_WRITE_PASSWORD" ] || [ -z "$MONGO_USERS_READ_USER" ] || [ -z "$MONGO_USERS_READ_PASSWORD" ]; then
    echo "Error: One or more required environment variables are missing. Check your .env file."
    exit 1
fi

# Проверяем наличие файла mongo-init.js
if [ ! -f mongo-init.js ]; then
    echo "Error: mongo-init.js file not found."
    exit 1
fi

# хз, удаляю тест базу, чтобы супостат не смог зайти
docker exec -it mongodb-dev mongosh --quiet --eval "db.getSiblingDB('test').dropDatabase()"

# Обработка файла mongo-init.js и подстановка паролей и юзеров из .env
echo "Processing mongo-init.js with environment variables..."
TEMP_FILE=$(mktemp)
sed -e "s/__MONGO_HOTELS_WRITE_USER__/${MONGO_HOTELS_WRITE_USER}/g" \
    -e "s/__MONGO_HOTELS_WRITE_PASSWORD__/${MONGO_HOTELS_WRITE_PASSWORD}/g" \
    -e "s/__MONGO_HOTELS_READ_USER__/${MONGO_HOTELS_READ_USER}/g" \
    -e "s/__MONGO_HOTELS_READ_PASSWORD__/${MONGO_HOTELS_READ_PASSWORD}/g" \
    -e "s/__MONGO_USERS_WRITE_USER__/${MONGO_USERS_WRITE_USER}/g" \
    -e "s/__MONGO_USERS_WRITE_PASSWORD__/${MONGO_USERS_WRITE_PASSWORD}/g" \
    -e "s/__MONGO_USERS_READ_USER__/${MONGO_USERS_READ_USER}/g" \
    -e "s/__MONGO_USERS_READ_PASSWORD__/${MONGO_USERS_READ_PASSWORD}/g" \
    mongo-init.js > mongo-init-processed.js

# Выполняем скрипт в MongoDB
echo "Executing mongo-init-processed.js..."
docker exec -i mongodb-dev mongosh < mongo-init-processed.js

# Удаляем временный файл
echo "Removing processed temporary file..."
rm -f mongo-init-processed.js

# Рестарт MongoDB
echo "Restarting MongoDB..."
#docker restart hotel-backend-dev
docker restart mongodb-dev

# Таймер, если существует скрипт, то запуск (нужно чтобы бек успел поключиться к монго)
#if [ -f timer.sh ]; then
   #./timer.sh
#fi

# Вывод логов с разделителями
echo "================ BACKEND LOGS ================"
docker logs hotel-backend-dev | head -n 20 || echo "Error fetching logs for MongoDB."
echo "=============================================="

echo "================ FRONTEND LOGS ================"
docker logs hotel-frontend-dev | head -n 20 || echo "Error fetching logs for MongoDB."
echo "=============================================="

echo "================ MONGODB LOGS ================="
docker logs mongodb-dev | head -n 6 || echo "Error fetching logs for MongoDB."
echo "=============================================="

# Завершение скрипта
echo "Initialization completed successfully!"

