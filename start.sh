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

# Выполнение скрипта mongo-init.js
echo "Starting script: mongo-init.js"
docker exec -i mongodb-dev mongosh < ./mongo-init.js

# Удалить mongo-init.js из контейнера MongoDB
#echo "Removing mongo-init.js, .env from container..."
#rm -f ./mongo-init.js ./.env && echo "mongo-init.js, .env removed successfully."

#echo "Please wait 10 sec."
#sleep 10

# Показать последние 50 строк логов всех контейнеров
#echo "Displaying the last 100 lines of logs:"
#docker compose -f docker-compose.dev.yml -p hotel logs --tail 100
