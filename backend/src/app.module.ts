import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ConnectModule } from './db/connect.module';
import { UsersModule } from './users/users.module';
import { DbService } from './db/db.service';
import { HotelController } from './hotel/hotel.controller';
import { HotelsModule } from './hotels/hotels.module';

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
    HotelsModule,
  ],
  controllers: [AppController, HotelController],
  providers: [DbService],
})
export class AppModule {}