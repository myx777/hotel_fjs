# Stage 1: Build dependencies
FROM node:22.12-alpine as builder

WORKDIR /backend
COPY package*.json ./
RUN npm install --production

# Stage 2: Final image
FROM node:22.12-alpine

WORKDIR /backend
COPY --from=builder /backend/node_modules ./node_modules
COPY . .
USER nobody
CMD ["npm", "start"]
