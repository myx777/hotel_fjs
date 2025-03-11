import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

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
 *
 * @property {string} email - Уникальный адрес электронной почты пользователя.
 * @property {string} passwordHash - Хэшированный пароль пользователя.
 * @property {string} name - Имя пользователя.
 * @property {string} contactPhone - Контактный номер телефона пользователя.
 * @property {string} role - Роль пользователя (`user`, `admin`, `manager`). По умолчанию `user`.
 */
@Schema({
  timestamps: true, // Добавляет поля createdAt и updatedAt
  toJSON: {
    versionKey: false, // Убирает поле __v при преобразовании в JSON
    virtuals: true, // Включает виртуальные свойства
    transform: (_, ret) => {
      delete ret._id; // Убирает _id при преобразовании в JSON
      delete ret.passwordHash; // Убирает хеш пароля из ответа (безопасность)
    },
  },
})
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ required: true, enum: ['user', 'admin'], default: 'user' })
  role: string;

  /**
   * Проверяет, соответствует ли введенный пароль хешу в базе.
   *
   * @param {string} password - Введенный пользователем пароль.
   * @returns {Promise<boolean>} - `true`, если пароль совпадает, иначе `false`.
   *
   * @example
   * ```typescript
   * const isValid = await user.validatePassword('mypassword');
   * console.log(isValid); // true или false
   * ```
   */
  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}

// Создаем схему Mongoose
export const UserSchema = SchemaFactory.createForClass(User);

/**
 * Middleware для хеширования пароля перед сохранением пользователя.
 *
 * @description Если поле `passwordHash` было изменено, оно автоматически хешируется перед сохранением в базу данных.
 */
UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('passwordHash')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});
