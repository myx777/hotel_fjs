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
        uri: `${process.env.MONGO_DB_URI}${process.env.MONGO_DB_NAME}`, // Переопределяем URI для тестов
        user: process.env.MONGO_DB_USER,
        pass: process.env.MONGO_DB_PASSWORD,
        serverSelectionTimeoutMS: 5000,
        connectionFactory: (connection) => {
          // Проверяем начальное состояние соединения
          if (connection.readyState === 1) {
            console.log(
              `✅ Connected to MongoDB: ${connection.db.databaseName}`,
            );
          } else {
            console.warn('⚠️ MongoDB connection is not ready (initial state)');
          }

          // Регистрируем обработчики событий
          connection.on('connected', () => {
            console.log('🔗 Event: connected');
            console.log(
              `✅ Connected to MongoDB: ${connection.db.databaseName}`,
            );
          });

          connection.on('error', (err) => {
            console.error('❌ Event: MongoDB connection error:', err);
          });

          connection.on('disconnected', () => {
            console.warn('⚠️ Event: MongoDB disconnected');
          });

          connection.on('reconnected', () => {
            console.log('🔄 Event: MongoDB reconnected');
          });

          return connection;
        },
      }),
    }),
  ],
})
export class ConnectModule {}
