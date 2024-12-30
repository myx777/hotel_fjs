import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/**
 * Модуль для подключения к MongoDB
 * 
 * Этот модуль обеспечивает подключение к базе данных MongoDB
 * с использованием параметров, указанных в переменных окружения.
 * Также он настраивает обработку событий соединения.
 * 
 * @module ConnectModule
 */
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: `mongodb://mongo:27017/${process.env.MONGO_DB_NAME}`,
        user: process.env.MONGO_HOTELS_WRITE_USER,
        pass: process.env.MONGO_HOTELS_WRITE_PASSWORD,
        serverSelectionTimeoutMS: 5000,
        connectionFactory: (connection) => {
          // Проверяем состояние соединения
          if (connection.readyState === 1) {
            console.log(
              `✅ Connected to MongoDB: ${connection.db.databaseName}`,
            );
          } else {
            console.warn('⚠️ MongoDB connection is not ready');
          }

          // Подписываемся на события
          connection.on('connected', () => {
            console.log(
              `✅ Connected to MongoDB: ${connection.db.databaseName}`,
            );
          });
          connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
          });
          connection.on('disconnected', () => {
            console.warn('⚠️ MongoDB disconnected');
          });

          return connection;
        },
      }),
    }),
  ],
})
export class ConnectModule {}
