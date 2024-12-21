#!/bin/bash

# Запуск Docker Compose
docker compose -f docker-compose.dev.yml -p hotel up -d

# Дать контейнерам время для запуска и выполнения начального скрипта
echo "Waiting for MongoDB initialization..."
sleep 10  # Увеличьте время при необходимости

# Удалить mongo-init.js из контейнера MongoDB
echo "Removing mongo-init.js from MongoDB container..."
docker exec mongodb rm -f /docker-entrypoint-initdb.d/mongo-init.js

# Показать логи контейнеров
docker compose -f docker-compose.dev.yml -p hotel logs -f
