import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Hotel, HotelSchema } from './schema/hotel.schema';
import { HotelRoom, HotelRoomSchema } from './schema/HotelRoom.schema';

/**
 * Модуль HotelsModule.
 *
 * @description Этот модуль отвечает за функциональность, связанную с отелями и их номерами.
 * Он регистрирует схемы `Hotel` и `HotelRoom` в Mongoose, предоставляет сервисы и контроллер для работы с данными.
 */

@Module({
  imports: [MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }, {name: HotelRoom.name, schema: HotelRoomSchema}])],
  providers: [HotelsService],
  controllers: [HotelsController]
})
export class HotelsModule {}
