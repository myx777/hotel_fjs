FROM node:22.12-alpine

WORKDIR /frontend

ARG NODE_ENV=production
COPY package*.json ./
RUN npm install
COPY . .
