import {
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
} from 'class-validator';
import { Role } from 'src/common/roles';

/**
 * DTO для создания пользователя.
 *
 * @description Этот класс используется для валидации данных, необходимых для создания нового пользователя.
 * Поля проходят проверку с помощью декораторов `class-validator`.
 */

export class CreateUserDto {
  @IsEmail({}, { message: 'Некорректный email' })
  @IsNotEmpty({ message: 'Email обязателен!' })
  email: string;

  @IsNotEmpty({ message: 'Пароль обязателен' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#*]).{8,128}$/, {
    message:
      'Пароль должен содержать хотя бы одну строчную букву, одну заглавную букву, одну цифру и один специальный символ (!#*)',
  })
  @Length(8, 128, { message: 'Пароль должен быть от 8 до 128 знаков' })
  password: string;

  @IsNotEmpty({ message: 'Имя должно быть обязателено' })
  @Length(2, 10, { message: 'Имя должно быть от 2 до 10 символов' })
  name: string;

  @IsOptional()
  @IsMobilePhone('ru-RU')
  contactPhone: string;

   /**
   * Роль пользователя (по умолчанию "user").
   */
   @IsEnum(Role, { message: 'Роль может быть только user, admin или moderator' })
   @IsOptional()
   role?: Role = Role.CLIENT;
}
