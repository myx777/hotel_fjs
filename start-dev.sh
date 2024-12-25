#!/bin/bash

# Запуск Docker Compose
docker compose -f docker-compose.dev.yml -p hotel up -d

# Дождаться инициализации MongoDB
echo "Waiting for MongoDB to finish initialization..."
MAX_RETRIES=20  # Таймаут в секундах
RETRY_COUNT=0

while ! docker exec mongodb-dev mongosh --eval "db.stats()" >/dev/null 2>&1; do
    if [ "$RETRY_COUNT" -ge "$MAX_RETRIES" ]; then
        echo "Error: MongoDB initialization timed out. Exiting."
        exit 1
    fi
    echo "MongoDB is still initializing... $(($MAX_RETRIES - $RETRY_COUNT)) seconds remaining"
    RETRY_COUNT=$((RETRY_COUNT + 1))
    sleep 1
done
echo "MongoDB is initialized!"

# Загружаем переменные из .env
set -o allexport
source .env
set +o allexport

# Проверяем наличие всех переменных
if [ -z "$MONGO_HOTELS_WRITE_USER" ] || [ -z "$MONGO_HOTELS_WRITE_PASSWORD" ] || [ -z "$MONGO_HOTELS_READ_USER" ] || [ -z "$MONGO_HOTELS_READ_PASSWORD" ] || [ -z "$MONGO_USERS_WRITE_USER" ] || [ -z "$MONGO_USERS_WRITE_PASSWORD" ] || [ -z "$MONGO_USERS_READ_USER" ] || [ -z "$MONGO_USERS_READ_PASSWORD" ]; then
    echo "Error: One or more required environment variables are missing. Check your .env file."
    exit 1
fi

# Обработка файла mongo-init.js и подстановка паролей и юзеров из .env
echo "Processing mongo-init.js with environment variables..."
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

# Опционально: Удалить обработанный файл
rm mongo-init-processed.js

# Сообщение об успешном завершении
echo "Initialization completed successfully!"
