import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Hotel } from './hotel.schema';

export type HotelRoomDocument = HydratedDocument<HotelRoom>;
/**
 * Схема HotelRoom для работы с MongoDB.
 */
@Schema({
  timestamps: true, // Добавляет поля createdAt и updatedAt.
  toJSON: {
    versionKey: false, // Убирает поле __v при преобразовании в JSON.
    virtuals: true, // Включает виртуальные свойства.
    transform: (_, ret) => {
      delete ret._id; // Убирает поле _id при преобразовании в JSON.
    },
  },
})
export class HotelRoom {
  @Prop({ type: Types.ObjectId, ref: Hotel.name, required: true })
  hotel: Types.ObjectId;

  @Prop()
  description: string;

  @Prop({ default: [] })
  images: string[];

  @Prop({ default: true, required: true })
  isEnabled: boolean;
}

export const HotelRoomSchema = SchemaFactory.createForClass(HotelRoom);
