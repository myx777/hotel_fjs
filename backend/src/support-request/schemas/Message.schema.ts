import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type MessagesDocument = HydratedDocument<Message>;

@Schema({
  toJSON: {
    versionKey: false, // Убирает поле __v при преобразовании в JSON.
    virtuals: true, // Включает виртуальные свойства.
    transform: (_, ret) => {
      ret.id = ret._id; // Преобразуем _id в id.
      delete ret._id;
    },
  },
})

/**
 * Схема сообщений чата поддержки.
 *
 * @description Эта схема описывает сообщение в чате поддержки, включая автора, время отправки, текст и статус прочтения.
 * @property {Types.ObjectId} author - ID автора сообщения.
 * @property {Date} sentAt - Время отправки сообщения.
 * @property {string} text - Текст сообщения.
 * @property {Date|null} readAt - Время прочтения сообщения (или null, если не прочитано).
 */
export class Message {
  @Prop({ type: Types.ObjectId, required: true })
  author: Types.ObjectId;

  @Prop({ required: true })
  sentAt: Date;

  @Prop({ required: true })
  text: string;

  @Prop({ default: null })
  readAt: Date | null;
}

export const MessagesSchema = SchemaFactory.createForClass(Message);
