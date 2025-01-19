import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

/**
 * Тип документа пользователя в MongoDB.
 * 
 * @description Связывает класс `User` с методами и свойствами документа Mongoose.
 * Этот тип включает в себя свойства из схемы `User` и методы Mongoose, такие как `.save()` и `.update()`.
 */
export type UserDocument = HydratedDocument<User>;

/**
 * Схема данных пользователя в MongoDB.
 *
 * @description Эта схема описывает основные данные пользователя, включая email, хеш пароля, имя, телефон и роль.
 * @property {string} email - Уникальный адрес электронной почты пользователя.
 * @property {string} passwordHash - Хешированный пароль пользователя.
 * @property {string} name - Имя пользователя.
 * @property {string} contactPhone - Контактный номер телефона пользователя.
 * @property {string} role - Роль пользователя (client, admin, manager). По умолчанию `client`.
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
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  contactPhone: string;

  @Prop({
    required: true,
    enum: ['admin', 'client', 'manager'],
    default: 'client',
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);