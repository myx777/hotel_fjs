import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ConnectModule } from './db/connect.module';
import { UsersModule } from './db/user/users.module';
import { DbService } from './db/db.service';

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
    // модуль пользователей
    UsersModule,
  ],
  controllers: [AppController],
  providers: [DbService],
})
export class AppModule {}