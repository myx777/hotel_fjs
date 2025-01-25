import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ConnectModule } from './db/connect.module';
import { UsersModule } from './users/users.module';
import { DbService } from './db/db.service';
import { HotelsModule } from './hotels/hotels.module';
import { ReservationService } from './reservation/reservation.service';
import { ReservationModule } from './reservation/reservation.module';
import { HotelsController } from './hotels/hotels.controller';
import { SupportRequestModule } from './support-request/support-request.module';

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
    ReservationModule,
    SupportRequestModule,
  ],
  controllers: [AppController, HotelsController],
  providers: [DbService, ReservationService],
})
export class AppModule {}