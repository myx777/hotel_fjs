import { IsEmail, IsMobilePhone } from 'class-validator';

export class SearchUserDto {
  limit: number;

  offset: number;

  @IsEmail({}, { message: `Некорректный email!` })
  email: string;

  name: string;

  @IsMobilePhone('ru-RU')
  contactPhone: string;
}
