import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Message, MessagesSchema } from './Message.schema';

export type SupportRequestDocument = HydratedDocument<SupportRequest>;

@Schema({
  timestamps: true, // Добавляет поля createdAt и updatedAt.
  toJSON: {
    versionKey: false, // Убирает поле __v при преобразовании в JSON.
    virtuals: true, // Включает виртуальные свойства.
    transform: (_, ret) => {
      ret.id = ret._id; // Переименовываем _id в id.
      delete ret._id;
    },
  },
})

/**
 * Схема чат поддержки.
 *
 * @description Эта схема описывает основные данные чата поддержки, юзера и сообщений.
 * @property {Types.ObjectId} user - ID пользователя.
 * @property {Messages[]} messages - Массив сообщений.
 * @property {boolean} isActive - Активность чата поддержки.
 */
export class SupportRequest {
  @Prop({ type: Types.ObjectId, required: true })
  user: Types.ObjectId;

  @Prop({ type: [MessagesSchema], default: [] })
  messages: Message[];

  @Prop({ default: true })
  isActive: boolean;
}

export const SupportRequestSchema =
  SchemaFactory.createForClass(SupportRequest);
