import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DbController } from './db.controller';
import { Connection, MongooseError } from 'mongoose';

/**
 * Модуль для подключения к MongoDB
 *
 * Этот модуль обеспечивает подключение к MongoDB, используя
 * параметры из переменных окружения.
 */
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async () => {
        const logger = new Logger('MongoDB');
        const uri = `${process.env.MONGO_DB_URI}${process.env.MONGO_DB_NAME}`;

        logger.log(`🔗 Подключение к MongoDB: ${uri}`);

        return {
          uri,
          user: process.env.MONGO_DB_USER,
          pass: process.env.MONGO_DB_PASSWORD,
          serverSelectionTimeoutMS: 5000,
          connectionFactory: (connection: Connection) => {
            // Проверяем начальное состояние соединения
            if (connection.readyState === 1) {
              logger.log(`✅ Подключено к MongoDB: ${connection.db.databaseName}`);
            } else {
              logger.warn('⚠️ MongoDB не готов (начальное состояние)');
            }

            // Регистрируем обработчики событий
            connection.on('connected', () => {
              logger.log(`✅ Подключено к MongoDB: ${connection.db.databaseName}`);
            });

            connection.on('error', (err: MongooseError) => {
              logger.error('❌ Ошибка подключения к MongoDB:', err);
            });

            connection.on('disconnected', () => {
              logger.warn('⚠️ MongoDB отключено');
            });

            connection.on('reconnected', () => {
              logger.log('🔄 MongoDB переподключено');
            });

            return connection;
          },
        };
      },
    }),
  ],
  controllers: [DbController],
})
export class ConnectModule {}
