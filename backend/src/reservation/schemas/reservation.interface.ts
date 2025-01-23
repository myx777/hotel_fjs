import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ReservationDocument = HydratedDocument<Reservation>;

/**
 * Схема данных Reservation.
 *
 * @description Эта схема описывает бронирование, связывая пользователя, отель, номер и даты.
 */

@Schema({
  toJSON: {
    versionKey: false, // Убирает поле __v при преобразовании в JSON.
    virtuals: true, // Включает виртуальные свойства.
    transform: (_, ret) => {
      delete ret._id; // Убирает поле _id при преобразовании в JSON.
    },
  },
})
export class Reservation {
  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  hotelId: Types.ObjectId;
  @Prop({ type: Types.ObjectId, required: true })
  roomId: Types.ObjectId;
  @Prop()
  dateStart: Date;
  @Prop()
  dateEnd: Date;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
