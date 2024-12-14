FROM node:22.12-alpine

WORKDIR /backend

ARG NODE_ENV=production
COPY package*.json ./
RUN npm install
COPY . .

CMD [ "npm", "start", "prod" ]