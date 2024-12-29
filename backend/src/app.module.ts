import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://mongo:${process.env.MONGO_PORT}/hotels-db`,
      {
        user: process.env.MONGO_HOTELS_WRITE_USER,
        pass: process.env.MONGO_HOTELS_WRITE_PASSWORD,
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
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
