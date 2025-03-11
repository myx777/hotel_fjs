import { IsEmail, IsMobilePhone, IsString } from 'class-validator';

export class SearchUserDto {
  limit: number;

  offset: number;

  @IsEmail({}, { message: `Некорректный email!` })
  email: string;

  @IsString()
  name?: string;

  @IsMobilePhone('ru-RU')
  contactPhone: string;
}
