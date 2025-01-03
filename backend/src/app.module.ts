import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from './db/database.service';
import { ConnectModule } from './db/connect.module';
import { UsersModule } from './db/users/users.module';

/**
 * Главный модуль подключения приложения
 * 
 * Этот модуль инициализирует приложение, подключает конфигурационные модули,
 * модуль подключения к базе данных и предоставляет основные сервисы.
 * 
 * @module AppModule
 */
@Module({
  imports: [
    // загружает переменные из .env, подключен глобально
    ConfigModule.forRoot({
      isGlobal: true 
    }),
    // модуль подключения к базе данных
    ConnectModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}