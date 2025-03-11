#!/bin/bash

# Останавливаю и удаляю контейнеры
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
rm -rf data-base-hotel

# Запуск Docker Compose
docker compose -f docker-compose.dev.yaml -p hotel up -d

# Проверяем, существует ли контейнер MongoDB
if ! docker ps -a --format '{{.Names}}' | grep -q "^mongodb$"; then
    echo "Error: MongoDB container 'mongodb' not found."
    exit 1
fi

# Ожидание инициализации MongoDB
echo "Waiting for MongoDB to finish initialization..."
MAX_RETRIES=60
RETRY_COUNT=0
DELAY=1

while ! docker exec mongodb mongosh --quiet --eval "db.adminCommand('ping')" >/dev/null 2>&1; do
    if [ "$RETRY_COUNT" -ge "$MAX_RETRIES" ]; then
        echo "Error: MongoDB initialization timed out after $((MAX_RETRIES * DELAY)) seconds. Exiting."
        exit 1
    fi
    echo "MongoDB is still initializing... $(($MAX_RETRIES - $RETRY_COUNT)) retries remaining"
    RETRY_COUNT=$((RETRY_COUNT + 1))
    sleep $DELAY
done
sleep 5
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

# Проверяем наличие всех необходимых переменных
if [ -z "$MONGO_ROOT_USER" ] || [ -z "$MONGO_ROOT_PASSWORD" ] || [ -z "$MONGO_DB_USER" ] || [ -z "$MONGO_DB_PASSWORD" ]; then
    echo "Error: One or more required environment variables are missing. Check your .env file."
    exit 1
fi

# Проверяем наличие файла mongo-init.js
if [ ! -f ./mongo-init/mongo-init.js ]; then
    echo "Error: mongo-init.js file not found."
    exit 1
fi

# Обработка файла mongo-init.js с подстановкой переменных
echo "Processing mongo-init.js with environment variables..."
TEMP_FILE=$(mktemp)
sed -e "s/__MONGO_ROOT_USER__/${MONGO_ROOT_USER}/g" \
    -e "s/__MONGO_ROOT_PASSWORD__/${MONGO_ROOT_PASSWORD}/g" \
    -e "s/__MONGO_DB_USER__/${MONGO_DB_USER}/g" \
    -e "s/__MONGO_DB_PASSWORD__/${MONGO_DB_PASSWORD}/g" \
    ./mongo-init/mongo-init.js > ${TEMP_FILE}

# Выполняем скрипт в MongoDB
echo "Executing processed mongo-init.js..."
docker exec -i mongodb mongosh < ${TEMP_FILE}

# Удаляем временный файл после успешного выполнения
echo "Removing processed temporary file..."
rm -f ${TEMP_FILE}

# # таймер
# TIMER=30
# while [ $TIMER -gt 0 ]; do
#     clear
#     echo "Wait $TIMER seconds for starting containers"
#     TIMER=$((TIMER - 1))
#     sleep 1
# done

# # Вывод логов
# echo "================ BACKEND LOGS ================"
# docker logs server-hotel | tail -n 10 || echo "Error fetching logs for server."
# echo "=============================================="

# echo "================ FRONTEND LOGS ================"
# docker logs client-hotel | head -n 5 || echo "Error fetching logs for client."
# echo "=============================================="

# echo "================ MONGODB LOGS ================="
# docker logs mongodb | head -n 1 || echo "Error fetching logs for MongoDB."
# echo "=============================================="

# echo "================ NGINX LOGS =================="
# docker logs nginx-hotel | head -n 1 || echo "Error fetching logs for nginx."
# echo "=============================================="

# # Завершение
# echo "You are very cool!"
