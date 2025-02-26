import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
/**
 * Тип документа отеля в MongoDB.
 *
 * @description Связывает класс `Hotel` с методами и свойствами документа Mongoose.
 * Этот тип включает в себя свойства из схемы `Hotel` и методы Mongoose, такие как `.save()` и `.update()`.
 */
export type HotelDocument = HydratedDocument<Hotel>;
/**
 * Схема данных пользователя в MongoDB.
 *
 * @description Эта схема описывает основные данные пользователя, включая email, хеш пароля, имя, телефон и роль.
 * @property {Types.ObjectId} title
 * @property {string} description - Описание отеля
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
export class Hotel {
  @Prop({ type: Types.ObjectId, required: true })
  title: Types.ObjectId;

  @Prop()
  description: string;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
