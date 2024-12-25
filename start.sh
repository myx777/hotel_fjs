#!/bin/bash

# Запуск Docker Compose
docker compose -f docker-compose.dev.yml -p hotel up -d

# Запуск секундомера
start_time=$(date +%s)

# Дождаться завершения инициализации MongoDB
echo "Waiting for MongoDB to finish initialization..."
until docker exec mongodb-dev mongosh --eval "db.stats()" >/dev/null 2>&1; do
    current_time=$(date +%s)
    elapsed_time=$((current_time - start_time))
    echo "MongoDB is still initializing... Time elapsed: $elapsed_time seconds"
    sleep 1
done

# Сообщение о завершении инициализации
echo "MongoDB is initialized!"

# Удалить скрипт из контейнера MongoDB
echo "Removing mongo-init.js from /docker-entrypoint-initdb.d/ in the container..."
docker exec mongodb-dev rm -f /docker-entrypoint-initdb.d/mongo-init.js

# Проверить, удалён ли файл (необязательно)
echo "Checking if the file is removed..."
docker exec mongodb-dev ls /docker-entrypoint-initdb.d/

# Сообщение об успешном завершении
echo "Initialization script removed successfully!"

# Перезапуск контейнера MongoDB
echo "restart mongo"
docker restart mongodb-dev

# Показать последние 10 строк логов всех контейнеров
docker compose -f docker-compose.dev.yml -p hotel logs mongodb-dev --tail 10
docker compose -f docker-compose.dev.yml -p hotel logs frontend-dev --tail 10
docker compose -f docker-compose.dev.yml -p hotel logs backend-dev --tail 10
docker compose -f docker-compose.dev.yml -p hotel logs mongo-express-dev --tail 10
