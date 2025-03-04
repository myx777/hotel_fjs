# Стадия 1: Установка зависимостей для разработки
FROM node:20-alpine AS development-dependencies-env
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci

# Стадия 2: Установка зависимостей для продакшн
FROM node:20-alpine AS production-dependencies-env
WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm ci --omit=dev

# Стадия 3: Сборка проекта
FROM node:20-alpine AS build-env
WORKDIR /app
# Скопировать весь проект в контейнер
COPY . /app/   
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
RUN npm run build

# Финальная стадия: Производственный контейнер
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build
CMD ["npm", "run", "start"]
